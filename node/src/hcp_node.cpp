#include "hcp_node.h"

#include <node.h>
#include <uv.h>
#include "hcp_error.c"
#include "cJSON.c"
#include "hcp_library.c"
#include "hcp_runtime.c"
#include "hcp_string.c"
#include "hcp_tif.c"
#include "hcp_vector.c"

using hcp::HcpState;
using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Object;
using v8::String;
using v8::Value;
using node::AtExit;

static HcpState* _adapter = NULL;

#define ASSERT_INIT_ADAPTER(__ADAPTER, __ISOLATE) \
	if (__ADAPTER == NULL || !__ADAPTER->isInitialized()) { \
		__ISOLATE->ThrowException(Exception::Error( \
			String::NewFromUtf8(isolate, "The HCP-Runtime has not been initialized. Call init to initialize."))); \
		return; \
	}

void HcpState::initState(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();

	if (_adapter == NULL) {
		_adapter = new HcpState();

		if (!_adapter->isInitialized()) {
			isolate->ThrowException(Exception::Error(
				String::NewFromUtf8(isolate, "HCP-Runtime failed to initialize.")));
			return;
		}
	}

	if (args.Length() < 1 || !args[0]->IsString()) {
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Missing or invalid string argument. Expected one path string where HCP codec libraries is located.")));
		return;
	}
	
	v8::String::Utf8Value path(args[0]->ToString());
	
	try {
		_adapter->scanDir(std::string(*path));
	}
	catch (std::string e) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, e.c_str())));
		return;
	}
	

	args.GetReturnValue().SetUndefined();
}

bool HcpState::hasModel(const size_t Id) const {
	for (auto i = _models.begin(); i != _models.end(); i++) {
		if (*i == Id) {
			return true;
		}
	}

	return false;
}

bool HcpState::hasLibrary(const std::string LibraryName) const {
	for (auto i = _libraries.begin(); i != _libraries.end(); i++) {
		if (std::equal(i->name.begin(), i->name.end(), LibraryName.begin())) {
			return true;
		}
	}

	return false;
}

bool HcpState::hasCodec(const size_t Id) const {
	for (auto i = _codecs.begin(); i != _codecs.end(); i++) {
		if (i->id == Id) {
			return true;
		}
	}

	return false;
}

void HcpState::closeCode(const size_t codecId) {
	auto error = hcp_CloseCodec(_pState, codecId);

	if (error != HCP_NOERROR) {
		char message[512];

		hcp_GetMessage(error, message, sizeof(message));
		throw std::string(message);
	}

	for (auto itr = _codecs.begin(); itr != _codecs.end(); itr++) {
		if (itr->id == codecId) {
			_codecs.erase(itr);
			break;
		}
	}
}

void HcpState::closeCodec(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	if (args.Length() < 1) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid number of arguments, integer codec id.")));
		return;
	}

	if (!args[0]->IsNumber()) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid argument type, expected integer codec id.")));
		return;
	}

	auto codecId = args[0]->IntegerValue();

	if (!_adapter->hasCodec(codecId)) {
		isolate->ThrowException(Exception::ReferenceError(
			String::NewFromUtf8(isolate, "The specified codec id does not refer to any active codec.")));
		return;
	}

	try {
		_adapter->closeCode(codecId);
	}
	catch (std::string e) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, e.c_str())));
		return;
	}

	args.GetReturnValue().SetUndefined();
}

