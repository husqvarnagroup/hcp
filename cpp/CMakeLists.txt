cmake_minimum_required(VERSION 3.5)
  project(hcp_cpp VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)

find_package(LibUV REQUIRED)

set(hcp_cpp 
    src/hcp.cpp
    include/hcp.h
    src/hcp/scan.cpp
    include/hcp/scan.hpp
    src/hcp/runtime.cpp
    include/hcp/runtime.hpp
   )

add_library(hcp_cpp STATIC ${hcp_cpp})

target_include_directories(hcp_cpp PUBLIC include)
target_link_libraries(hcp_cpp PUBLIC hcp LibUV::LibUV)
set_property(TARGET hcp_cpp PROPERTY POSITION_INDEPENDENT_CODE ON)

#target_link_libraries(hcp_cpp PUBLIC ${LIBUV_LIBRARIES})
#target_include_directories(hcp_cpp PUBLIC ${LIBUV_INCLUDE_DIRS})
#target_compile_options(hcp_cpp PRIVATE -Wno-writable-strings)
if(HCP_ENABLE_TESTS)
add_library(catch INTERFACE)
target_include_directories(catch INTERFACE lib/catch/include)

add_library(json INTERFACE)
target_include_directories(json INTERFACE lib/json/src)

add_executable(runtime_test test/runtime.cpp)
target_link_libraries(runtime_test hcp_cpp catch json)
target_include_directories(runtime_test PUBLIC include)

add_executable(hcp_vector_test test/test_hcp_vector.cpp)
target_link_libraries(hcp_vector_test hcp_cpp catch)

  add_test(NAME HcpVectorTests COMMAND hcp_vector_test)
endif()
