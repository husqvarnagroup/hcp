cmake_minimum_required(VERSION 3.5)
  project(hcp VERSION 1.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 14)
option(HCP_PYTHON "Enable the python bindings for hcp" OFF)
option(HCP_JAVA "Enable the java bindings for hcp" OFF)
option(HCP_OBJC "Enable the objective-c bindings for hcp" OFF)
option(HCP_ENABLE_TESTS "Enable unit tests for hcp" OFF)
option(HCP_ENABLE_EXAMPLES "Build examples for hcp" OFF)

if(HCP_ENABLE_TESTS)
  enable_testing()
endif()
  
if(HCP_PYTHON OR HCP_JAVA OR HCP_OBJC)
  list(APPEND CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake")
endif()

add_subdirectory(c)

if(HCP_PYTHON OR HCP_JAVA OR HCP_OBJC)
  add_subdirectory(cpp)
endif()

if(APPLE AND HCP_OBJC)
    add_subdirectory(objective-c)
  endif()

if(HCP_JAVA)
  add_subdirectory(java)
endif()

if(HCP_PYTHON)
  add_subdirectory(python)
endif()
  
#message(info ${LIBUV

#target_link_libraries(hcp_cpp LibUV)
#add_executable(hcp_cpp_demo cpp/src/main.cpp)
#target_link_libraries(hcp_cpp_demo hcp_cpp)
#target_compile_options(hcp_cpp_demo PRIVATE -Wno-writable-strings)
#target_compile_options(hcp_cpp_demo PRIVATE -Wno-format-security)
