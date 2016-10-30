#ifndef _HCP_API_H_
#define _HCP_API_H_

#ifdef __APPLE__
#	define HCP_EXPORT
#elif __linux__
#	define HCP_EXPORT
#endif

#ifndef HCP_EXPORT
#	define HCP_EXPORT __declspec(dllexport)
#endif

#ifndef HCP_NOEXPORT
#	ifdef __cplusplus
#		define HCP_API extern "C" HCP_EXPORT
#	else
#		define HCP_API extern HCP_EXPORT
#	endif
#else
#	ifdef __cplusplus
#		define HCP_API extern "C"
#	else
#		define HCP_API extern
#	endif
#endif

#ifndef HCP_CALL
#	ifdef __gnu_linux__
#		define HCP_CALL 
#	else
#		define HCP_CALL __cdecl
#	endif
#endif

#endif /* Match the re-definition guard */
