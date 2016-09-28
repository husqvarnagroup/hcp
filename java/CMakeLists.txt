cmake_minimum_required(VERSION 3.5)
  project(hcp_jni VERSION 1.0 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 14)

include(UseJava)

find_package(JNI REQUIRED)

  find_package(Java COMPONENTS Development)


  set(jni_src
#managed/src/com/husqvarnagroup/connectivity/HcpElement.java
      managed/src/com/husqvarnagroup/connectivity/HcpJNI.java
#managed/src/com/husqvarnagroup/connectivity/HcpSerializer.java
#managed/src/com/husqvarnagroup/connectivity/HcpSerializerFactory.java
     )

  add_jar(hcp_jni ${jni_src})


  get_target_property(_jarFile hcp_jni JAR_FILE)
get_target_property(_classDir hcp_jni CLASSDIR)

message(STATUS "Jar file ${_jarFile}")
message(STATUS "Class compiled to ${_classDir}")

ADD_CUSTOM_COMMAND( 
  OUTPUT    com_husqvarnagroup_connectivity_HcpJNI.h 
  COMMAND   ${Java_JAVAH_EXECUTABLE}
  ARGS      -jni -verbose -classpath ${_classDir} com.husqvarnagroup.connectivity.HcpJNI
  DEPENDS   ${_jarFile}
  COMMENT   "Build JNI Header"
  )

add_library(HcpJNI STATIC native/jni/hcp_jni.cpp ${CMAKE_CURRENT_BINARY_DIR}/com_husqvarnagroup_connectivity_HcpJNI.h )
target_include_directories(HcpJNI PUBLIC ${CMAKE_CURRENT_BINARY_DIR})
target_include_directories(HcpJNI PUBLIC ${JNI_INCLUDE_DIRS})
target_include_directories(HcpJNI PUBLIC native/jni)
target_link_libraries(HcpJNI PUBLIC hcp)
