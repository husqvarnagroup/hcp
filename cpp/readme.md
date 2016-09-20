# HCP C++

```C/C++
#include "hcp_runtime.h"

// create new runtime state
auto state = hcp_init("./codecs");

printf("Loaded %d codecs.", hcp_getCodecCount());

// list all codecs
for(auto i = 0;i < hcp_getCodecCount(); i++) {
    printf("\t%d:%s", i, hcp_getCodecName(i));
}

auto model = "{ Add real object model here}";
hcp_Size_t modelId;

hcp_Int error = HCP_NOERROR;

// load the object model
if((error = hcp_LoadModel(state, model, sizeof(model), &modelId)) != HCP_NOERROR) {
    char buffer[256];
    printf(hcp_GetMessage(error, buffer, sizeof(buffer)));
    return;
}

hcp_Int codecId = 0;

// create a codec instance
if((error = hcp_NewCodec(state, 'myCodec', modelId, &codecId)) != HCP_NOERROR) {
    char buffer[256];
    printf(hcp_GetMessage(error, buffer, sizeof(buffer)));
    return;
}

...
```