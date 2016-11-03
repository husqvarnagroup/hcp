# CMake generated Testfile for 
# Source directory: /Users/olof/Repos/hcp/echo_codec
# Build directory: /Users/olof/Repos/hcp/bin/echo_codec
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
if("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Dd][Ee][Bb][Uu][Gg])$")
  add_test(EchoCodecTests "/Users/olof/Repos/hcp/bin/echo_codec/Debug/echo_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Rr][Ee][Ll][Ee][Aa][Ss][Ee])$")
  add_test(EchoCodecTests "/Users/olof/Repos/hcp/bin/echo_codec/Release/echo_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Mm][Ii][Nn][Ss][Ii][Zz][Ee][Rr][Ee][Ll])$")
  add_test(EchoCodecTests "/Users/olof/Repos/hcp/bin/echo_codec/MinSizeRel/echo_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Rr][Ee][Ll][Ww][Ii][Tt][Hh][Dd][Ee][Bb][Ii][Nn][Ff][Oo])$")
  add_test(EchoCodecTests "/Users/olof/Repos/hcp/bin/echo_codec/RelWithDebInfo/echo_test")
else()
  add_test(EchoCodecTests NOT_AVAILABLE)
endif()
