#pragma once

#include "hcp_runtime.h"

// include HCP-c files to build them

extern "C" __declspec(dllexport) hcp_tState* HCP_CALL hcp_Load(void);
extern "C" __declspec(dllexport) void HCP_CALL hcp_Unload(void);

class HcpNI
{
public:
	HcpNI();
	~HcpNI();
	
	/**	Returns the associated state.
	 *
	 */
	hcp_tState* GetState(void);

private:

	hcp_Boolean TryLock(const void* pPtr, const hcp_Size_t Timeout);
	void Unlock(const void* pPtr);
	void* Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length);
	void* Memcpy(void* pDest, const void* psource, const hcp_Size_t Length);
	void Free(void* pDest);
	void* Malloc(const hcp_Size_t Size);
	void* Realloc(void* pDest, const hcp_Size_t Size);

	static hcp_Boolean TryLock(const void* pPtr, const hcp_Size_t Timeout, void* pContext);
	static void Unlock(const void* pPtr, void* pContext);
	static void* Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length, void* pContext);
	static void* Memcpy(void* pDest, const void* psource, const hcp_Size_t Length, void* pContext);
	static void Free(void* pDest, void* pContext);
	static void* Malloc(const hcp_Size_t Size, void* pContext);
	static void* Realloc(void* pDest, const hcp_Size_t Size, void* pContext);

	hcp_tState* m_state;
};

