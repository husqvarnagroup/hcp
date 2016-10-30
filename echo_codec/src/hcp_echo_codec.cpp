#include <hcp_echo_codec.h>
#include <new>
extern "C" {
#include <hcp_library.h>
}

#define ECHO_ENDIANESS HCP_LITTLEENDIAN

namespace echo {
  struct Session {
    hcp_tCommand* command = nullptr;
  };

  hcp_Int setup(hcp_tRuntime* R, hcp_tBuffer* pContext) {
    hcp_Int error = R->Resize(pContext, sizeof(Session));

    if (error == HCP_NOERROR) {
      new (pContext->value) Session{};
    }
    return error;
  }

  hcp_Int encode(hcp_tRuntime* R, hcp_tProtocol*, const hcp_tCommand* pCommand, hcp_tBlob* pDestination,
                 hcp_tBuffer* pContext) {
    Session* session = (Session*)pContext->value;

    auto error = R->AppendParameters(R, pDestination, &pCommand->inParams, ECHO_ENDIANESS, HCP_NULL, HCP_NULL);

    if (error == HCP_NOERROR) {
      session->command = const_cast<hcp_tCommand*>(pCommand);
    }

    return error;
  }

  hcp_Int decode(hcp_tRuntime* R, hcp_tProtocol* pProtocol, const hcp_tBlob* pSource, hcp_tCommandSet* pCommands,
                 hcp_tCommand** ppCommand, hcp_tBuffer* pContext) {
    Session* session = (Session*)pContext->value;

    auto handledBytes =
      R->BytesToParameters(R, pSource, 0, &session->command->outParams, ECHO_ENDIANESS, HCP_NULL, HCP_NULL);

    if (handledBytes >= 0) {
      *ppCommand = session->command;
    } else {
      *ppCommand = nullptr;
    }

    return handledBytes;
  }
}

hcp_tCodecLibrary* hcp_GetLibrary(void) {
  static hcp_tCodecLibrary library;

  library.requiredVersion = 1;
  library.name            = "Echo";
  library.decode          = echo::decode;
  library.encode          = echo::encode;
  library.lastError       = nullptr;
  library.messages        = nullptr;
  library.setup           = echo::setup;

  library.context.length = 0;
  return &library;
}