size_t HcpState::decode(const size_t CodecId, const unsigned char* source, const size_t length, Isolate* isolate, Local<Object> & dest) {
	hcp_tResult result;

	auto bytesRead = hcp_Decode(_pState, CodecId, source, length, &result);

	if (bytesRead < 0) {
		char message[512];
		hcp_GetMessage(bytesRead, message, sizeof(message));
		throw std::string(message);
	}

	for (auto i = 0; i < result.parameterCount; i++) {
		auto p = &result.parameters[i];

		Local<v8::Value> value;

		switch (p->template_->type) {
			case HCP_BOOLEAN_ID: {
				value = v8::Boolean::New(isolate, p->value.b == HCP_TRUE);
			} break;
			case HCP_INT8_ID: {
				value = v8::Int32::New(isolate, int32_t(p->value.s8));
			}break;
			case HCP_UINT8_ID: {
				value = v8::Int32::New(isolate, int32_t(p->value.u8));
			}break;
			case HCP_UINT16_ID: {
				value = v8::Int32::New(isolate, int32_t(p->value.u16));
			}break;
			case HCP_INT16_ID: {
				value = v8::Int32::New(isolate, int32_t(p->value.i16));
			}break;
			case HCP_INT32_ID: {
				value = v8::Int32::New(isolate, int32_t(p->value.i32));
			}break;
			case HCP_UINT32_ID: {
				value = v8::Uint32::New(isolate,uint32_t(p->value.u32));
			}break;
			case HCP_UNIXTIME_ID:
				value = v8::Date::New(isolate, double(p->value.time));
			case HCP_UINT64_ID: {
				value = v8::Number::New(isolate, double(p->value.u64));
			}break;
			case HCP_INT64_ID: {
				value = v8::Number::New(isolate, double(p->value.i64));
			}break;
			case HCP_STRING_ID: {
				auto str = p->value.str;

				if (str.zeroTerm) {
					value = v8::String::NewFromUtf8(isolate, str.value);
				}
				else {
					value = v8::String::NewFromUtf8(isolate, str.value, v8::NewStringType::kNormal, str.length).ToLocalChecked();
				}
			} break;
			case HCP_BLOB_ID: {
				auto blob = p->value.blb;
				value = v8::ArrayBuffer::New(isolate, blob.value, blob.length);
			} break;
			case HCP_SIMPLEVERSION_ID: {
				auto version = p->value.blb.value;
					std::string str;

					str.append(1, ((char)(48 + (char)version[0])));
					str.append(".");
					str.append(1, ((char)(48 + (char)version[1])));

					value = v8::String::NewFromUtf8(isolate, str.c_str());
			}
			default: {
				// hmm?
			} break;
		}

		dest->Set(String::NewFromUtf8(isolate, p->template_->name.value), value);
	}

	return bytesRead;
}

void HcpState::decode(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	if (args.Length() < 3) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid number of arguments, expected integer codec id, source array buffer and integer bytes to read.")));
		return;
	}

	if (!args[0]->IsNumber() || !args[1]->IsArrayBuffer() || !args[2]->IsNumber()) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid argument type(s), expected integer codec id, source array buffer and integer bytes to read.")));
		return;
	}

	auto id = args[0]->IntegerValue();
	auto bytesToRead = args[2]->IntegerValue();
	auto sourceObj = args[1]->ToObject().As<v8::ArrayBuffer>();
	auto sourceContent = sourceObj->GetContents();
	auto sourceData = static_cast<unsigned char*>(sourceContent.Data());

	if (sourceObj->ByteLength() == 0) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Source array buffer was zero in size.")));
		return;
	}

	if (bytesToRead < 1) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Number of bytes to read was less or equal to zero.")));
		return;
	}

	if (!_adapter->hasCodec(id)) {
		isolate->ThrowException(Exception::ReferenceError(
			String::NewFromUtf8(isolate, "The specified codec id does not refer to an active codec.")));
		return;
	}

	size_t bytesRead = 0;
	Local<Object> result = Object::New(isolate);

	try {
		bytesRead = _adapter->decode(id, sourceData, bytesToRead,isolate, result);
	}
	catch (std::string e) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, e.c_str())));
		return;
	}

	Local<Object> outObj = Object::New(isolate);
	

	outObj->Set(String::NewFromUtf8(isolate, "bytesRead"), v8::Integer::New(isolate, bytesRead));
	outObj->Set(String::NewFromUtf8(isolate, "result"), result);

	args.GetReturnValue().Set(outObj);
}

size_t HcpState::encode(const size_t CodecId, std::string Command, unsigned char* dest, const size_t length) {

	auto bytesWritten = hcp_Encode(_pState, CodecId,(hcp_szStr)Command.c_str(), dest, length, HCP_NULL, HCP_NULL);

	if (bytesWritten < 0) {
		char message[512];
		hcp_GetMessage(bytesWritten, message, sizeof(message));

		throw std::string(message);
	}

	return bytesWritten;
}

