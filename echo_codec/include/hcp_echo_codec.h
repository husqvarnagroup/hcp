#pragma once
#include <hcp_api.h>

#ifdef __cplusplus
extern "C" {
#endif
  struct hcp_tCodecLibrary;
  HCP_API struct hcp_tCodecLibrary* HCP_CALL hcp_GetLibrary(void);
#ifdef __cplusplus
}
#endif



