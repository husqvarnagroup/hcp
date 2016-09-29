#include "com_husqvarnagroup_connectivity_HcpJNI.h"

#include <jni.h>
#include <stdlib.h>
#include <string.h>
#include <hcp_types.h>
#include <hcp_error.h>
#include <hcp_codec.h>
#include <hcp_state.h>
#include <memory>

/************     START STOLEN FROM: http://stackoverflow.com/questions/230689/best-way-to-throw-exceptions-in-jni-code *****/
static jint throwNoSuchMethodError( JNIEnv *env, char *className, char *methodName, char *signature );
static jint throwNoClassDefError( JNIEnv *env,const char * pMessage );

jint throwNoClassDefError( JNIEnv* env,const char* pMessage )
{
    const char * className = "java/lang/NoClassDefFoundError";

    jclass exClass = env->FindClass(className);

    if (exClass == NULL) {
        //return throwNoClassDefError( env, className );
    }

    return env->ThrowNew( exClass, pMessage );
}
jint throwIllegalArgumentException( JNIEnv* env,const char* pMessage )
{
    const char * className = "java/lang/IllegalArgumentException";

    jclass exClass = env->FindClass( className);

    return env->ThrowNew( exClass, pMessage );
}

jint throwNoSuchMethodError( JNIEnv* env, char* className, char* methodName, char* signature )
{

    char const *exClassName = "java/lang/NoSuchMethodError" ;
    char* msgBuf;
    jint retCode;
    size_t nMallocSize;

    jclass exClass = env->FindClass( exClassName );

    nMallocSize = strlen(className)
            + strlen(methodName)
            + strlen(signature) + 8;

    msgBuf = (char*)malloc( nMallocSize );
    memset( msgBuf, 0, nMallocSize );

    strcpy( msgBuf, className );
    strcat( msgBuf, "." );
    strcat( msgBuf, methodName );
    strcat( msgBuf, "." );
    strcat( msgBuf, signature );

    retCode = env->ThrowNew( exClass, msgBuf );
    free ( msgBuf );
    return retCode;
}

jint throwHcpException( JNIEnv* env, int error)
{
  const char * className = "com/husqvarnagroup/connectivity/HcpException";
  jclass exClass = env->FindClass( className);

  constexpr hcp_Size_t BufferSize = 512;
  char buffer[BufferSize];

  hcp_GetMessage(error, buffer, BufferSize);

  return env->ThrowNew( exClass, buffer);
}

/************     END STOLEN FROM: http://stackoverflow.com/questions/230689/best-way-to-throw-exceptions-in-jni-code *****/

JNIEXPORT jlong JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_NewState
  (JNIEnv * Env, jobject Object){

	hcp_tState* pState = new hcp_tState();

	if(pState == NULL) {
		return 0;
	}

	hcp_Int error = HCP_NOERROR;

	error = hcp_NewState(pState, HCP_NULL);

	if(error != HCP_NOERROR) {
		return (jlong)error;
	}

	return (jlong)pState;
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseState
  (JNIEnv * Env, jobject Object, jlong StateHandle){

	if(StateHandle != 0) {
		hcp_CloseState((hcp_tState*)StateHandle);
		free((void*)StateHandle);
	}
}

JNIEXPORT jstring JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_GetMessage
  (JNIEnv * Env, jobject Obj, jint ErrorCode) {
	constexpr hcp_Size_t BufferSize = 512;

  char buffer[BufferSize];

	hcp_GetMessage(ErrorCode, buffer, BufferSize);

	jstring result = Env->NewStringUTF(buffer);

	return result;
}

JNIEXPORT jlong JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_NewCodec
  (JNIEnv * Env, jobject, jlong StateHandle, jstring Codec, jlong ModelId)
{
  auto state = reinterpret_cast<hcp_tState*>(StateHandle);
  auto codec = Env->GetStringUTFChars(Codec, 0);
  auto model_id = static_cast<long>(ModelId);
  hcp_Size_t pId;
  auto res = hcp_NewCodec(state, codec, model_id,&pId);
  if(res != HCP_NOERROR) 
    throwHcpException(Env,res);

  return pId;
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseCodec
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId)
{
    auto state = reinterpret_cast<hcp_tState*>(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto res = hcp_CloseCodec(state, codec_id);
    if (res != HCP_NOERROR) 
      throwHcpException(env, res);
}
auto toUtfStr(JNIEnv * env, jstring const& str) {
    auto model = env->GetStringUTFChars(str, 0);
    auto clean = [env,&str] (auto* p) { env->ReleaseStringUTFChars( str, p); };
    return std::unique_ptr<char const,decltype(clean)>{model,std::move(clean)};
}
auto toBytes(JNIEnv * env, jbyteArray const& bytes) {
    auto array = reinterpret_cast<hcp_Uint8*>(env->GetByteArrayElements(bytes, 0));
    auto clean = [env,&bytes] (auto* p) { env->ReleaseByteArrayElements( bytes, (jbyte*)p, 0); };
    return std::unique_ptr<hcp_Uint8,decltype(clean)>{array,std::move(clean)};
}

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_LoadModel
  (JNIEnv * env, jobject , jlong StateHandle, jstring Model)
{
    auto state = reinterpret_cast<hcp_tState*>(StateHandle);
    auto model = toUtfStr(env,Model);
    //auto model = env->GetStringUTFChars(Model, 0);
    auto length = env->GetStringUTFLength(Model);
    hcp_Int pId;
    auto res = hcp_LoadModel(state, model.get(), length, &pId);
    if (res != HCP_NOERROR) throwHcpException(env, res);
    return pId;
}
JNIEXPORT jbyteArray JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Encode
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId, jstring Command)
{
    auto state = reinterpret_cast<hcp_tState*>(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    //auto command = env->GetStringUTFChars(Command, 0);
    auto command = toUtfStr(env,Command);

    jbyteArray ret;
    auto dest = toBytes(env,ret);
    //auto dest = reinterpret_cast<hcp_Uint8*>(env->GetByteArrayElements(ret, 0));
    auto destLen = env->GetArrayLength(ret);
    auto res = hcp_Encode(state, codec_id, command.get(), dest.get(), destLen);
    if (res != HCP_NOERROR) throwHcpException(env, res);
    //env->ReleaseByteArrayElements( ret, (jbyte*)dest, 0);
    return ret;
}
