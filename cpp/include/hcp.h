#ifndef HCP_H_
#define HCP_H_

#include <uv.h>
extern "C" {
#include "../../c/include/hcp_types.h"
#include "../../c/include/hcp_runtime.h"
}

/**
 *	Initializes a runtime object which holds a single HCP-state. If a 
 *	path is provided, the function also loads any codecs found in the specified
 *	path.
 *	@param codecPath	Path to codecs, may be null.
 *	@return	Returns a non-null handle of the HCP-runtime was successfully initialized.
 */
HCP_API hcp_tState* HCP_CALL hcp_init(hcp_cszStr codecPath);
/**
 *	Returns the number of loaded codecs.
 *	@return Returns the number of codecs loaded into the runtime.
 */
HCP_API hcp_Size_t HCP_CALL hcp_getCodecCount(void);
/**
 *	Returns the name of a codec at a specific index.
 *	@return Returns a null pointer of the index is out of bounds or
 *			no codec is laoded.
 */
HCP_API hcp_szStr HCP_CALL hcp_getCodecName(const hcp_Size_t index);

namespace hcp {

	typedef struct tCodec {
		char* path;
		hcp_szStr name;
		hcp_tCodecLibrary* lib;
		uv_lib_t binary;
	} tCodec;

	typedef struct {
		hcp_tVector header;
		hcp_tCodec fixed[HCP_MAXSIZE_CODECS];
	} tCodecSet;

	class Runtime {
	public:
		Runtime(hcp_tHost* osHost);
		/**
		*	Scans a directory for codecs, loading them into a destination array.
		*	@param state	HCP State where the library should be loaded into.
		*	@param codecPath	Relative or absolut path to a path where codecs are located.
		*						A codec is any file with the extension DLL, SO or DYNLIB which
		*						also exposes a 'hcp_GetLibrary' function.
		*	@param error	When the function returns false, this contains a human readable error message.
		*	@return	Returns true if the path was scanned without any errors.
		*/
		bool scanDir(const char* codecPath, const char** error);
		/**
		 *	Returns the HCP state which is associated with the runtime object.
		 */
		hcp_tState* getState(void) const;
		/**
		 *	Returns the number of loaded codecs.
		 */
		hcp_Size_t codecCount(void) const;
		/**
		 *	Returns a codec at a specific index.
		 *	@return Returns a null pointer if the index is out of bounds or no 
		 *			codecs is loaded.
		 */
		const tCodec* getCodec(const hcp_Size_t index) const;

	private: 
		/**
		 *	Checks if a path ends with a specific extension.
		 *	@param path	Path to search.
		 *	@param extension	Extension to match (case insensitive).
		 *	@return Returns true if the [path] variable ends with the string specified in [extension].
		 */
		static bool hasExtension(const char* path, const char* extension);
		/**
		 *	Attempts to load a library.
		 *	@param state	HCP State where the library should be loaded into.
		 *	@param path	Absolute or relative path where the codec binary is located.
		 *	@param destination	Destination codec object where the loaded library is stored.
		 *	@param error	When the function returns false, this contains a human readable error message.
		 *	@return	Returns true if the library was successfully loaded. If false, [error] will contain
		 *			a human readable error message.
		 */
		bool loadLibrary(char* path, struct tCodec* destination, const char** error);

		/** Internal HCP-state */
		hcp_tState* _state;
		tCodecSet _codecs;
	};
}

HCP_API hcp::Runtime* HCP_CALL hcp_init_runtime(hcp_cszStr codecPath);
#endif
