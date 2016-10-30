#pragma once
extern "C" {
#include "hcp_runtime.h"
#include "hcp_state.h"
}
#include <memory>
#include <type_traits>
#include <string>

template <typename T> using unique_ptr_del = std::unique_ptr<T, void (*)(T*)>;

using unique_void_ptr = std::unique_ptr<void, void (*)(void*)>;

template <typename T> unique_void_ptr type_erase(unique_ptr_del<T> ptr)
{
    return unique_void_ptr{
        ptr.release(), reinterpret_cast<void (*)(void*)>(ptr.get_deleter())};
}

namespace hcp {
hcp_tHost default_mem();
std::string  GetErrorMessage(int);

class State {
  public:
    State()
      : State(default_mem())
    {
    }
    State(hcp_tHost const& host);
    State(State const&) = delete;
    State& operator=(State const&) = delete;
    ~State();
    // operator hcp_tState*() { return &dest; }
    operator hcp_tState&() { return dest; }

  private:
    hcp_tState dest;
};
class Library {
  public:
    Library(unique_void_ptr, hcp_tCodecLibrary*);
    hcp_tCodecLibrary* codec();

  private:
    unique_void_ptr _library; // Keep the dynamic library loaded
    hcp_tCodecLibrary* _codec;
};
}

