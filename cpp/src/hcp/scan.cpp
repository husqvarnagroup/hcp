#include <assert.h>
#include <hcp/runtime.hpp>
#include <hcp/scan.hpp>
#include <hcp_scan.h>
#include <regex>
#include <string>
#include <uv.h>

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
        std::regex dll("(.*)(\\.DLL)", std::regex::icase);
        std::regex so("(.*)(\\.SO)", std::regex::icase);
        std::regex dylib("(.*)(\\.DYLIB)", std::regex::icase);
        return std::regex_match(name, dll) || std::regex_match(name, so) ||
               std::regex_match(name, dylib);
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

std::vector<hcp::Library> scanDir(const char* codecPath)
{
    std::vector<hcp::Library> ret;
    auto handle = [&](unique_void_ptr ptr, hcp_tCodecLibrary* codec) {
        ret.emplace_back(std::move(ptr), codec);
    };
    return ret;
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
hcp_Size_t hcp_getCodecCount(hcp_tState const* pState)
{
    return pState->libraries.header.length;
}
hcp_cszStr hcp_getCodecName(hcp_tState const* pState, const hcp_Size_t index)
{
    return begin(pState->libraries)[index].name;
}

void hcp_DestructError2(hcp_Error_t err)
{
    if (err) delete err;
}
hcp_cszStr hcp_GetMessage2(hcp_Error_t err) { return ""; }

hcp_State_t hcp_NewState2(hcp_Error_t*)
{
    auto state = std::make_unique<hcp_tState>();
    auto host = hcp::default_mem();
    auto err = hcp_NewState(state.get(), &host);
    assert(err == HCP_NOERROR);
    return state.release();
}
void hcp_CloseState2(hcp_State_t state, hcp_Error_t*) { delete state; }

