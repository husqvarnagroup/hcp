#include <hcp/runtime.hpp>
#include <stdexcept>
#include <cstdlib>
#include <cstring>

namespace hcp {

  hcp_tHost default_mem() {
      hcp_tHost host;

      host.free_    = [](void* dest, void*) { std::free(dest); };
      host.malloc_  = [](hcp_Size_t dest, void*) { return std::malloc(dest); };
      host.memcpy_  = [](void* dest, void const* source, hcp_Size_t size, void*) { return std::memcpy(dest, source, size); };
      host.memset_  = [](void* dest, hcp_Int value, hcp_Size_t len, void*) { return std::memset(dest, value, len); };
      host.realloc_ = nullptr;
      host.lock     = nullptr;
      host.unlock   = nullptr;
      host.context  = nullptr;

      return host;
  }
  void throwOnError(hcp_Int err) {
    if(err == HCP_NOERROR)
      return;
    char buf[256];
    hcp_GetMessage(err,buf,256);
    throw std::runtime_error(buf);
  }                          
std::string  GetErrorMessage(int err) {
    char buf[256];
    hcp_GetMessage(err,buf,256);
    return buf;
}
  State::State(hcp_tHost const& host) 
    {
      throwOnError(hcp_NewState(&dest,&host));
    }
    State::~State() {
      throwOnError(hcp_CloseState(&dest));
    }
}
