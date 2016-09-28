#define CATCH_CONFIG_MAIN
#include "catch.hpp"
#include "hcp.h"
#include "hcp_state.h"
//#include "runtime.hpp"
#include <string>
#include "json.hpp"

std::string read_file(char const* filename)
{
    std::ifstream in(filename, std::ios::in);
    if (!in) return {};
    return {std::istreambuf_iterator<char>(in),
            std::istreambuf_iterator<char>()};
}
  hcp_tHost default_mem() {
    hcp_tHost host;
    std::memset(&host, 0, sizeof(hcp_tHost));

    host.free_   = [](void* dest,void*) { std::free(dest); };
    host.malloc_ = [](hcp_Size_t dest,void*) { return std::malloc(dest); };
    host.memcpy_ = [](void* dest,void const* source, hcp_Size_t size,void*) { return std::memcpy(dest,source,size); };
    host.memset_ = [](void* dest,hcp_Int value, hcp_Size_t len,void*) { return std::memset(dest,value,len); };

    return host;
  }

using namespace std::string_literals;
using nlohmann::json;

    auto model = "../../hcprobotics/models/_AMG3-Debug.json";
    auto codecs = "../../build/hcprobotics";
auto codeclib(hcp_cszStr name) -> hcp_tCodecLibrary {
  auto setup = [](hcp_tRuntime*, hcp_tBuffer*) -> int {return 0; };
  auto encode = [](
    hcp_tRuntime*, 
    hcp_tProtocol*, 
    const hcp_tCommand* pCommand, 
    hcp_tBlob* pDestination, 
    hcp_tBuffer*) -> int 
  {
    assert(pDestination->maxLength > 32);
    return 0;
  };
  auto decode = [](
    hcp_tRuntime* pRuntime, 
    hcp_tProtocol* pProtocol, 
    const hcp_tBlob* pSource, 
    hcp_tCommandSet* pCommands, 
    hcp_tCommand** ppCommand, 
    hcp_tBuffer* pContext) -> int
  {
    return 0;
  };
  auto lastError = [](
    hcp_tRuntime* pRuntime, 
    hcp_tBuffer* pContext, 
    hcp_cszStr* pMessage) -> int
  {
    return 0;
  };
  auto errors = hcp_tErrorMessage{HCP_NULL,HCP_NULL};


  return { 1,name, setup, encode, decode, lastError, &errors, {} };
}

    auto testModel() -> json {
      return {
        {"header",{}},
        {"types",json::array({})},
        {"methods",json::array({})},
      };

    }
TEST_CASE( "Read codecs", "[fail]" ) {
    auto state = hcp_init(codecs);
    REQUIRE( hcp_getCodecCount() == 1 );
}
TEST_CASE("Load codec", "[fail]")
{
    auto state = hcp_tState{};
    auto name = "CodecA"s;
    auto lib = codeclib(name.c_str());
    auto host = default_mem();

    auto err = hcp_NewState(&state, &host);
    REQUIRE(err == HCP_NOERROR);
    char out_name[32];

    err = hcp_LoadCodec(&state, &lib, out_name, 32);
    REQUIRE(err == HCP_NOERROR);
    REQUIRE(name == out_name);

    auto model = testModel().dump();
    hcp_Int id = -1;
    err = hcp_LoadModel(&state, model.c_str(), model.size(), &id);
    REQUIRE(err == HCP_NOERROR);
    REQUIRE(id != -1);

    hcp_Size_t cid = -1;
    err = hcp_NewCodec(&state, name.c_str(), id, &cid);
    REQUIRE(err == HCP_NOERROR);
    REQUIRE(id != -1);

    err = hcp_CloseCodec(&state, cid);
    REQUIRE(err == HCP_NOERROR);

    err = hcp_CloseState(&state);
    REQUIRE(err == HCP_NOERROR);
}
