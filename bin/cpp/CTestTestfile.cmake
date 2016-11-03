# CMake generated Testfile for 
# Source directory: /Users/olof/Repos/hcp/cpp
# Build directory: /Users/olof/Repos/hcp/bin/cpp
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
if("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Dd][Ee][Bb][Uu][Gg])$")
  add_test(HcpVectorTests "/Users/olof/Repos/hcp/bin/cpp/Debug/hcp_vector_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Rr][Ee][Ll][Ee][Aa][Ss][Ee])$")
  add_test(HcpVectorTests "/Users/olof/Repos/hcp/bin/cpp/Release/hcp_vector_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Mm][Ii][Nn][Ss][Ii][Zz][Ee][Rr][Ee][Ll])$")
  add_test(HcpVectorTests "/Users/olof/Repos/hcp/bin/cpp/MinSizeRel/hcp_vector_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Rr][Ee][Ll][Ww][Ii][Tt][Hh][Dd][Ee][Bb][Ii][Nn][Ff][Oo])$")
  add_test(HcpVectorTests "/Users/olof/Repos/hcp/bin/cpp/RelWithDebInfo/hcp_vector_test")
else()
  add_test(HcpVectorTests NOT_AVAILABLE)
endif()
