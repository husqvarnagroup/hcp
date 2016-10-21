#pragma once

#ifdef __cplusplus
extern "C" {
#endif
#include "hcp_types.h"

/*
 * Updated api on try out before adding to hcp_runtime
 */
typedef struct hcp_tError* hcp_Error_t;
typedef struct hcp_tState* hcp_State_t;

HCP_API void HCP_CALL hcp_DestructError2(hcp_Error_t);
HCP_API hcp_cszStr HCP_CALL hcp_GetMessage2(hcp_Error_t);

HCP_API hcp_State_t HCP_CALL hcp_NewState2(hcp_Error_t*);
HCP_API void HCP_CALL hcp_CloseState2(hcp_State_t, hcp_Error_t*);
/****************/

struct hcp_tCodecLibrary;
struct hcp_tState;

typedef void (*library_callback)(struct hcp_tCodecLibrary*, void*);

void hcp_Scan(char const* path, library_callback, void* context);
void hcp_ScanAndLoad(char const* path, hcp_tState*);

/**
 *	Returns the number of loaded codecs.
 *	@return Returns the number of codecs loaded into the runtime.
 */
HCP_API hcp_Size_t HCP_CALL hcp_getCodecCount(hcp_tState const*);
/**
 *	Returns the name of a codec at a specific index.
 *	@return Returns a null pointer of the index is out of bounds or
 *			no codec is laoded.
 */
HCP_API hcp_cszStr HCP_CALL hcp_getCodecName(hcp_tState const*,
                                             const hcp_Size_t index);

#ifdef __cplusplus
}
#endif
