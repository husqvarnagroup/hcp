# Define a variable for classpath
CLASS_PATH = ../bin/
HCP_PATH = ../../../c/include
HCP_LIB_PATH = ../../../c/lib
HCP_ECHO_PATH = ../../../amg3/include
PACKAGE = com.husqvarnagroup.connectivity
JAVA_PATH = /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.11.sdk/System/Library/Frameworks/JavaVM.framework/Versions/A/Headers/
# Define a virtual path for .class in the bin directory
# vpath %.class $(CLASS_PATH)

all : libhcp-jni.jnilib

# $@ matches the target, $< matches the first dependancy
libhcp-jni.jnilib : hcp-jni.o
	gcc -m64 -Wl, -dynamiclib -o $@ $<

# $@ matches the target, $< matches the first dependancy
hcp-jni.o : hcp_jni.c com_husqvarnagroup_connectivity_HcpJNI.h
	gcc -D HCP_NOEXPORT -D _x64 -m64 -I$(HCP_ECHO_PATH) -I$(HCP_LIB_PATH) -I$(HCP_PATH) -I$(JAVA_PATH) -c $< -o $@

# $* matches the target filename without the extension
com_husqvarnagroup_connectivity_HcpJNI.h : ../bin/com/husqvarnagroup/connectivity/HcpJNI.class
	javah -classpath $(CLASS_PATH) com.husqvarnagroup.connectivity.HcpJNI
	
clean :
	rm com_husqvarnagroup_connectivity_HcpJNI.h hcp-jni.o libhcp-jni.jnilib
	