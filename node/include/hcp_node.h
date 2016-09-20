#ifndef HCP_NODE_H__
#define HCP_NODE_H__

#include <node.h>
#include <list>
#include <vector>
#include <uv.h>
#include "../../c/include/hcp_runtime.h"

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

		bool initialize(const std::string & sPath);
		std::list<std::string> getLibraries() const;
		

	private:

		std::list<AllocatedMemoryRange> _blocks;
		std::list<CodecLibrary> _libraries;
		std::list<size_t> _models;
		std::list<CodecInstance> _codecs;

		hcp_tState* _pState;
	};


	NODE_MODULE(hcp, HcpState::init)
}

#endif