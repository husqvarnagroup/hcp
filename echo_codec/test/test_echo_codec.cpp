#define CATCH_CONFIG_MAIN
#include <catch.hpp>
#include <hcp_echo_codec.h>
#include <hcp/util.hpp>
#include <hcp/runtime.hpp>
#include <array>
extern "C" {
#include <hcp_string.h>
#include <hcp_runtime.h>
#include <hcp_vector.h>
#include <hcp_library.h>
#include <hcp_state.h>
}

hcp_tState default_state() {
  auto state = hcp_tState{};
  auto host = hcp::default_mem();
  auto ok = hcp_NewState(&state,&host);
  return state;
}
#if 0
hcp_tRuntime default_runtime() {
  auto runtime = hcp_tRuntime{};
  auto state = hcp_tState{};
  state.host = default_mem();
  hcp_InitializeRuntime(&state,&runtime);
  return runtime;
}
#endif
bool operator==(hcp_tString const& lhs, hcp_tString const& rhs) {
  return hcp_tStrCmp(&lhs,&rhs) == 0;
}
bool operator==(hcp_tParameter const& lhs, hcp_tParameter const& rhs) {
  return false;
}
bool operator==(hcp_tParameterSet const& lhs, hcp_tParameterSet const& rhs) {
  return std::equal(begin(lhs),end(lhs),begin(rhs),end(rhs));
}
bool operator==(hcp_tCommandHeader const& lhs, hcp_tCommandHeader const& rhs) {
  return lhs.family == rhs.family
    &&   lhs.command == rhs.command;
}
bool operator==(hcp_tCommand const& lhs, hcp_tCommand const& rhs) {
  return lhs.template_->header == rhs.template_->header
    &&   lhs.inParams == rhs.inParams;
}

template <typename V>
auto initVector(hcp_tState& state) {
  auto compare = [](auto const& lhs, auto const& rhs) { return false; };
  //auto compare = [](Param const& lhs, Param const& rhs) { return lhs==rhs; }
  V vec;
  using T = decltype(vec.fixed[0]);
  auto              error =
      HCP_INITIALIZEVECTOR(&state, &(vec.header), vec.fixed, T, nullptr, nullptr, nullptr);
  assert(error == HCP_NOERROR );
  return vec;
}
template <typename V>
auto initVector() {
  auto compare = [](auto const& lhs, auto const& rhs) { return false; };
  //auto compare = [](Param const& lhs, Param const& rhs) { return lhs==rhs; }
  V vec;
  using T = decltype(vec.fixed[0]);
  auto              error =
      HCP_INITIALIZEVECTOR(nullptr, &(vec.header), vec.fixed, T, nullptr, nullptr, nullptr);
    assert(sizeof(T) == vec.header.elementSize);
    
  assert(error == HCP_NOERROR );
  return vec;
}

hcp_tString fromStrLit(char const* str) {
  hcp_tString ret;
  ret.value = str;
  ret.length = strlen(str);
  ret.zeroTerm = 1;
  return ret;
}