void HcpState::encode(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	if (args.Length() < 3) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid number of arguments, expected integer codec id, string TIF-request and destination array buffer.")));
		return;
	}

	if (!args[0]->IsNumber() || !args[1]->IsString() || !args[2]->IsArrayBuffer()) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid argument type(s), expected integer codec id, string TIF-request and destination array buffer.")));
		return;
	}

	auto id = args[0]->IntegerValue();
	v8::String::Utf8Value requestArg(args[1]->ToString());
	auto request = std::string(*requestArg);

	auto destObj = args[2]->ToObject().As<v8::ArrayBuffer>();
	auto destContent = destObj->GetContents();
	auto destData = static_cast<unsigned char*>(destContent.Data());

	if (destObj->ByteLength() == 0) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Destination array buffer was zero in size.")));
		return;
	}

	if (!_adapter->hasCodec(id)) {
		isolate->ThrowException(Exception::ReferenceError(
			String::NewFromUtf8(isolate, "The specified codec id does not refer to an active codec.")));
		return;
	}

	size_t bytesWritten = 0;

	try {
		bytesWritten = _adapter->encode(id, request, destData, destObj->ByteLength());
	}
	catch (std::string e) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, e.c_str())));
		return;
	}

	args.GetReturnValue().Set(Integer::New(isolate, bytesWritten));
}

size_t HcpState::newCodec(const std::string & LibraryName,const size_t ModelId) {
	hcp_Size_t id = 0;

	auto error = hcp_NewCodec(_pState, (hcp_szStr)LibraryName.c_str(), ModelId, &id);

	if (error != HCP_NOERROR) {
		char message[512];

		hcp_GetMessage(error, message, sizeof(message));
		throw std::string(message);
	}

	_codecs.push_back({ id, ModelId, LibraryName });

	return id;
}

void HcpState::newCodec(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	if (args.Length() < 2) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid number of arguments, expected string codec library name and integer model id.")));
		return;
	}

	if (!args[0]->IsString() || !args[1]->IsNumber()) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid argument type(s), expected string codec library name and integer model id.")));
		return;
	}

	auto id = size_t(0);
	v8::String::Utf8Value libraryArg(args[0]->ToString());
	auto modelId = args[1]->IntegerValue();

	auto libraryName = std::string(*libraryArg);

	if (!_adapter->hasLibrary(libraryName)) {
		isolate->ThrowException(Exception::ReferenceError(
			String::NewFromUtf8(isolate, "The specified codec library has not been loaded.")));
		return;
	}

	if (!_adapter->hasModel(modelId)) {
		isolate->ThrowException(Exception::ReferenceError(
			String::NewFromUtf8(isolate, "The specified model id does not refer to an active model.")));
		return;
	}

	try {
		id = _adapter->newCodec(libraryName,size_t(modelId));
	}
	catch (std::string e) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, e.c_str())));
		return;
	}

	args.GetReturnValue().Set(Integer::New(isolate, id));
}

std::list<std::string> HcpState::getLibraries() const {
	std::list<std::string> libraries;

	for (auto i = _libraries.begin(); i != _libraries.end(); i++) {
		libraries.push_back(i->name);
	}

	return libraries;
}

void HcpState::getLibraries(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	auto libs = _adapter->getLibraries();

	Local<v8::Array> output = v8::Array::New(isolate, libs.size());
	int index = 0;
	
	for (auto iter = libs.begin(); iter != libs.end(); iter++, index++) {
		Local<v8::String> name = String::NewFromUtf8(isolate, iter->c_str());
		output->Set(index, name);
	}

	args.GetReturnValue().Set(output);
}

static bool HasExtension(std::string const & Filename, std::string const & Extension)
{
	if (Extension.size() > Filename.size()) {
		return false;
	}

	return std::equal(Extension.rbegin(), Extension.rend(), Filename.rbegin());
}

