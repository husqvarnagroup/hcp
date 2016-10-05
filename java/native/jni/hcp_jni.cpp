#include "com_husqvarnagroup_connectivity_HcpJNI.h"

#include <jni.h>
extern "C" {
#include <hcp_types.h>
#include <hcp_error.h>
#include <hcp_codec.h>
#include <hcp_state.h>
}
#include "hcp.h"
#include <memory>
#include <string>
#include <assert.h>

class JavaException {
  public:
    JavaException(std::string className, std::string message)
      : className(std::move(className))
      , message(std::move(message))
  {}
  void propagateToJava(JNIEnv& env) const
  {
      jclass exClass = env.FindClass(className.c_str());
      assert(exClass != nullptr);
      auto ok = env.ThrowNew(exClass, message.c_str());
      assert(ok);
  }

private:
  std::string className;
  std::string message;
};
JavaException noClassDefError(std::string message) { 
  return {"java/lang/NoClassDefFoundError",std::move(message)}; 
}
JavaException illegalArgumentException(std::string message) { 
  return { "java/lang/IllegalArgumentException",std::move(message)}; 
}
JavaException noSuchMethodError( char const* className, char const* methodName, char const* signature ) { 
    auto message = std::string( className );
    message += ".";
    message += methodName;
    message += ".";
    message += signature;
  return { "java/lang/NoSuchMethodError",std::move(message)}; 
}
JavaException hcpException(int error) { 
  constexpr hcp_Size_t BufferSize = 512;
  char buffer[BufferSize];

  hcp_GetMessage(error, buffer, BufferSize);
  return { "com/husqvarnagroup/connectivity/HcpException",buffer}; 
}

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

JNIEXPORT jlong JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_NewState(
    JNIEnv* env, jobject Object, jstring Path)
{
    try {
        auto path = toUtfStr(env, Path);
        auto runtime = hcp_init_runtime(path.get());

        return (jlong)runtime;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*env);
        return 0;
    }
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseState
  (JNIEnv * Env, jobject Object, jlong StateHandle){
    try {

	if(StateHandle != 0) {
		hcp_CloseState(toState(StateHandle));
		free((void*)StateHandle);
	}
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*Env);
    }
}
JNIEXPORT jobjectArray JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_GetCodecNames
  (JNIEnv * Env, jobject)
{
    try {
  auto siz = hcp_getCodecCount();

      jobjectArray strarr = Env->NewObjectArray(siz, Env->FindClass("java/lang/String"), nullptr);

    for (int i = 0; i < siz; ++i)
    {
      auto name = hcp_getCodecName(i);
        Env->SetObjectArrayElement(strarr, i, Env->NewStringUTF(name));
    }

    return strarr;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*Env);
        return nullptr;
    }
}

JNIEXPORT jstring JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_GetMessage
  (JNIEnv * Env, jobject Obj, jint ErrorCode) {
    try {
	constexpr hcp_Size_t BufferSize = 512;

  char buffer[BufferSize];

	hcp_GetMessage(ErrorCode, buffer, BufferSize);

	jstring result = Env->NewStringUTF(buffer);

	return result;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*Env);
        return nullptr;
    }
}

JNIEXPORT jlong JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_NewCodec
  (JNIEnv * Env, jobject, jlong StateHandle, jstring Codec, jlong ModelId)
{
    try {
  auto state = toState(StateHandle);
  auto codec = toUtfStr(Env,Codec); // Env->GetStringUTFChars(Codec, 0);
  auto model_id = static_cast<long>(ModelId);
  hcp_Size_t pId;
  auto res = hcp_NewCodec(state, codec.get(), model_id,&pId);
  if(res != HCP_NOERROR) 
    throw hcpException(res);

  return pId;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*Env);
        return 0;
    }
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseCodec
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId)
{
    try {
    auto state = toState(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto res = hcp_CloseCodec(state, codec_id);
    if (res != HCP_NOERROR) 
      throw hcpException( res);
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*env);
    }
}

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_LoadModel
  (JNIEnv * env, jobject , jlong StateHandle, jstring Model)
{
    try {
    auto state = toState(StateHandle);
    auto model = toUtfStr(env,Model);
    //auto model = env->GetStringUTFChars(Model, 0);
    auto length = env->GetStringUTFLength(Model);
    hcp_Int pId;
    auto res = hcp_LoadModel(state, model.get(), length, &pId);
    if (res != HCP_NOERROR) throw hcpException( res);
    return pId;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*env);
        return 0;
    }
}
JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Encode
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId, jstring Command, jbyteArray ret)
{
    try {
    auto state = toState(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto command = toUtfStr(env,Command);

    auto dest = toBytes(env,ret);
    auto destLen = env->GetArrayLength(ret);
    auto res = hcp_Encode(state, codec_id, command.get(), dest.get(), destLen);
    if (res < 0) throw hcpException( res);
    return res;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*env);
        return 0;
    }
}
void copyToHcpElement(JNIEnv * Env, hcp_tResult const& result, jobject& Destination)
{
    try {
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
							throw noSuchMethodError(destClass, putName, putSig);
						}

					} else {
						throw noSuchMethodError(destClass,setCommandName, setCommandSig);
					}
				} else {
					throw noSuchMethodError(destClass,setFamilyName, setFamilySig);
				}
			} else {
				throw noClassDefError(destClass);
			}
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*Env);
    }
}
JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Decode
  (JNIEnv * env, jobject, jlong StateHandle, jlong CodecId, jbyteArray data, jint len, jobject ret)
{
    try {
    auto state = toState(StateHandle);
    auto codec_id = static_cast<hcp_Size_t>(CodecId);
    auto data_len = static_cast<hcp_Size_t>(len);

    auto dest = toBytes(env,data);
    hcp_tResult result;
    auto res = hcp_Decode(state, codec_id, dest.get(), data_len, &result);
    copyToHcpElement(env,result,ret);
    return res;
    }
    catch (JavaException const& ex) {
        ex.propagateToJava(*env);
        return 0;
    }
}
