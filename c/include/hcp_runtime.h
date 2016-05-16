/*
*------------------------------------------------------------------------------
* (c) Husqvarna AB
*------------------------------------------------------------------------------
*/
/**
* @file
* <Brief description of this file>.
*------------------------------------------------------------------------------
* \par DESCRIPTION:
*      <Detailed description of this file.>\n
*      <Backslash n forces a new line.>
*
* \par IDENTIFICATION:
*           $Module: runtime $
*           $Target: any $
*      $Environment: Visual Studio 2015 $
*          $Project: HCP
*         $Revision: 1$
*             $Date: 2016-03-4 14:20:45$
*           $Author: Olof Andreassen$
*
*/


/*
*==============================================================================
*  1.3     Re-definition guard
*==============================================================================
*/
/* Traverse this file only once */
#ifndef _HCP_RUNTIME_H_
#define _HCP_RUNTIME_H_

/*
*==============================================================================
*  2.      INCLUDE FILES
*==============================================================================
*/

#include "hcp_types.h"
#include "hcp_error.h"
#include "hcp_codec.h"
#include "hcp_model.h"
/*
*==============================================================================
*  3.      DECLARATIONS
*  3.1     Global constants
*==============================================================================
*/

#define HCP_TIMEOUT_MODIFYSTATE 1000	/* number of milliseconds that a state-modifying function should\n
										 * wait before returning HCP_LOCKTIMEOUT */
#define HCP_TIMEOUT_MODIFYCODEC 1000	/* number of milliseconds that a serlizer-modifying function should\n
											 * wait before returning HCP_LOCKTIMEOUT */
/*
*==============================================================================
*  3.2     Global macros
*==============================================================================
*/


/*
*==============================================================================
*  3.3     Global type definitions
*==============================================================================
*/


/**	Allocates a block of memory.
*-----------------------------------------------------------------------------
* \par	Description:
*		Allocates a block of size bytes of memory, returning a pointer to the beginning of the block.
*		The content of the newly allocated block of memory is not initialized, remaining with indeterminate values.
*
* \param	Size	[IN] Size of the memory block, in bytes.
* \param	Context [IN]	Host callback context.
*
* \return	On success, a pointer to the memory block allocated by the function. The type of this pointer is\n
*			always void*, which can be cast to the desired type of data pointer in order to be dereferenceable.\n
*			If the function failed to allocate the requested block of memory, a null pointer is returned.
*/
typedef void*(*hcp_tMalloc)(const hcp_Size_t Size, void* Context);
/**
* A block of memory previously allocated by a call to malloc, calloc or realloc is deallocated, making it available again for further allocations.
* @param _pPtr If ptr does not point to a block of memory allocated with the above functions, it causes undefined behavior.
* @param _pHostCtx	Host callback context.
*/
typedef void(*hcp_tFree)(void* _pPtr, void* _pHostCtx);
/**
* Changes the size of the memory block pointed to by [_pDst]. The function may move the memory block to a new location
* (whose address is returned by the function). The content of the memory block is preserved up to the lesser of the new
* and old sizes, even if the block is moved to a new location. If the new size is larger, the value of the newly allocated portion is indeterminate.
* In case that [_pDst] is a null pointer, the function behaves like malloc, assigning a new block of size bytes and returning a pointer to its beginning.
* @param _pDst	Pointer to a memory block previously allocated with malloc, calloc or realloc. Alternatively, this can be a null pointer,
*				in which case a new block is allocated (as if malloc was called).
* @param _nSize New size for the memory block, in bytes.
* @param _pHostCtx	Host callback context.
* @return	A pointer to the reallocated memory block, which may be either the same as ptr or a new location.
*			The type of this pointer is void*, which can be cast to the desired type of data pointer in order to be dereferenceable.
*/
typedef void*(*hcp_tRealloc)(void* _pDst, const hcp_Size_t _nSize, void* _pHostCtx);
/**
* Copies the values of num bytes from the location pointed to by source directly to the memory block pointed to by destination.
* The underlying type of the objects pointed to by both the source and destination pointers are irrelevant for this function; The result
* is a binary copy of the data. The function does not check for any terminating null character in source - it always copies exactly [nSize] bytes.
* To avoid overflows, the size of the arrays pointed to by both the destination and source parameters, shall be at least [_nSize] bytes, and
* should not overlap (for overlapping memory blocks, memmove is a safer approach).
* @param _pDst	Pointer to the destination array where the content is to be copied, type-casted to a pointer of type void*.
* @param _pSrc	Pointer to the source of data to be copied, type-casted to a pointer of type const void*.
* @param _nSize	Number of bytes to copy.
* @param _pHostCtx	Host callback context.
* @return On success, [_pDst] is returned.
*/
typedef void*(*hcp_tMemcpy)(void* _pDst, const void* _pSrc, const hcp_Size_t _nSize, void* _pHostCtx);
/**
* Sets the first [_nLen] bytes of the block of memory pointed by [_pDst] to the specified [_nValue] (interpreted as an unsigned char).
* @param _pDst	Pointer to the block of memory to fill.
* @param _nValue	Value to be set. The value is passed as an int, but the function fills the block of memory using the
*					unsigned char conversion of this value.
* @param _nLen	Number of bytes to be set to the [_nValue].
* @param _pHostCtx	Host callback context.
* @return On success, returns [_pDst].
*/
typedef void*(*hcp_tMemset)(void * _pDst, const hcp_Int _nValue, const hcp_Size_t _nLen, void* _pHostCtx);
/**
*	Attempts to lock (acquire exclusive access) to a pointer.
*	@param _pPtr	Pointer to acquire exclusive access to
*	@param _nTimeout	Number of miliseconds that one can wait until acquiring the lock.
*	@param _pHostCtx	Host context associated with the lock function.
*	@return	Returns HCP_TRUE if the lock was acquired within [_nTimeout] ms.
*/
typedef hcp_Boolean(*hcp_tTryLock)(const void* _pPtr, const hcp_Size_t _nTimeout, void* _pHostCtx);
/**
*	Releases a lock on a pointer value.
*	@param _pPtr	Pointer to release any locks on.
*	@param _pHostCtx	Host context associated with the unlock function.
*/
typedef void(*hcp_tUnlock)(const void* _pPtr, void* _pHostCtx);

	typedef void(*hcp_SetFlag)(int Flag, int Value, void* pContext);

	/**	Codec for converting commands into byte-representation.
	 * \par	Description:
	 *		Structure which holds data for serializing and de-\n
	 *		serializing commands into byte-representation.
	 */
	typedef struct {
		hcp_Uint32 id;				/* unique id of the codec (internally) */
		hcp_tState* parent;			/* state which creates the codec */
		hcp_tBuffer context;		/* codec library specific context buffer */
		hcp_tCommandSet commands;	/* loaded command set*/
		hcp_tModel* template_;	/* reference to the TIF-template which the codec uses */
		hcp_Int deviceError;		/* resolved from the library which allows libraries to output
									 * device-specific errors which might have occured while executing
									 * commands */
		hcp_tCodecLibrary* library;		/* gets the codec library associated with the codec, in
									 * other words, the library used for serialization/deserialization*/
		void* parseCache;			/* temporary buffer for holding data that needs to throug out the \n
										* life-time of the serlizer for parsing */
	} hcp_tCodec;

