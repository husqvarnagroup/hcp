# CMake generated Testfile for 
# Source directory: /Users/olof/Repos/hcp/objective-c
# Build directory: /Users/olof/Repos/hcp/bin/objective-c
# 
# This file includes the relevant testing commands required for 
# testing this directory and lists subdirectories to be tested as well.
if("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Dd][Ee][Bb][Uu][Gg])$")
  add_test(HcpObjCTests "/Users/olof/Repos/hcp/bin/objective-c/Debug/objC_test.app/Contents/MacOS/objC_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Rr][Ee][Ll][Ee][Aa][Ss][Ee])$")
  add_test(HcpObjCTests "/Users/olof/Repos/hcp/bin/objective-c/Release/objC_test.app/Contents/MacOS/objC_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Mm][Ii][Nn][Ss][Ii][Zz][Ee][Rr][Ee][Ll])$")
  add_test(HcpObjCTests "/Users/olof/Repos/hcp/bin/objective-c/MinSizeRel/objC_test.app/Contents/MacOS/objC_test")
elseif("${CTEST_CONFIGURATION_TYPE}" MATCHES "^([Rr][Ee][Ll][Ww][Ii][Tt][Hh][Dd][Ee][Bb][Ii][Nn][Ff][Oo])$")
  add_test(HcpObjCTests "/Users/olof/Repos/hcp/bin/objective-c/RelWithDebInfo/objC_test.app/Contents/MacOS/objC_test")
else()
  add_test(HcpObjCTests NOT_AVAILABLE)
endif()
