#include <hcp_scan.h>
#include <string>
extern "C" {
#include <hcp_string.h>
#include <hcp_runtime.h>
}
#include <memory>
#include "uv.h"

template <typename T> using unique_ptr_del = std::unique_ptr<T, void (*)(T*)>;

using unique_void_ptr = std::unique_ptr<void, void (*)(void*)>;

template <typename T> unique_void_ptr type_erase(unique_ptr_del<T> ptr)
{
    return unique_void_ptr{
        ptr.release(), reinterpret_cast<void (*)(void*)>(ptr.get_deleter())};
}


bool hasExtension(const char* path, const char* extension) {
	if (!path || !extension) {
		return false;
	}

	hcp_Int pathLen = hcp_szStrLen((hcp_cszStr)path);
	hcp_Int extLen = hcp_szStrLen((const hcp_szStr)extension);

	if (extLen >= pathLen) {
		return false;
	}

	const char* lhs = (const char*)((hcp_Size_t)path + (hcp_Size_t)pathLen);
	const char* rhs = (const char*)((hcp_Size_t)extension + (hcp_Size_t)extLen);

	while (rhs != extension) {
		char expected = *(rhs--);
		char actual = *(lhs--);

		// ignore case, cast all to caps
		expected = expected >= 97 && expected <= 122 ? (int)expected - 32 : expected;
		actual = actual >= 97 && actual <= 122 ? (int)actual - 32 : actual;

		if (expected != actual) {
			return false;
		}
	}

	return true;
}
using LoadCodec = hcp_tCodecLibrary*();
struct tCodec {
    std::string path;
    std::string name;
    hcp_tCodecLibrary* lib;
    uv_lib_t binary;
};

template <typename Op> void scanDir(const char* codecPath, Op op)
{
    auto loadLibrary = [&](std::string const& path, tCodec* destination) {
        destination->binary = uv_lib_t();

        if (uv_dlopen(path.c_str(), &destination->binary) != 0)
            throw std::runtime_error(uv_dlerror(&destination->binary));

        void* loadHandle = nullptr;

        if (uv_dlsym(&destination->binary, "hcp_GetLibrary", &loadHandle) !=
            0) {
            uv_dlclose(&destination->binary);
            throw std::runtime_error(uv_dlerror(&destination->binary));
        }

        auto handle = reinterpret_cast<LoadCodec*>(loadHandle)();

        if (handle == nullptr)
            throw std::runtime_error("Codec Library failed to load.");

        unique_ptr_del<uv_lib_t> lib(nullptr, uv_dlclose);
        op(type_erase(std::move(lib)), handle);

        destination->lib = handle;
        destination->path = path;
        // destination->name = codecName;
    };
    auto isLib = [](char const* name) -> bool {
      return hasExtension(name,"DLL")
        ||   hasExtension(name,"SO")
        ||   hasExtension(name,"DYLIB");
    };
    uv_fs_t req;
    int numFiles = uv_fs_scandir(uv_default_loop(), &req, codecPath,
                                 UV_FS_SCANDIR, nullptr);

    if (numFiles < 0) throw std::runtime_error(uv_strerror(numFiles));

    for (int i = 0; i < numFiles; i++) {
        uv_dirent_t ent;
        tCodec codec;

        int r = uv_fs_scandir_next(&req, &ent);

        if (r == UV_EOF) {
            break;
        }

        if (!isLib(ent.name)) continue;

        codec.path = codecPath;
        codec.path += "/";
        codec.path += ent.name;
        loadLibrary(codec.path, &codec);
    }
}
void hcp_Scan(char const* path, library_callback cb, void* ctx)
{
    auto handle = [&](unique_void_ptr ptr, hcp_tCodecLibrary* codec) {
        cb(codec, ctx);
        ptr.release(); // leak dynamic library instances. We ewant to keep all
                       // until shutdown anyway.
    };
    scanDir(path, handle);
}
void hcp_ScanAndLoad(char const* path, hcp_tState* pState)
{
    auto handle = [&](unique_void_ptr ptr, hcp_tCodecLibrary* codec) {
        hcp_LoadCodec(pState, codec, nullptr, 0);
        ptr.release(); // leak dynamic library instances. We ewant to keep all
                       // until shutdown anyway.
    };
    scanDir(path, handle);
}
