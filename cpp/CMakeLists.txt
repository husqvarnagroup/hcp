cmake_minimum_required(VERSION 3.5)
  project(hcp_cpp VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)

find_package(LibUV REQUIRED)

set(hcp_cpp 
    src/hcp.cpp
    include/hcp.h
   )

add_library(hcp_cpp STATIC ${hcp_cpp})

target_include_directories(hcp_cpp PUBLIC include)
target_link_libraries(hcp_cpp PUBLIC hcp)

target_link_libraries(hcp_cpp PUBLIC ${LIBUV_LIBRARIES})
target_include_directories(hcp_cpp PUBLIC ${LIBUV_INCLUDE_DIRS})
#target_compile_options(hcp_cpp PRIVATE -Wno-writable-strings)