#pragma pack(push, 8)
	typedef struct {
		hcp_tString command;
		hcp_tString family;
		hcp_Int error;
		hcp_Int deviceError;
		hcp_szStr message;
		hcp_tParameter* parameters;
		hcp_Size_t parameterCount;
		hcp_Uint8 padding;
	} hcp_tResult;
#pragma pack(pop)

/**	Host memory mapping structure
 *-----------------------------------------------------------------------------
 * \par	Description: Implement a host structure to enable dynamic memory in HCP. By\n
 *					 default HCP uses static memory, one need to provide functions like\n
 *					 [malloc] for dynamic memory allocation. Thread-safetey may also be\n
 *					 achived by implementing [lock] and [unlock] functions.
 */
typedef struct {
	hcp_tTryLock lock;
	hcp_tUnlock unlock;
	hcp_tMemset memset_;
	hcp_tMemcpy memcpy_;
	hcp_tRealloc realloc_;
	hcp_tFree free_;
	hcp_tMalloc malloc_;
	void* context;	//	Host specific callback context
} hcp_tHost;

/*
*==============================================================================
*  3.4     Global variables (defined in some implementation file)
*==============================================================================
*/


/*
*==============================================================================
*  3.5     Global constant data
*==============================================================================
*/


/*
*==============================================================================
*  4.      GLOBAL FUNCTIONS
*==============================================================================
*/

	HCP_API hcp_Boolean HCP_CALL hcp_TryLock(hcp_tState* pState, const void* pHandle, const hcp_Int Duration);
	HCP_API void HCP_CALL hcp_Unlock(hcp_tState* pState, const void* pHandle);
	
	HCP_API hcp_Int HCP_CALL hcp_NewCodec(hcp_tState* pState, const hcp_szStr Codec, const hcp_Size_t TemplateId, hcp_Size_t* pId);
	HCP_API hcp_Int HCP_CALL hcp_CloseCodec(hcp_tState* pState, const hcp_Size_t CodecId);
	
	HCP_API void HCP_CALL hcp_GetMessage(const hcp_Int ErrorCode,hcp_szStr pOutput, const hcp_Size_t MaxLength);

	HCP_API hcp_Int HCP_CALL hcp_LoadModel(hcp_tState* pState, const hcp_szStr Model, const hcp_Size_t Length, hcp_Int* pId);
	
	HCP_API hcp_Int HCP_CALL hcp_GetPrimitiveType(hcp_tState* pState, const hcp_Int CommandSetId, const hcp_szStr ComplexType);
	
	HCP_API hcp_Int HCP_CALL hcp_LoadCodec(hcp_tState* pState, hcp_tCodecLibrary* pLibrary, hcp_szStr CodecName, const hcp_Size_t MaxLength);

	extern hcp_Size_t HCP_CALL hcp_SizeOfState(void);
	extern hcp_Int HCP_CALL hcp_NewState(hcp_tState* pDest, hcp_tHost* pOst);
	extern hcp_Int HCP_CALL hcp_CloseState(hcp_tState* pState);

	HCP_API hcp_Int HCP_CALL hcp_Encode(hcp_tState* pState, hcp_Size_t CodecId, const hcp_szStr Command, hcp_Uint8* pDestination, const hcp_Uint32 MaxLength, hcp_SetFlag SetFlag, void* pCallbackContext);
	HCP_API hcp_Int HCP_CALL hcp_Decode(hcp_tState* pState, hcp_Size_t CodecId, const hcp_Uint8* pSource, const hcp_Size_t Length, hcp_tResult* pResult);

#endif /* Match the re-definition guard */

/*
*==============================================================================
* END OF FILE
*==============================================================================
*/