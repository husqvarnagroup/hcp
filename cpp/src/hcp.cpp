#include "hcp.h"
extern "C" {
#include "hcp_vector.h"
#include "hcp_string.h"
}
#include <stdlib.h>


/** Singleton instance set when calling create */
static hcp::Runtime* _r = nullptr;


typedef hcp_tCodecLibrary* (*LoadCodec)(void);
static hcp_Int compareCodec(void* pTemplate, void* Id, void* pState);
static hcp_Boolean isCodec(void* pTemplate, void* pState);

static void* _malloc(hcp_Size_t size, void* ctx) {
	return malloc(size);
}

static void _free(void* dest, void* ctx) {
	free(dest);
}

static void* _memcpy(void* dest, const void* source, hcp_Size_t size, void*  ctx) {
	return memcpy(dest, source, size);
};

static void* _memset(void* dest, hcp_Int value, hcp_Size_t len, void*  ctx) {
	return memset(dest, value, len);
};

hcp_Int compareCodec(void* codec, void* name, void* pState) {
	hcp::tCodec* c = (hcp::tCodec*)codec;
	return hcp_szStrCmp(c->name, (const hcp_szStr)name) == 0;
}

hcp_Boolean isCodec(void* codec, void* pState) {
	hcp::tCodec* c = (hcp::tCodec*)codec;
	return c->lib != NULL ? HCP_TRUE : HCP_FALSE;
}

hcp::Runtime::Runtime(hcp_tHost* osHost) {
	if (osHost->malloc_ == nullptr) {
		_state = nullptr;
	}
	else {
		_state = (hcp_tState*)osHost->malloc_(hcp_SizeOfState(),osHost->context);

		if (hcp_NewState(_state, osHost) != HCP_NOERROR) {
			if (osHost->free_ != nullptr) {
				osHost->free_(_state, osHost);
				_state = nullptr;
			}

			_state = nullptr;
		}
		else {
			auto error = HCP_INITIALIZEVECTOR(_state, &(_codecs.header), _codecs.fixed,
				hcp::tCodec, HCP_NULL, compareCodec, isCodec);

			if (error != HCP_NOERROR) {
				hcp_CloseState(_state);
				_state = nullptr;
			}
			// todo: logg this
			
		}
	}
}

const hcp::tCodec* hcp::Runtime::getCodec(const hcp_Size_t index) const {
	if (index >= 0 && index < _codecs.header.length) {
		return (hcp::tCodec*)hcp_ValueAt(&_codecs.header, index);
	}

	return nullptr;
}

hcp_szStr hcp_getCodecName(const hcp_Size_t index) {
	auto codec = _r->getCodec(index);

	if (codec == nullptr) {
		return nullptr;
	}

	return codec->name;
}

hcp_Size_t hcp::Runtime::codecCount(void) const {
	return _codecs.header.length;
}

hcp_Size_t hcp_getCodecCount(void)
{
	if (_r != nullptr) {
		return _r->codecCount();
	}
	
	return 0;
}

hcp::Runtime* hcp_init_runtime(hcp_cszStr codecPath) {
	if (_r == nullptr) {
		hcp_tHost host;

		memset(&host, 0, sizeof(hcp_tHost));

		host.free_ = _free;
		host.malloc_ = _malloc;
		host.memcpy_ = _memcpy;
		host.memset_ = _memset;

		_r = new hcp::Runtime(&host);
	}
  char const* err = nullptr;

	if (codecPath != nullptr && hcp_szStrLen(codecPath) > 0) {
		if (!_r->scanDir(codecPath, &err)) {

		}
	}

  return _r;
}
hcp_tState* hcp_init(hcp_cszStr codecPath) {
  hcp_init_runtime(codecPath);
	return _r->getState();
}

bool hcp::Runtime::hasExtension(const char* path, const char* extension) {
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

bool hcp::Runtime::scanDir(const char* codecPath,const char** error) {
	uv_fs_t req;
	int numFiles = uv_fs_scandir(uv_default_loop(), &req, codecPath, UV_FS_SCANDIR, nullptr);

	if (numFiles < 0) {
		if (error) {
			*error = uv_strerror(numFiles);
		}

		return false;
	}

	for (int i = 0; i < numFiles; i++) {
		uv_dirent_t ent;
		hcp::tCodec codec;

		int r = uv_fs_scandir_next(&req, &ent);

		if (r == UV_EOF) {
			break;
		}

		hcp_Boolean found = HCP_FALSE;
		// skip codecs with duplicate name
		hcp_FindFirst(&_codecs.header, 0, (void*)ent.name, &found);

		if (found == HCP_TRUE) {
			continue;
		}

		if (hcp::Runtime::hasExtension(ent.name, ".DLL") ||
			hcp::Runtime::hasExtension(ent.name, ".SO") ||
        hcp::Runtime::hasExtension(ent.name, ".DYLIB")) {

			hcp_Size_t pathLen = hcp_szStrLen((hcp_szStr)codecPath);
			hcp_Size_t nameLen = hcp_szStrLen((hcp_szStr)ent.name);

			codec.path = (char*)hcp_Malloc(_state, pathLen + nameLen + 2);
			
			hcp_Memcpy(_state, codec.path, codecPath, pathLen);
			hcp_Memcpy(_state, codec.path + pathLen, "/", 1);
			hcp_Memcpy(_state, codec.path + pathLen + 1, ent.name, nameLen + 1);

			if (loadLibrary(codec.path, &codec, error)) {
				hcp_Size_t index;
				auto code = hcp_Push(&_codecs.header, &codec, &index);

				if (code != HCP_NOERROR) {
					// TODO: Logg load errors
					hcp_Free(_state, codec.path);
				}
			}
			else {
				// TODO: Logg load errors
				hcp_Free(_state, codec.path);
			}
		}
		else {
			continue;
		}
	}

	return true;
}

hcp_tState * hcp::Runtime::getState(void) const
{
	return _state;
}

bool hcp::Runtime::loadLibrary(char* path, hcp::tCodec * destination, const char** error) {
	destination->binary = uv_lib_t();

	if (uv_dlopen(path, &destination->binary) != 0) {
		if (error) {
			*error = uv_dlerror(&destination->binary);
		}

		return false;
	}

	void* loadHandle = nullptr;

	if (uv_dlsym(&destination->binary, "hcp_GetLibrary", &loadHandle) != 0) {
		uv_dlclose(&destination->binary);

		if (error) {
			*error = uv_dlerror(&destination->binary);
		}

		return false;
	}

	auto handle = ((LoadCodec)loadHandle)();

	if (handle == nullptr) {
		if (error) {
			*error = "Codec Library failed to load.";
		}

		return false;
	}

	char* codecName = (char*)hcp_Malloc(_state, 512);
	auto result = hcp_LoadCodec(_state, handle, codecName, 512);

	if (result != HCP_NOERROR) {
		if (error) {
			hcp_Free(_state, codecName);
			// this causes a memory leak
			*error = (const char*)hcp_Malloc(_state, 1024);
			hcp_GetMessage(result, (hcp_szStr)*error, 1024);
		}
		

		uv_dlclose(&destination->binary);

		return false;
	}

	destination->lib = handle;
	destination->path = path;
	destination->name = codecName;

	return true;
}
