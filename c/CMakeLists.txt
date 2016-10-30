cmake_minimum_required(VERSION 3.5)
project(hcp_core VERSION 1.0 LANGUAGES C)

set(CMAKE_C_STANDARD 99)

set(hcp_src
    include/cJSON.h
    include/hcp_codec.h
    include/hcp_error.h
    include/hcp_library.h
    include/hcp_model.h
    include/hcp_runtime.h
    include/hcp_string.h
    include/hcp_tif.h
    include/hcp_types.h
    include/hcp_vector.h
    include/hcp_api.h

    src/cJSON.c
    src/hcp_error.c
    src/hcp_library.c
    src/hcp_runtime.c
    src/hcp_string.c
    src/hcp_tif.c
    src/hcp_vector.c
   )

add_library(hcp STATIC ${hcp_src})
target_include_directories(hcp PUBLIC include)
set_property(TARGET hcp PROPERTY POSITION_INDEPENDENT_CODE ON)

