#include "com_husqvarnagroup_connectivity_HcpJNI.h"

#include <jni.h>
#include <stdlib.h>
#include <string.h>
extern "C" {
#include <hcp_types.h>
#include <hcp_error.h>
#include <hcp_codec.h>
#include <hcp_state.h>
}
#include "hcp.h"
#include <memory>
#include <string>

/************     START STOLEN FROM: http://stackoverflow.com/questions/230689/best-way-to-throw-exceptions-in-jni-code *****/
static jint throwNoSuchMethodError( JNIEnv *env, char const *className, char const *methodName, char const *signature );
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

jint throwNoSuchMethodError( JNIEnv* env, char const* className, char const* methodName, char const* signature )
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

auto toUtfStr(JNIEnv * env, jstring const& str) {
    auto model = env->GetStringUTFChars(str, 0);
    auto clean = [env,&str] (auto* p) { env->ReleaseStringUTFChars( str, p); };
    return std::unique_ptr<char const,decltype(clean)>{model,std::move(clean)};
}
auto toJString(JNIEnv* env,hcp_tString const& str)
{
	jstring value = NULL;
	if(str.zeroTerm == HCP_FALSE) {
    std::string tmp(str.value,str.value+str.length);
		value = env->NewStringUTF(tmp.c_str());
	} else {
		value = env->NewStringUTF(str.value);
  }
  return value;
    //auto clean = [env] (auto p) { env->DeleteLocalRef(p); };
    //return std::unique_ptr<jstring,decltype(clean)>{value,std::move(clean)};
}
auto toBytes(JNIEnv * env, jbyteArray const& bytes) {
    auto array = reinterpret_cast<hcp_Uint8*>(env->GetByteArrayElements(bytes, 0));
    auto clean = [env,&bytes] (auto* p) { env->ReleaseByteArrayElements( bytes, (jbyte*)p, 0); };
    return std::unique_ptr<hcp_Uint8,decltype(clean)>{array,std::move(clean)};
}

auto toState(jlong p) {
 auto runtime = reinterpret_cast<hcp::Runtime*>(p);
 return runtime->getState();
}
static jobject HcpJNI_NewObject(JNIEnv * env, const hcp_tParameter* pParameter) {
	jobject value = NULL;
	hcp_tParameter* parameter = (hcp_tParameter*)pParameter;

	switch(parameter->template_->type) {
			case HCP_FLOAT_ID: {

				jclass cls = env->FindClass( "java/lang/Float");
				jmethodID id = env->GetMethodID( cls, "<init>", "(F)V");
				value = env->NewObject(cls, id, (jfloat)parameter->value.f);

			} break;
			case HCP_BOOLEAN_ID: {

				jclass cls = env->FindClass( "java/lang/Boolean");
				jmethodID id = env->GetMethodID( cls, "<init>", "(Z)V");
				value = env->NewObject(cls, id, (jboolean)parameter->value.b);

			} break;
			case HCP_SIZET_ID: {

				jclass cls = env->FindClass( "java/lang/Long");
				jmethodID id = env->GetMethodID( cls, "<init>", "(J)V");
				value = env->NewObject(cls, id, (jlong)parameter->value.sz);

			} break;
			case HCP_UINT8_ID: {

				jclass cls = env->FindClass( "java/lang/Integer");
				jmethodID id = env->GetMethodID( cls, "<init>", "(I)V");
				value = env->NewObject(cls, id, (jint)parameter->value.u8);

			} break;
			case HCP_INT8_ID: {

				jclass cls = env->FindClass( "java/lang/Byte");
				jmethodID id = env->GetMethodID( cls, "<init>", "(B)V");
				value = env->NewObject(cls, id, (jbyte)parameter->value.s8);

			} break;
			case HCP_UINT16_ID: {

				jclass cls = env->FindClass( "java/lang/Integer");
				jmethodID id = env->GetMethodID( cls, "<init>", "(I)V");
				value = env->NewObject(cls, id, (jint)parameter->value.u16);

			} break;
			case HCP_INT16_ID: {

				jclass cls = env->FindClass( "java/lang/Short");
				jmethodID id = env->GetMethodID( cls, "<init>", "(S)V");
				value = env->NewObject(cls, id, (jshort)parameter->value.i16);

			} break;
			case HCP_UINT32_ID: {

				jclass cls = env->FindClass( "java/lang/Long");
				jmethodID id = env->GetMethodID( cls, "<init>", "(J)V");
				value = env->NewObject(cls, id, (jlong)parameter->value.u32);

			} break;
			case HCP_INT32_ID: {

				jclass cls = env->FindClass( "java/lang/Integer");
				jmethodID id = env->GetMethodID( cls, "<init>", "(I)V");
				value = env->NewObject(cls, id, (jint)parameter->value.i32);

			} break;
			case HCP_UINT64_ID: {

				jclass cls = env->FindClass( "java/lang/Long");
				jmethodID id = env->GetMethodID( cls, "<init>", "(J)V");
				value = env->NewObject(cls, id, (jlong)parameter->value.u64);

			} break;
			case HCP_INT64_ID: {

				jclass cls = env->FindClass( "java/lang/Long");
				jmethodID id = env->GetMethodID( cls, "<init>", "(J)V");
				value = env->NewObject(cls, id, (jlong)parameter->value.i64);

			} break;
			case HCP_STRING_ID: {
				value = toJString(env, parameter->value.str);
			} break;
			case HCP_DOUBLE_ID: {

				jclass cls = env->FindClass( "java/lang/Double");
				jmethodID id = env->GetMethodID( cls, "<init>", "(D)V");
				value = env->NewObject(cls, id, (jdouble)parameter->value.d);

			} break;
			case HCP_BLOB_ID: {
				hcp_tBlob* blob = &parameter->value.blb;

				//value = env->NewBooleanArray( blob->length);
				value = env->NewByteArray( blob->length);

				if(value != NULL) {
					env->SetByteArrayRegion( (jbyteArray)value, 0, blob->length, reinterpret_cast<jbyte*>(blob->value));
				}
			} break;
			case HCP_UNIXTIME_ID: {

				jclass cls = env->FindClass( "java/lang/Long");
				jmethodID id = env->GetMethodID( cls, "<init>", "(J)V");
				value = env->NewObject(cls, id, (jlong)parameter->value.time);

			} break;
			case HCP_SIMPLEVERSION_ID: {

				jclass cls = env->FindClass( "java/lang/Integer");
				jmethodID id = env->GetMethodID( cls, "<init>", "(I)V");
				value = env->NewObject(cls, id, (jint)parameter->value.version);

			} break;
			default : {
				value = NULL;
			} break;
		}

	return value;
}

