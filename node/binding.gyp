{
    'make_global_settings': [
    ['CXX','/usr/bin/clang++'],
    ['LINK','/usr/bin/clang++'],
  ],
  'targets': [
    {
      'include_dirs' : [
        './../cpp/include',
        './../cpp/src',
        './../c/include'
      ],
      'target_name': 'hcp',
      'sources': [
        './../c/src/cJSON.c',
        './../c/src/hcp_error.c',
        './../c/src/hcp_library.c',
        './../c/src/hcp_runtime.c',
        './../c/src/hcp_string.c',
        './../c/src/hcp_tif.c',
        './../c/src/hcp_vector.c', 
        './../cpp/src/hcp.cpp',
        './src/hcp_node.cpp' 
      ]
    }
  ],
  'conditions': [
        [ 'OS=="mac"', {

          'xcode_settings': {
            'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++', '-fcxx-exceptions'],
            'OTHER_LDFLAGS': ['-stdlib=libc++'],
            'CLANG_CXX_LIBRARY': 'libc++',
            'CLANG_CXX_LANGUAGE_STANDARD':'c++11',
            },

        }],
      ]
}