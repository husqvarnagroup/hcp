cmake_minimum_required(VERSION 3.5)
  project(hcp VERSION 1.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 14)
enable_testing()
  
  list(APPEND CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake")
  add_subdirectory(c)
  add_subdirectory(cpp)
  if(APPLE)
    add_subdirectory(objective-c)
  endif()
  add_subdirectory(java)
  add_subdirectory(python)
  
#message(info ${LIBUV

#target_link_libraries(hcp_cpp LibUV)
#add_executable(hcp_cpp_demo cpp/src/main.cpp)
#target_link_libraries(hcp_cpp_demo hcp_cpp)
#target_compile_options(hcp_cpp_demo PRIVATE -Wno-writable-strings)
#target_compile_options(hcp_cpp_demo PRIVATE -Wno-format-security)
