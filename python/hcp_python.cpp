#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
extern "C" {
#include <hcp_types.h>
#include <hcp_error.h>
#include <hcp_codec.h>
#include <hcp_state.h>
}
#include "hcp.h"

namespace py = pybind11;

int add(int i, int j) {
    return i + j;
}
std::string echo(const char* str) {
  return str;
}
namespace hcp {
using byte = unsigned char;
struct Result {
    std::string command;
    std::string family;
    std::int32_t error;
    std::int32_t deviceError;
    std::string message;
    std::map<std::string,py::object> parameters;
	};
  std::string to_string(hcp_tString const& str)
  {
      if (str.zeroTerm == HCP_FALSE) 
          return {str.value, str.value + str.length};
      else 
          return str.value;
  }
  py::object convert(hcp_tParameter const& parameter) {
	switch(parameter.template_->type) {
			case HCP_FLOAT_ID:  return py::float_(parameter.value.f);
     case HCP_BOOLEAN_ID: return py::bool_(parameter.value.b);
			case HCP_SIZET_ID: return py::int_(parameter.value.sz);
			case HCP_UINT8_ID: return py::int_(parameter.value.u8);
			case HCP_UINT16_ID: return py::int_(parameter.value.u16);
			case HCP_INT16_ID: return py::int_(parameter.value.i16);
			case HCP_UINT32_ID: return py::int_(parameter.value.u32);
			case HCP_INT32_ID: return py::int_(parameter.value.i32);
			case HCP_UINT64_ID: return py::int_(parameter.value.u64);
			case HCP_INT64_ID: return py::int_(parameter.value.i64);
			case HCP_STRING_ID: return py::str(to_string(parameter.value.str));
			case HCP_DOUBLE_ID: return py::float_(parameter.value.d);
			case HCP_BLOB_ID: return py::bytes(reinterpret_cast<char const*>(parameter.value.blb.value),parameter.value.blb.length);
			case HCP_UNIXTIME_ID: return py::int_(parameter.value.time);
			case HCP_SIMPLEVERSION_ID: return py::int_(parameter.value.version);
			default : return {};
  }
  }
  Result convert(hcp_tResult const& res) {
    std::map<std::string,py::object> ret;
    for(hcp_Size_t i = 0;i < res.parameterCount; i++) {
      auto& parameter = res.parameters[i];
      ret[to_string(parameter.template_->name)] = convert(parameter);
    }
    return {
      to_string(res.command),
      to_string(res.family),
      res.error,
      res.deviceError,
      res.message,
      std::move(ret)
    };
  }
  std::string GetMessage(int error)
  {
      constexpr hcp_Size_t BufferSize = 512;
      char buffer[BufferSize];

      hcp_GetMessage(error, buffer, BufferSize);
      return buffer;
  }
  struct HcpException : std::runtime_error {
    HcpException(int error) : std::runtime_error(GetMessage(error)) {}
  };
auto toState(long p) {
 auto runtime = reinterpret_cast<hcp::Runtime*>(p);
 return runtime->getState();
}
long NewState(char const* path) {
        auto runtime = hcp_init_runtime(path);
        return reinterpret_cast<long>(runtime);
}
void CloseState(long StateHandle)
{
    auto res = hcp_CloseState(toState(StateHandle));
    free((void*)StateHandle);
    if (res != HCP_NOERROR) 
      throw HcpException(res);
}
std::vector<std::string> GetCodecNames() { 
  auto siz = hcp_getCodecCount();
  auto ret = std::vector<std::string>{siz};
    for (int i = 0; i < siz; ++i)
      ret[i] = hcp_getCodecName(i);
  return ret;
}

long NewCodec(long StateHandle, char const* Codec, long ModelId) { 
  hcp_Size_t pId;
  auto res = hcp_NewCodec(toState(StateHandle), Codec, ModelId, &pId);
  if(res != HCP_NOERROR) 
    throw HcpException(res);

  return pId;
}
void CloseCodec(long StateHandle, long CodecId) {
    auto res = hcp_CloseCodec(toState(StateHandle), CodecId);
    if (res != HCP_NOERROR) 
      throw HcpException(res);
}
int LoadModel(long StateHandle, std::string Model) { 
    hcp_Int pId;
    auto res = hcp_LoadModel(toState(StateHandle), Model.c_str(), Model.size(), &pId);
    if (res != HCP_NOERROR) 
      throw HcpException( res);
    return pId;
}

auto Decode(long StateHandle, long CodecId, std::vector<byte> const& Data)
           -> std::tuple<Result,int>
{
  hcp_tResult dest;
    auto bytesRead = hcp_Decode(toState(StateHandle), CodecId, Data.data(), Data.size(), &dest);
    if(bytesRead < 0)
      throw HcpException(bytesRead);
    return std::make_tuple(convert(dest),bytesRead);
  }
	auto Encode(long StateHandle, long CodecId, char const* Command)
  -> std::tuple<std::vector<byte>,int>
{
  std::vector<byte> Destination(1024);
    auto bytesWritten = hcp_Encode(toState(StateHandle), CodecId, Command, Destination.data(), Destination.size());
    if (bytesWritten < 0) 
      throw HcpException( bytesWritten);
    assert(bytesWritten <= Destination.size());
    Destination.resize(bytesWritten);
    std::cout << "decoded" << std::endl;
    return std::make_tuple(std::move(Destination),bytesWritten);
  }
}

PYBIND11_PLUGIN(hcp_python) {
    py::module m("hcp_pybind11python", "pybind11 example plugin");
    py::register_exception<hcp::HcpException>(m, "HcpException");
    py::class_<hcp::Result>(m, "Result")
      .def_readwrite("command", &hcp::Result::command)
      .def_readwrite("family", &hcp::Result::family)
      .def_readwrite("error", &hcp::Result::error)
      .def_readwrite("deviceError", &hcp::Result::deviceError)
      .def_readwrite("message", &hcp::Result::message)
      .def_readwrite("parameters", &hcp::Result::parameters);

    m.def("add", &add, "A function which adds two numbers");
    m.def("echo", &echo, "A function which adds two numbers");

    m.def("NewState", &hcp::NewState, "A function which creates a new state");
    m.def("CloseState", &hcp::CloseState, "");
    m.def("GetCodecNames", &hcp::GetCodecNames, "");
    m.def("NewCodec", &hcp::NewCodec, "");
    m.def("CloseCodec", &hcp::CloseCodec, "");
    m.def("LoadModel", &hcp::LoadModel, "");
    m.def("Decode", &hcp::Decode, "");
    m.def("Encode", &hcp::Encode, "");

    return m.ptr();
}
