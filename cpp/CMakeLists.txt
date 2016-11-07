cmake_minimum_required(VERSION 3.5)
  project(hcp_cpp VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)

find_package(LibUV REQUIRED)

set(hcp_cpp 
    src/hcp.cpp
    src/hcp_scan.cpp
    src/hcp_defaulthost.cpp
    include/hcp.h
    include/hcp_scan.h
    include/hcp_range.hpp
   )

add_library(hcp_cpp STATIC ${hcp_cpp})

target_include_directories(hcp_cpp PUBLIC include)
target_link_libraries(hcp_cpp PUBLIC hcp LibUV::LibUV)
set_property(TARGET hcp_cpp PROPERTY POSITION_INDEPENDENT_CODE ON)
#target_compile_options(hcp_cpp PRIVATE -Werror -Wpedantic)

if(HCP_ENABLE_TESTS)
  add_library(catch INTERFACE)
  target_include_directories(catch INTERFACE lib/catch/include)

  add_library(json INTERFACE)
  target_include_directories(json INTERFACE lib/json/src)

  add_executable(hcp_vector_test test/test_hcp_vector.cpp)
  target_link_libraries(hcp_vector_test hcp_cpp catch)
  set_property(TARGET hcp_vector_test PROPERTY CXX_STANDARD 11)

  add_test(NAME HcpVectorTests COMMAND hcp_vector_test)
endif()
