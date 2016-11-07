#pragma once

#ifdef __cplusplus
extern "C" {
#endif
#include "hcp_types.h"

struct hcp_tCodecLibrary;
struct hcp_tState;
struct hcp_tHost;

void hcp_DefaultHost(struct hcp_tHost*);

typedef void (*library_callback)(struct hcp_tCodecLibrary*, void*);

void hcp_Scan(char const* path, library_callback, void* context);
void hcp_ScanAndLoad(char const* path, hcp_tState*);

#ifdef __cplusplus
}
#endif
