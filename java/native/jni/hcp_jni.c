#include "com_husqvarnagroup_connectivity_HcpJNI.h"

#include <jni.h>
#include <stdlib.h>
#include <string.h>
#include <hcp_types.h>
#include <hcp_error.h>
#include <hcp_codec.h>
#include <hcp_state.h>

//#include "../../../c/src/cJSON.c"
//#include "../../../c/src/hcp_error.c"
//#include "../../../c/src/hcp_protocol.c"
//#include "../../../c/src/hcp_runtime.c"
//#include "../../../c/src/hcp_string.c"
//#include "../../../c/src/hcp_tif.c"
//#include "../../../c/src/hcp_vector.c"
//#include "../../../../amg3/src/amg3.c"

/************     START STOLEN FROM: http://stackoverflow.com/questions/230689/best-way-to-throw-exceptions-in-jni-code *****/
static jint throwNoSuchMethodError( JNIEnv *env, char *className, char *methodName, char *signature );
static jint throwNoClassDefError( JNIEnv *env,const char * pMessage );

jint throwNoClassDefError( JNIEnv* env,const char* pMessage )
{
    jclass exClass;
    const char * className = "java/lang/NoClassDefFoundError";

    exClass = (*env)->FindClass( env, className);
    if (exClass == NULL) {
        //return throwNoClassDefError( env, className );
    }

    return (*env)->ThrowNew( env, exClass, pMessage );
}

jint throwNoSuchMethodError( JNIEnv* env, char* className, char* methodName, char* signature )
{

    jclass exClass;
    char *exClassName = "java/lang/NoSuchMethodError" ;
    char* msgBuf;
    jint retCode;
    size_t nMallocSize;

    exClass = (*env)->FindClass( env, exClassName );

    nMallocSize = strlen(className)
            + strlen(methodName)
            + strlen(signature) + 8;

    msgBuf = malloc( nMallocSize );
    memset( msgBuf, 0, nMallocSize );

    strcpy( msgBuf, className );
    strcat( msgBuf, "." );
    strcat( msgBuf, methodName );
    strcat( msgBuf, "." );
    strcat( msgBuf, signature );

    retCode = (*env)->ThrowNew( env, exClass, msgBuf );
    free ( msgBuf );
    return retCode;
}

/************     END STOLEN FROM: http://stackoverflow.com/questions/230689/best-way-to-throw-exceptions-in-jni-code *****/

JNIEXPORT jlong JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_NewState
  (JNIEnv * Env, jobject Object){

	hcp_tState* pState = (hcp_tState*)malloc(sizeof(hcp_tState));

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
	static const hcp_Size_t BufferSize = 512;

	hcp_szStr buffer = (hcp_szStr)malloc(BufferSize);

	hcp_GetMessage(ErrorCode, buffer, BufferSize);

	jstring result = (*Env)->NewStringUTF(Env, buffer);
	free(buffer);

	return result;
}

