#ifndef HCP_NODE_H__
#define HCP_NODE_H__

#include <node.h>
#include <list>
#include <vector>
#include <uv.h>
#include "hcp_runtime.h"

struct CodecLibrary {
	uv_lib_t lib;
	std::string filename;
	std::string name;
};

namespace hcp {

	using v8::FunctionCallbackInfo;
	using v8::Isolate;
	using v8::Local;
	using v8::Object;
	using v8::String;
	using v8::Value;
	using v8::Integer;

	struct AllocatedMemoryRange {
		void* address;
		hcp_Size_t size;
	};

	struct CodecInstance {
		const size_t id;
		const size_t model;
		const std::string library;
	};
	

	typedef hcp_tCodecLibrary* (*LoadCodec)(void);

	class HcpState {
	public:
		
		HcpState();

		bool isInitialized() const;
		hcp_Size_t heapSize() const;

		size_t loadModel(const std::string & sModel);
		void scanDir(const std::string & sPath);
		size_t newCodec(const std::string & LibraryName,const size_t ModelId);
		void closeCode(const size_t codecId);
		size_t encode(const size_t CodecId, std::string Command, unsigned char* dest, const size_t length);
		size_t decode(const size_t CodecId, const unsigned char* source, const size_t length, Isolate* isolate, Local<Object> & dest);

		bool hasLibrary(const std::string LibraryName) const;
		bool hasModel(const size_t Id) const;
		bool hasCodec(const size_t Id) const;

		void unload();

	public:

		static void atExit(void* arg);
		static void init(Local<Object> exports);
		static void initState(const FunctionCallbackInfo<Value>& args);
		static void heapSize(const FunctionCallbackInfo<Value>& args);
		static void loadModel(const FunctionCallbackInfo<Value>& args);
		static void getLibraries(const FunctionCallbackInfo<Value>& args);
		static void newCodec(const FunctionCallbackInfo<Value>& args);
		static void closeCodec(const FunctionCallbackInfo<Value>& args);
		static void encode(const FunctionCallbackInfo<Value>& args);
		static void decode(const FunctionCallbackInfo<Value>& args);

	private:

		std::list<std::string> getLibraries() const;
		void loadLibrary(const std::string & sFilename, CodecLibrary & Library);
		hcp_Boolean TryLock(const void* pPtr, const hcp_Size_t Timeout);
		void Unlock(const void* pPtr);
		void* Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length);
		void* Memcpy(void* pDest, const void* psource, const hcp_Size_t Length);
		void Free(void* pDest);
		void* Malloc(const hcp_Size_t Size);
		void* Realloc(void* pDest, const hcp_Size_t Size);

	private:

		std::list<AllocatedMemoryRange> _blocks;
		std::list<CodecLibrary> _libraries;
		std::list<size_t> _models;
		std::list<CodecInstance> _codecs;

		hcp_tState* _pState;

	private:
	
		static hcp_Boolean TryLock(const void* pPtr, const hcp_Size_t Timeout, void* pContext);
		static void Unlock(const void* pPtr, void* pContext);
		static void* Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length, void* pContext);
		static void* Memcpy(void* pDest, const void* psource, const hcp_Size_t Length, void* pContext);
		static void Free(void* pDest, void* pContext);
		static void* Malloc(const hcp_Size_t Size, void* pContext);
		static void* Realloc(void* pDest, const hcp_Size_t Size, void* pContext);
	};


	NODE_MODULE(hcp, HcpState::init)
}

#endif