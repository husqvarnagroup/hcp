cmake_minimum_required(VERSION 3.5)
  project(hcp_python VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)

add_subdirectory(lib/pybind11)

pybind11_add_module(hcp_python hcp_python.cpp)
target_link_libraries(hcp_python PRIVATE hcp_cpp)
