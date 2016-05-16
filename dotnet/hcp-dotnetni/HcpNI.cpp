#include "stdafx.h"
#include "HcpNI.h"
#include <stdio.h>
#include <stdlib.h>

static HcpNI* _singleton = NULL;

HcpNI::HcpNI()
{
	m_state = (hcp_tState*)malloc(hcp_SizeOfState());

	if (m_state != NULL) {
		hcp_tHost host;

		host.free_ = HcpNI::Free;
		host.lock = HcpNI::TryLock;
		host.malloc_ = HcpNI::Malloc;
		host.memcpy_ = HcpNI::Memcpy;
		host.free_ = HcpNI::Free;
		host.memset_ = HcpNI::Memset;
		host.realloc_ = HcpNI::Realloc;
		host.unlock = HcpNI::Unlock;
		host.context = this;

		if (hcp_NewState(m_state, &host) != HCP_NOERROR) {
			free(m_state);
			m_state = NULL;
		}
	}
}

HcpNI::~HcpNI()
{
	hcp_CloseState(m_state);
	free(m_state);
}

hcp_tState* HCP_CALL hcp_Load(void) {
	if (_singleton == NULL) {
		_singleton = new HcpNI();
	}

	return _singleton->GetState();
}

void HCP_CALL hcp_Unload(void) {
	if (_singleton != NULL) {
		delete _singleton;
	}
}

hcp_tState*  HcpNI::GetState(void) {
	return m_state;
}


void* HcpNI::Realloc(void* pDest, const hcp_Size_t Size, void* pContext) {
	return realloc(pDest, Size);
}

void* HcpNI::Malloc(const hcp_Size_t Size, void* pContext) {
	return malloc(Size);
}

hcp_Boolean HcpNI::TryLock(const void* pPtr, const hcp_Size_t Timeout, void* pContext) {
	auto result = HCP_TRUE;

	if (pContext != NULL) {
		auto hni = static_cast<HcpNI*>(pContext);
		result = hni->TryLock(pPtr, Timeout);
	}

	return result;
}

void HcpNI::Unlock(const void* pPtr, void* pContext) {
	if (pContext != NULL) {
		auto hni = static_cast<HcpNI*>(pContext);
		hni->Unlock(pPtr);
	}
}

void* HcpNI::Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length, void* pContext) {
	void* result = NULL;

	if (pContext != NULL) {
		auto hni = static_cast<HcpNI*>(pContext);
		result = hni->Memset(pDest, Value, Length);
	}

	return result;
}

void* HcpNI::Memcpy(void* pDest, const void* pSource, const hcp_Size_t Length, void* pContext) {
	void* result = NULL;

	if (pContext != NULL) {
		auto hni = static_cast<HcpNI*>(pContext);
		result = hni->Memcpy(pDest, pSource, Length);
	}

	return result;
}

void HcpNI::Free(void* pDest, void* pContext) {
	if (pContext != NULL) {
		auto hni = static_cast<HcpNI*>(pContext);
		hni->Free(pDest);
	}
}


void* HcpNI::Realloc(void* pDest, const hcp_Size_t Size) {
	return realloc(pDest, Size);
}

void* HcpNI::Malloc(const hcp_Size_t Size) {
	return malloc(Size);
}

hcp_Boolean HcpNI::TryLock(const void* pPtr, const hcp_Size_t Timeout) {
	return HCP_TRUE;
}

void HcpNI::Unlock(const void* pPtr) {

}

void* HcpNI::Memset(void* pDest, const hcp_Int Value, const hcp_Size_t Length) {
	return memset(pDest, Value, Length);
}

void* HcpNI::Memcpy(void* pDest, const void* pSource, const hcp_Size_t Length) {
	return memcpy(pDest, pSource, Length);
}

void HcpNI::Free(void* pDest) {
	free(pDest);
}