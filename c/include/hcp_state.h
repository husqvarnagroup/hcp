#include <hcp_runtime.h>

/** Vector with codecs */
HCP_VECTOR(hcp_tCodec, hcp_tCodecSet, HCP_MAXSIZE_CODECS);
/**	Vector with product libraries */
HCP_VECTOR(hcp_tCodecLibrary, hcp_tLibrarySet, HCP_MAXSIZE_LIBRARIES);

/**	Object which connects host OS mapping functions to connections.
*/
struct hcp_tState {
	hcp_tHost host;
	hcp_tCodecSet codecs;
	hcp_tModelSet templates;
	hcp_tLibrarySet libraries;
	hcp_Uint32 nextId;
	hcp_Boolean readLock;		/* HCP_TRUE if the state is locked in read only */
	hcp_Boolean writeLock;		/* HCP_TRUE if the state is currently being written to 
								 * which means that no other lock can (should) be aquired */
	hcp_tRuntime runtime;
};


