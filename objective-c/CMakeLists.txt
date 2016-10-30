cmake_minimum_required(VERSION 3.5)
  project(hcp_objC VERSION 1.0 LANGUAGES C)


find_package(LibUV REQUIRED)
  

set(hcp_objC_src
    src/runtime.m
    include/hcp_objc_runtime.h
   )

add_library(hcp_objC STATIC ${hcp_objC_src})

target_include_directories(hcp_objC PUBLIC include)
target_link_libraries(hcp_objC PUBLIC hcp_cpp)
target_link_libraries(hcp_objC PUBLIC "-framework Foundation")
target_compile_options(hcp_objC PRIVATE -Wall -pedantic -Werror -Wextra)
#target_compile_options(hcp_objC PRIVATE -Weverything -Werror)
target_compile_options(hcp_objC PUBLIC -fobjc-arc)
set_property(TARGET hcp_objC PROPERTY POSITION_INDEPENDENT_CODE ON)

add_executable(objC_example MACOSX_BUNDLE example/example.m)
target_link_libraries(objC_example hcp_objC)
target_link_libraries(objC_example hcp_cpp)