void HcpState::scanDir(const std::string & sPath) {
	uv_fs_t req;
	int numFiles = uv_fs_scandir(uv_default_loop(), &req, sPath.c_str(), UV_FS_SCANDIR, NULL);

	if (numFiles < 0) {
		throw std::string(uv_strerror(numFiles));
	}

	for (int i = 0; i < numFiles; i++) {
		uv_dirent_t ent;
		CodecLibrary library;

		int r = uv_fs_scandir_next(&req, &ent);

		if (r == UV_EOF) {
			break;
		}

		auto filename = std::string(ent.name);
		auto libraryLoaded = false;

		// hcp does not allow unloading librares so we
		// ignore already loaded
		for (auto i = _libraries.begin(); i != _libraries.end(); i++) {
			if (std::equal(i->filename.begin(), i->filename.end(), filename.begin())) {
				libraryLoaded = true;
				break;
			}
		}

		if (libraryLoaded) {
			continue;
		}

		if (HasExtension(filename, std::string(".dll")) ||
			HasExtension(filename, std::string(".so")) ||
			HasExtension(filename, std::string(".dynlib"))) {

			try {
				loadLibrary(sPath + std::string("/") + filename, library);
			}
			catch (std::string e) {
				printf(e.c_str());
				continue;
			}
		}
		else {
			continue;
		}

		_libraries.push_back(library);
	}
	
}

void HcpState::loadLibrary(const std::string & sFilename, CodecLibrary & Library) {
	Library.lib = uv_lib_t();

	if (uv_dlopen(sFilename.c_str(), &Library.lib) != 0) {
		throw std::string(uv_dlerror(&Library.lib));
	}

	void* loadHandle = NULL;

	if (uv_dlsym(&Library.lib, "hcp_GetLibrary", &loadHandle) != 0) {
		uv_dlclose(&Library.lib);

		throw std::string(uv_dlerror(&Library.lib));
	}

	auto handle = ((LoadCodec)loadHandle)();

	if (handle == NULL) {
		throw std::string("Codec Library failed to load.");
	}

	char buffer[512];

	auto error = hcp_LoadCodec(_pState, handle, buffer, sizeof(buffer));

	if (error != HCP_NOERROR) {
		char buffer[512];

		hcp_GetMessage(error, buffer, sizeof(buffer));
		std::string message = std::string(buffer);

		uv_dlclose(&Library.lib);

		throw message;
	}

	Library.name = std::string(buffer);
	Library.filename = sFilename;
}

hcp_Size_t HcpState::heapSize() const {
	hcp_Size_t size = 0;

	for (auto i = _blocks.begin(); i != _blocks.end(); i++) {
		size += i->size;
	}

	return size;
}

void HcpState::heapSize(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	args.GetReturnValue().Set(Integer::New(isolate, int32_t(_adapter->heapSize())));
}

size_t HcpState::loadModel(const std::string & sModel) {
	hcp_Int id = 0;
	hcp_Int error = hcp_LoadModel(_pState, (const hcp_szStr)(sModel.c_str()), sModel.length(), &id);

	if (error != HCP_NOERROR) {
		char buffer[512];

		hcp_GetMessage(error, buffer, sizeof(buffer));
		std::string message = std::string(buffer);

		throw message;
	}

	_models.push_back(id);

	return size_t(id);
}

void HcpState::loadModel(const FunctionCallbackInfo<Value>& args) {
	Isolate* isolate = args.GetIsolate();
	ASSERT_INIT_ADAPTER(_adapter, isolate);

	if (args.Length() < 1) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Too few arguments, expected one string argument (TIF-json model).")));
		return;
	}
	else if (!args[0]->IsString()) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, "Invalid argument, expected string argument (TIF-json model).")));
		return;
	}

	size_t modelId = 0;

	try {
		v8::String::Utf8Value model(args[0]->ToString());
		modelId = _adapter->loadModel(std::string(*model));
	} catch (std::string e) {
		isolate->ThrowException(Exception::SyntaxError(
			String::NewFromUtf8(isolate, e.c_str())));
		return;
	}

	args.GetReturnValue().Set(Integer::New(isolate, modelId));
}

void HcpState::init(Local<Object> exports) {
	AtExit(HcpState::atExit);

	NODE_SET_METHOD(exports, "init", HcpState::initState);
	NODE_SET_METHOD(exports, "heapSize", HcpState::heapSize);
	NODE_SET_METHOD(exports, "loadModel", HcpState::loadModel);
	NODE_SET_METHOD(exports, "getLibraries", HcpState::getLibraries);
	NODE_SET_METHOD(exports, "newCodec", HcpState::newCodec);
	NODE_SET_METHOD(exports, "closeCodec", HcpState::closeCodec);
	NODE_SET_METHOD(exports, "encode", HcpState::encode);
	NODE_SET_METHOD(exports, "decode", HcpState::decode);
}

