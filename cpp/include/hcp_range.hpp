#pragma once
#include <type_traits>

/**
 * Returns the begin iterator of hcp vector
 */
template <typename V>
auto begin(V& v) -> decltype(&v.fixed[0])
{
    using T = typename std::remove_reference<decltype(v.fixed[0])>::type;
    return static_cast<T*>(v.header.values);
}
/**
 * Returns the end iterator of hcp vector
 */
template <typename V>
auto end(V& v) -> decltype(&v.fixed[0])
{
    using T = typename std::remove_reference<decltype(v.fixed[0])>::type;
  assert(sizeof(T) == v.header.elementSize );
  return static_cast<T*>(v.header.values) + v.header.length;
}