JNIEXPORT jlong JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_NewState
  (JNIEnv * env, jobject Object, jstring Path){

    auto path = toUtfStr(env,Path);
    auto runtime = hcp_init_runtime(path.get());

    return (jlong)runtime;
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseState
  (JNIEnv * Env, jobject Object, jlong StateHandle){

	if(StateHandle != 0) {
		hcp_CloseState(toState(StateHandle));
		free((void*)StateHandle);
	}
}
JNIEXPORT jobjectArray JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_GetCodecNames
  (JNIEnv * Env, jobject)
{
  auto siz = hcp_getCodecCount();

      jobjectArray strarr = Env->NewObjectArray(siz, Env->FindClass("java/lang/String"), nullptr);

    for (int i = 0; i < siz; ++i)
    {
      auto name = hcp_getCodecName(i);
        Env->SetObjectArrayElement(strarr, i, Env->NewStringUTF(name));
    }

    return strarr;
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
  auto state = toState(StateHandle);
  auto codec = toUtfStr(Env,Codec); // Env->GetStringUTFChars(Codec, 0);
  auto model_id = static_cast<long>(ModelId);
  hcp_Size_t pId;
  auto res = hcp_NewCodec(state, codec.get(), model_id,&pId);
  if(res != HCP_NOERROR) 
    throwHcpException(Env,res);

  return pId;
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseCodec
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId)
{
    auto state = toState(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto res = hcp_CloseCodec(state, codec_id);
    if (res != HCP_NOERROR) 
      throwHcpException(env, res);
}

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_LoadModel
  (JNIEnv * env, jobject , jlong StateHandle, jstring Model)
{
    auto state = toState(StateHandle);
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
    auto state = toState(StateHandle);
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
JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Encode
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId, jstring Command, jbyteArray ret)
{
    auto state = toState(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto command = toUtfStr(env,Command);

    auto dest = toBytes(env,ret);
    auto destLen = env->GetArrayLength(ret);
    auto res = hcp_Encode(state, codec_id, command.get(), dest.get(), destLen);
    if (res < 0) throwHcpException(env, res);
    return res;
}
void copyToHcpElement(JNIEnv * Env, hcp_tResult const& result, jobject& Destination)
{
			static const char* destClass = "com/husqvarnagroup/connectivity/HcpElement";

			static const char* setFamilyName = "setFamily";
			static const char* setFamilySig = "(Ljava/lang/String;)V";

			static const char* setCommandName = "setCommand";
			static const char* setCommandSig = "(Ljava/lang/String;)V";

			static const char* putName = "put";
			static const char* putSig = "(Ljava/lang/String;Ljava/lang/Object;)V";

			jclass java_class = Env->FindClass(destClass);

			if(java_class != NULL) {
				jmethodID setFamily = Env->GetMethodID(java_class, setFamilyName, setFamilySig);

				if(setFamily != NULL) {
					jmethodID setCommand = Env->GetMethodID(java_class, setCommandName, setCommandSig);

					if(setCommand != NULL) {
						jmethodID put = Env->GetMethodID(java_class, putName, putSig);

						if(put != NULL) {
							auto family = toJString(Env,result.family);
							auto command = toJString(Env,result.command);
							{
								Env->CallObjectMethod(Destination, setFamily, family);
								Env->CallObjectMethod(Destination, setCommand, command);
							}

							for(hcp_Size_t i = 0;i < result.parameterCount; i++) {
								static const hcp_Size_t offset = sizeof(hcp_tParameter);
								hcp_tParameter* parameter = (hcp_tParameter*)((hcp_Size_t)result.parameters + i*offset);

								jobject value = HcpJNI_NewObject(Env, parameter);
								auto key = toJString(Env,parameter->template_->name);
								{
									Env->CallObjectMethod(Destination, put, key, value);
								}
								Env->DeleteLocalRef(value);
							}
						} else {
							throwNoSuchMethodError(Env,destClass, putName, putSig);
						}

					} else {
						throwNoSuchMethodError(Env,destClass,setCommandName, setCommandSig);
					}
				} else {
					throwNoSuchMethodError(Env,destClass,setFamilyName, setFamilySig);
				}
			} else {
				throwNoClassDefError(Env,destClass);
			}
}
JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Decode
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId, jbyteArray data, jint len, jobject ret)
{
    auto state = toState(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto data_len = static_cast<hcp_Size_t>(len);

    auto dest = toBytes(env,data);
    hcp_tResult result;
    auto res = hcp_Decode(state, codec_id, dest.get(), data_len, &result);
    copyToHcpElement(env,result,ret);
    return res;
}
