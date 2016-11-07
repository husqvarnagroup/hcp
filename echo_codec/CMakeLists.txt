cmake_minimum_required(VERSION 3.5)
project(echo_codec VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 11)
enable_testing()

set(echo_codec_src
    src/hcp_echo_codec.cpp
    include/hcp_echo_codec.h
   )

add_library(echo_codec SHARED ${echo_codec_src})

target_include_directories(echo_codec PUBLIC include)
target_link_libraries(echo_codec PUBLIC hcp)