/*
#include <stdio.h>

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_LoadTIF
  (JNIEnv * Env, jobject Object, jlong StateHandle, jstring TIFBody){

	hcp_tState* pState = (hcp_tState*)StateHandle;
	hcp_Int error = 0;
	hcp_Int tifId = 0;

	hcp_szStr commandSet = (hcp_szStr)(*Env)->GetStringUTFChars(Env, TIFBody, 0);
	{
		const hcp_Size_t length = (hcp_Size_t)(*Env)->GetStringUTFLength(Env, TIFBody);
		error = hcp_LoadCommandSet(pState, commandSet, length, &tifId);
	}
	(*Env)->ReleaseStringUTFChars(Env, TIFBody, commandSet);

	if(error == HCP_NOERROR) {
		return tifId;
	}

	return error;
}

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CreateSerializer
  (JNIEnv * Env, jobject Object, jlong StateHandle, jstring Protocol, jint TIFId) {

	hcp_tState* pState = (hcp_tState*)StateHandle;
	hcp_Uint32 serializerId = 0;
	hcp_Int error = 0;

	hcp_szStr protocolName = (hcp_szStr)(*Env)->GetStringUTFChars(Env, Protocol, 0);
	{
		error = hcp_NewSerializer(pState, protocolName, (hcp_Size_t)TIFId, &serializerId);
	}
	(*Env)->ReleaseStringUTFChars(Env, Protocol, protocolName);

	if(error == HCP_NOERROR) {
		return serializerId;
	}

	return error;
}

JNIEXPORT void JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_CloseSerializer
  (JNIEnv * Env, jobject Object, jlong StateHandle, jint SerializerId) {

	hcp_tState* pState = (hcp_tState*)StateHandle;
	hcp_Uint32 serializerId = (hcp_Uint32)SerializerId;

	hcp_CloseSerializer(pState, serializerId);
}

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Serialize
  (JNIEnv * Env, jobject Object, jlong StateHandle, jint Serializer, jstring TIFCommand, jbyteArray Destination){

	hcp_tState* pState = (hcp_tState*)StateHandle;
	hcp_Uint32 serializerId = (hcp_Uint32)Serializer;
	hcp_Int error = 0;

	hcp_szStr command = (hcp_szStr)(*Env)->GetStringUTFChars(Env, TIFCommand, 0);
	{
		hcp_Uint8* dest = (hcp_Uint8*)(*Env)->GetByteArrayElements(Env, Destination, 0);
		{
			const hcp_Uint32 destLength = (hcp_Uint32)(*Env)->GetArrayLength(Env, Destination);

			error = hcp_Serialize(pState, serializerId, command,dest, destLength, HCP_NULL, HCP_NULL);
		}
		(*Env)->ReleaseByteArrayElements(Env, Destination, (jbyte*)dest, 0);
	}
	(*Env)->ReleaseStringUTFChars(Env, TIFCommand, command);

	return error;
}

static jstring HcpJNI_NewUTFString(JNIEnv * Env,const hcp_tString* pString) {
	jstring value = NULL;

	if(pString->zeroTerm == HCP_FALSE) {
		hcp_szStr temp = (hcp_szStr)malloc(pString->length + 1);
		memcpy(temp, pString->value, pString->length*sizeof(hcp_Char));
		temp[pString->length] = 0;

		value = (*Env)->NewStringUTF(Env, pString->value);

		free(temp);
	} else {
		value = (*Env)->NewStringUTF(Env, pString->value);
	}

	return value;
}

static jobject HcpJNI_NewObject(JNIEnv * env, const hcp_tParameter* pParameter) {
	jobject value = NULL;
	hcp_tParameter* parameter = (hcp_tParameter*)pParameter;

	switch(parameter->template_->type) {
			case HCP_FLOAT_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Float");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(F)V");
				value = (*env)->NewObject(env,cls, id, (jfloat)parameter->value.f);

			} break;
			case HCP_BOOLEAN_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Boolean");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(Z)V");
				value = (*env)->NewObject(env,cls, id, (jboolean)parameter->value.b);

			} break;
			case HCP_SIZET_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Long");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(J)V");
				value = (*env)->NewObject(env,cls, id, (jlong)parameter->value.sz);

			} break;
			case HCP_UINT8_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Integer");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(I)V");
				value = (*env)->NewObject(env,cls, id, (jint)parameter->value.u8);

			} break;
			case HCP_INT8_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Byte");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(B)V");
				value = (*env)->NewObject(env,cls, id, (jbyte)parameter->value.s8);

			} break;
			case HCP_UINT16_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Integer");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(I)V");
				value = (*env)->NewObject(env,cls, id, (jint)parameter->value.u16);

			} break;
			case HCP_INT16_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Short");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(S)V");
				value = (*env)->NewObject(env,cls, id, (jshort)parameter->value.i16);

			} break;
			case HCP_UINT32_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Long");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(J)V");
				value = (*env)->NewObject(env,cls, id, (jlong)parameter->value.u32);

			} break;
			case HCP_INT32_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Integer");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(I)V");
				value = (*env)->NewObject(env,cls, id, (jint)parameter->value.i32);

			} break;
			case HCP_UINT64_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Long");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(J)V");
				value = (*env)->NewObject(env,cls, id, (jlong)parameter->value.u64);

			} break;
			case HCP_INT64_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Long");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(J)V");
				value = (*env)->NewObject(env,cls, id, (jlong)parameter->value.i64);

			} break;
			case HCP_STRING_ID: {
				value = HcpJNI_NewUTFString(env, &parameter->value.str);
			} break;
			case HCP_DOUBLE_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Double");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(D)V");
				value = (*env)->NewObject(env,cls, id, (jdouble)parameter->value.d);

			} break;
			case HCP_BLOB_ID: {
				hcp_tBlob* blob = &parameter->value.blb;

				value = (*env)->NewBooleanArray(env, blob->length);

				if(value != NULL) {
					(*env)->SetByteArrayRegion(env, value, 0, blob->length, blob->value);
				}
			} break;
			case HCP_UNIXTIME_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Long");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(J)V");
				value = (*env)->NewObject(env,cls, id, (jlong)parameter->value.time);

			} break;
			case HCP_SIMPLEVERSION_ID: {

				jclass cls = (*env)->FindClass(env, "java/lang/Integer");
				jmethodID id = (*env)->GetMethodID(env, cls, "<init>", "(I)V");
				value = (*env)->NewObject(env,cls, id, (jint)parameter->value.version);

			} break;
			default : {
				value = NULL;
			} break;
		}

	return value;
}

JNIEXPORT jint JNICALL Java_com_husqvarnagroup_connectivity_HcpJNI_Deserialize
  (JNIEnv * Env, jobject Object, jlong StateHandle, jint Serializer, jbyteArray Source, jint Length, jobject Destination){

	hcp_tState* pState = (hcp_tState*)StateHandle;
	hcp_Uint32 serializerId = (hcp_Uint32)Serializer;
	hcp_Int bytesRead = 0;

	hcp_Uint8* source = (hcp_Uint8*)(*Env)->GetByteArrayElements(Env, Source, 0);
	{
		const hcp_Uint32 sourceLength = (hcp_Uint32)Length;
		hcp_tSerializationResult result;

		bytesRead = hcp_Deserialize(pState, Serializer, source, sourceLength, &result);
		if(bytesRead > 0) {
			//	Create a Java Hashmap object, call it's constructor and
			//	get a reference to it's "put" function.
			static const char* destClass = "com/husqvarnagroup/connectivity/HcpElement";

			static const char* setFamilyName = "setFamily";
			static const char* setFamilySig = "(Ljava/lang/String;)V";

			static const char* setCommandName = "setCommand";
			static const char* setCommandSig = "(Ljava/lang/String;)V";

			static const char* putName = "put";
			static const char* putSig = "(Ljava/lang/String;Ljava/lang/Object;)V";

			jclass class = (*Env)->FindClass(Env, destClass);

			if(class != NULL) {
				jmethodID setFamily = (*Env)->GetMethodID(Env, class, setFamilyName, setFamilySig);

				if(setFamily != NULL) {
					jmethodID setCommand = (*Env)->GetMethodID(Env, class, setCommandName, setCommandSig);

					if(setCommand != NULL) {
						jmethodID put = (*Env)->GetMethodID(Env, class, putName, putSig);

						if(put != NULL) {
							jstring family = HcpJNI_NewUTFString(Env, &result.family);
							jstring command = HcpJNI_NewUTFString(Env, &result.command);
							{
								(*Env)->CallObjectMethod(Env, Destination, setFamily, family);
								(*Env)->CallObjectMethod(Env, Destination, setCommand, command);
							}
							(*Env)->DeleteLocalRef(Env, family);
							(*Env)->DeleteLocalRef(Env, command);

							for(hcp_Size_t i = 0;i < result.parameterCount; i++) {
								static const hcp_Size_t offset = sizeof(hcp_tParameter);
								hcp_tParameter* parameter = (hcp_tParameter*)((hcp_Size_t)result.parameters + i*offset);

								jobject value = HcpJNI_NewObject(Env, parameter);
								jstring key = HcpJNI_NewUTFString(Env, &parameter->template_->name);
								{
									(*Env)->CallObjectMethod(Env, Destination, put, key, value);
								}
								(*Env)->DeleteLocalRef(Env, value);
								(*Env)->DeleteLocalRef(Env, key);
							}
						} else {
							bytesRead = throwNoSuchMethodError(Env, destClass, putName, putSig);
						}

					} else {
						bytesRead = throwNoSuchMethodError(Env, destClass,setCommandName, setCommandSig);
					}
				} else {
					bytesRead = throwNoSuchMethodError(Env, destClass,setFamilyName, setFamilySig);
				}
			} else {
				bytesRead = throwNoClassDefError(Env, destClass);
			}
		}
	}
	(*Env)->ReleaseByteArrayElements(Env, Destination, (jbyte*)source, JNI_ABORT);

	return bytesRead;
}
*/
