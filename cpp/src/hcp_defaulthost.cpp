extern "C" {
#include "hcp_runtime.h"
}
#include "hcp_Scan.h"
#include <stdlib.h>
#include <string.h>


static void* _malloc(hcp_Size_t size, void* ctx) {
	return malloc(size);
}

static void _free(void* dest, void* ctx) {
	free(dest);
}

static void* _memcpy(void* dest, const void* source, hcp_Size_t size, void*  ctx) {
	return memcpy(dest, source, size);
}

static void* _memset(void* dest, hcp_Int value, hcp_Size_t len, void*  ctx) {
	return memset(dest, value, len);
}

void hcp_DefaultHost(struct hcp_tHost* pHost) {
		memset(pHost, 0, sizeof(hcp_tHost));

		pHost->free_ = _free;
		pHost->malloc_ = _malloc;
		pHost->memcpy_ = _memcpy;
		pHost->memset_ = _memset;
}

