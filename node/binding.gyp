{
  "targets": [
    {
      "include_dirs" : [
        "./../cpp/include",
        "./../cpp/src",
        "./../c/include"
      ],
      "target_name": "hcp",
      "sources": [
        "./../c/src/cJSON.c",
        "./../c/src/hcp_error.c",
        "./../c/src/hcp_library.c",
        "./../c/src/hcp_runtime.c",
        "./../c/src/hcp_string.c",
        "./../c/src/hcp_tif.c",
        "./../c/src/hcp_vector.c", 
        "./../cpp/src/hcp.cpp",
        "./src/hcp_node.cpp" 
      ]
    }
  ]
}