namespace param_types {
struct id {
  hcp_Uint8 operator()(hcp_Double) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Float) { return HCP_UINT8_ID; }
  //hcp_Uint8 operator()(hcp_Boolean) { return HCP_UINT8_ID; }
  //hcp_Uint8 operator()(hcp_Size_t) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Uint8) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Int8) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Uint16) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Int16) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Uint32) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Int32) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Uint64) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_Int64) { return HCP_UINT8_ID; }
  //hcp_Uint8 operator()(hcp_UnixTime) { return HCP_UINT8_ID; }
  //hcp_Uint8 operator()(hcp_SimpleVersion) { return HCP_UINT8_ID; }
  //hcp_Uint8 operator()(hcp_Int) { return HCP_UINT8_ID; }
  //hcp_Uint8 operator()(hcp_Void const*) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_tString) { return HCP_UINT8_ID; }
  hcp_Uint8 operator()(hcp_tBlob) { return HCP_UINT8_ID; }
};
struct value {
  hcp_tValue operator()(hcp_Double value) { hcp_tValue val; val.d = value; return val; }
  hcp_tValue operator()(hcp_Float value) { hcp_tValue val; val.f = value; return val; }
  //hcp_tValue operator()(hcp_Boolean value) { hcp_tValue val; val.b = value; return val; }
  //hcp_tValue operator()(hcp_Size_t value) { hcp_tValue val; val.sz value; return val; }
  hcp_tValue operator()(hcp_Uint8 value) { hcp_tValue val; val.u8 = value; return val; }
  hcp_tValue operator()(hcp_Int8 value) { hcp_tValue val; val.s8 = value; return val; }
  hcp_tValue operator()(hcp_Uint16 value) { hcp_tValue val; val.u16 = value; return val; }
  hcp_tValue operator()(hcp_Int16 value) { hcp_tValue val; val.i16 = value; return val; }
  hcp_tValue operator()(hcp_Uint32 value) { hcp_tValue val; val.u32 = value; return val; }
  hcp_tValue operator()(hcp_Int32 value) { hcp_tValue val; val.i32 = value; return val; }
  hcp_tValue operator()(hcp_Uint64 value) { hcp_tValue val; val.u64 = value; return val; }
  hcp_tValue operator()(hcp_Int64 value) { hcp_tValue val; val.i64 = value; return val; }
  //hcp_tValue operator()(hcp_UnixTime value) { hcp_tValue val; val.time = value; return val; }
  //hcp_tValue operator()(hcp_SimpleVersion value) { hcp_tValue val; val.version = value; return val; }
  //hcp_tValue operator()(hcp_Int value) { hcp_tValue val; val.i = val; return value; }
  //hcp_tValue operator()(hcp_Void const* value) { hcp_tValue val; val.p = value; return val; }
  hcp_tValue operator()(hcp_tString value) { hcp_tValue val; val.str = value; return val; }
    hcp_tValue operator()(hcp_tBlob value) { hcp_tValue val; val.blb = value; return val; }
};
struct length {
  hcp_Int32 operator()(hcp_Double) { return 0; }
  hcp_Int32 operator()(hcp_Float) { return 0; }
  //hcp_Int32 operator()(hcp_Boolean) { return 0; }
  //hcp_Int32 operator()(hcp_Size_t) { return 0; }
  hcp_Int32 operator()(hcp_Uint8) { return 0; }
  hcp_Int32 operator()(hcp_Int8) { return 0; }
  hcp_Int32 operator()(hcp_Uint16) { return 0; }
  hcp_Int32 operator()(hcp_Int16) { return 0; }
  hcp_Int32 operator()(hcp_Uint32) { return 0; }
  hcp_Int32 operator()(hcp_Int32) { return 0; }
  hcp_Int32 operator()(hcp_Uint64) { return 0; }
  hcp_Int32 operator()(hcp_Int64) { return 0; }
  //hcp_Int32 operator()(hcp_UnixTime) { return 0; }
  //hcp_Int32 operator()(hcp_SimpleVersion) { return 0; }
  //hcp_Int32 operator()(hcp_Int) { return 0; }
  //hcp_Int32 operator()(hcp_Void const*) { return 0; }
  hcp_Int32 operator()(hcp_tString) { return 0; }
  hcp_Int32 operator()(hcp_tBlob) { return 0; }
};
struct default_value {
  hcp_tValue operator()(hcp_Uint8) { hcp_tValue val; val.u8 = 0.f; return val; }
};
}
class ParmeterFactory {
  // std::vector<std::unique_ptr<char[]>> names;
  std::vector<std::unique_ptr<hcp_tParameterTemplate>> templates;

 public:
  template <typename T>
  hcp_tParameter parameter(char const* name, T value) {
    auto ret    = hcp_tParameter{};
    auto id     = param_types::id{};
    auto length = param_types::length{};
    auto val    = param_types::value{};

    auto tpl = hcp_tParameterTemplate{fromStrLit(name), id(value), length(value)};
    templates.push_back(std::make_unique<hcp_tParameterTemplate>(tpl));
    ret.template_ = templates.back().get();
    ret.value     = val(value);
    ret.hasValue  = true;
    return ret;
  }
  std::vector<hcp_tParameter> oneOfEach() {
    return {
      parameter("d",1.2),
      parameter("f",1.3f),
      parameter("u8",(hcp_Uint8)2),
      parameter("i8",(hcp_Int8)3),
      parameter("u16",(hcp_Uint16)4),
      parameter("i16",(hcp_Int16)5),
      parameter("u32",(hcp_Uint32)6),
      parameter("i32",(hcp_Int32)7),
      parameter("u64",(hcp_Uint64)8),
      parameter("i64",(hcp_Int64)9),
      parameter("str",fromStrLit("a string"))
    };
  }
};