void HcpState::atExit(void* pArg) {
	_adapter->unload();
	// unload!
}

void HcpState::unload() {
	if (_pState == HCP_NULL) {
		return;
	}

	for (auto itr = _codecs.begin(); itr != _codecs.end(); itr++) {
		hcp_CloseCodec(_pState, itr->id);
	}

	hcp_CloseState(_pState);
	_pState = HCP_NULL;

	for (auto itr = _libraries.begin(); itr != _libraries.end(); itr++) {
		uv_dlclose(&itr->lib);
	}

	_libraries.clear();
	_codecs.clear();
	_models.clear();
}

HcpState::HcpState() {
	_pState = (hcp_tState*)malloc(hcp_SizeOfState());

	if (_pState != NULL) {
		hcp_tHost host;

		host.free_ = HcpState::Free;
		host.lock = HcpState::TryLock;
		host.malloc_ = HcpState::Malloc;
		host.memcpy_ = HcpState::Memcpy;
		host.free_ = HcpState::Free;
		host.memset_ = HcpState::Memset;
		host.realloc_ = HcpState::Realloc;
		host.unlock = HcpState::Unlock;
		host.context = this;

		if (hcp_NewState(_pState, &host) != HCP_NOERROR) {
			free(_pState);
			_pState = NULL;
		}
	}
}

bool HcpState::isInitialized() const {
	return _pState != NULL;
}


void* HcpState::Realloc(void* pDest, const hcp_Size_t Size, void* pContext) {
	if (pContext == NULL) {
		return NULL;
	}

	return static_cast<HcpState*>(pContext)->Realloc(pDest, Size);
}

void* HcpState::Malloc(const hcp_Size_t Size, void* pContext) {
	if (pContext == NULL) {
		return NULL;
	}

	return static_cast<HcpState*>(pContext)->Malloc(Size);
}

hcp_Boolean HcpState::TryLock(const void* pPtr, const hcp_Size_t Timeout, void* pContext) {
	if (pContext == NULL) {
		return HCP_FALSE;
	}

	return static_cast<HcpState*>(pContext)->TryLock(pPtr, Timeout);
}

void HcpState::Unlock(const void* pPtr, void* pContext) {
	if (pContext == NULL) {
		return;
	}

	static_cast<HcpState*>(pContext)->Unlock(pPtr);
}

void* HcpState::Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length, void* pContext) {
	if (pContext == NULL) {
		return NULL;
	}

	return static_cast<HcpState*>(pContext)->Memset(pDest, Value, Length);
}

void* HcpState::Memcpy(void* pDest, const void* pSource, const hcp_Size_t Length, void* pContext) {
	if (pContext == NULL) {
		return NULL;
	}

	return static_cast<HcpState*>(pContext)->Memcpy(pDest, pSource, Length);
}

void HcpState::Free(void* pDest, void* pContext) {
	if (pContext == NULL) {
		return;
	}

	static_cast<HcpState*>(pContext)->Free(pDest);
}


void* HcpState::Realloc(void* pDest, const hcp_Size_t Size) {
	auto dest = realloc(pDest, Size);

	if (dest != NULL) {
		for (auto i = _blocks.begin(); i != _blocks.end(); i++) {
			if (i->address == pDest) {
				i->address = dest;
				i->size = Size;
				break;
			}
		}
	}
	
	return dest;
}

void* HcpState::Malloc(const hcp_Size_t Size) {
	auto dest = malloc(Size);

	if (dest != NULL) {
		_blocks.push_back({ dest, Size });
	}

	return dest;
}

hcp_Boolean HcpState::TryLock(const void* pPtr, const hcp_Size_t Timeout) {
	return HCP_TRUE;
}

void HcpState::Unlock(const void* pPtr) {

}

void* HcpState::Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length) {
	return memset(pDest, Value, Length);
}

void* HcpState::Memcpy(void* pDest, const void* pSource, const hcp_Size_t Length) {
	return memcpy(pDest, pSource, Length);
}

void HcpState::Free(void* pDest) {
	free(pDest);

	if (pDest != NULL) {
		for (auto i = _blocks.begin(); i != _blocks.end(); i++) {
			_blocks.erase(i);
			break;
		}
	}
}