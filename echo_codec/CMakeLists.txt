cmake_minimum_required(VERSION 3.5)
project(echo_codec VERSION 1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 14)
enable_testing()

set(echo_codec_src
    src/hcp_echo_codec.cpp
    include/hcp_echo_codec.h
   )

add_library(echo_codec SHARED ${echo_codec_src})

target_include_directories(echo_codec PUBLIC include)
target_link_libraries(echo_codec PUBLIC hcp)

add_executable(echo_test test/test_echo_codec.cpp)
target_link_libraries(echo_test hcp_cpp echo_codec catch)
  target_include_directories(echo_test PRIVATE include)

add_test(NAME EchoCodecTests COMMAND echo_test)