TEST_CASE( "Runtime", "Bytes <--> Parameters" ) {

    auto strings = std::vector<std::string>{};
    auto paramtpls = std::vector<hcp_tParameterTemplate>{};
    // as we take pointers to elements. Make sure there will be no reallocations
    strings.reserve(32);
    paramtpls.reserve(32);

    auto endianess = HCP_LITTLEENDIAN;
    auto state = default_state();
    auto buffer = std::vector<hcp_Uint8>{};
    buffer.resize(512);
    auto dest = hcp_tBlob{buffer.data(),0,buffer.size()};

    auto paramsOut = hcp_tParameterSet{};
    auto error = HCP_INITIALIZEVECTOR(&state, &paramsOut.header, paramsOut.fixed, hcp_tParameter, nullptr, nullptr, nullptr);
    {
        auto params = hcp_tParameterSet{};
        auto error =
            HCP_INITIALIZEVECTOR(&state, &params.header, params.fixed,
                                 hcp_tParameter, nullptr, nullptr, nullptr);
        strings.emplace_back("p1");
        paramtpls.push_back({{strings.back().c_str(),strings.back().size()+1,1}, HCP_UINT16_ID, 0});
        hcp_tValue value;
        value.u16 = 31;
        auto val = hcp_tParameter{&paramtpls.back(),value,1};
        auto index = hcp_Size_t{0};
        hcp_Push(&params.header, &val, &index);
        hcp_tValue valueOut;
        valueOut.u16 = 11;
        hcp_Push(&paramsOut.header, &val, &index);
        error = hcp_AppendParameters(&state.runtime, &dest, &params, endianess,
                                     HCP_NULL, HCP_NULL);
        REQUIRE(dest.length > 0);
        CHECK(error == HCP_NOERROR);
        if (error != HCP_NOERROR) FAIL(hcp::GetErrorMessage(error));
  }
  {
    auto bytesRead = hcp_BytesToParameters(&state.runtime, &dest, 0, &paramsOut, endianess, HCP_NULL, HCP_NULL);
    CHECK(bytesRead == dest.length);
    REQUIRE(std::distance(begin(paramsOut),end(paramsOut)) == 1); 
  }
}

TEST_CASE( "Echo codec", "Encode/Decode" ) {

     auto CompareProtocolNode = [](void* pProtocolNode, void* pName, void* pState) -> hcp_Int {
        hcp_tProtocolNode* node = (hcp_tProtocolNode*)pProtocolNode;
        hcp_tString* name = (hcp_tString*)pName;
        
        return hcp_tStrCmp(&node->key, name);
     };
    auto state = default_state();
  std::uint8_t buf[1024];
  auto fam = "family";
  auto cmd = "command";
  hcp_tBlob buffer{buf,0,1024};
  hcp_tCommandTemplate tplate;
  tplate.header.family = fromStrLit(fam);
  tplate.header.command = fromStrLit(cmd);
  //tplate.protocol = initVector<hcp_tProtocol>(state);
  auto error = HCP_INITIALIZEVECTOR(&state, &tplate.protocol.header, tplate.protocol.fixed, hcp_tProtocol, nullptr, CompareProtocolNode, nullptr);
  REQUIRE(error == HCP_NOERROR);
  
  {
  hcp_Size_t index = 0;
  auto ok = hcp_PushEmpty(&tplate.protocol.header,&index);
  REQUIRE(ok == HCP_NOERROR);
  auto node = (hcp_tProtocolNode* )hcp_ValueAt(&tplate.protocol.header,index);
  node->key = fromStrLit("msgType");
  node->value = fromStrLit("6");
  }

  hcp_tCommand commandIn{&tplate};
  error = HCP_INITIALIZEVECTOR(&state, &commandIn.inParams.header, commandIn.inParams.fixed, hcp_tParameter, nullptr, nullptr, nullptr);
  REQUIRE(error == HCP_NOERROR);
  error = HCP_INITIALIZEVECTOR(&state, &commandIn.outParams.header, commandIn.outParams.fixed, hcp_tParameter, nullptr, nullptr, nullptr);
  REQUIRE(error == HCP_NOERROR);
 auto params = std::array<hcp_tParameter,0> {
 };
 for(auto& param : params) {
   //hcp_Size_t index;
   //auto ok = hcp_Push(&commandIn.Params,&param,
 }
  auto plugin = hcp_GetLibrary();
  auto context = hcp_tBuffer{};
    auto ok = plugin->setup(&state.runtime,&context);
    CHECK(ok == HCP_NOERROR);
    ok = plugin->encode(&state.runtime,nullptr,&commandIn,&buffer,&context);
  //auto ok = hcp::encode(nullptr,nullptr,&commandIn,&buffer,nullptr);
  CHECK(ok == HCP_NOERROR);
  if(ok != HCP_NOERROR)
    FAIL(hcp::GetErrorMessage(ok));

  hcp_tCommand* commandOut;
  auto readBytes = plugin->decode(&state.runtime,nullptr,&buffer,nullptr,&commandOut,&context);
  //ok = 	hcp::decode(nullptr,nullptr,&buffer,nullptr,&commandOut,nullptr);
  //CHECK(ok == HCP_NOERROR);
  //if(ok != HCP_NOERROR)
   // FAIL(hcp::GetErrorMessage(ok));
  REQUIRE(commandOut->template_->header == commandIn.template_->header);
  REQUIRE(commandOut->outParams == commandIn.inParams);


  //REQUIRE(false);
}
