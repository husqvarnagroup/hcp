/*
    Copyright (c) 2016 Husqvarna AB, A part of Husqvarna Group.
    Author: Olof Andreassen, olof.andreassen@husqvarnagroup.com

	Permission is hereby granted, free of charge, to any person obtaining
	a copy of this software and associated documentation files (the "Software"),
	to deal in the Software without restriction, including without limitation
	the rights to use, copy, modify, merge, publish, distribute, sublicense,
	and/or sell copies of the Software, and to permit persons to whom the Software
	is furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
	OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
	OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

package com.husqvarnagroup.connectivity;

import java.util.HashMap;

  class HcpException extends Exception {
    HcpException(String msg) {
      super(msg);
    }
};
/**
 *	Internal class used to map native HCP C-Runtime to Java. Do not call this call
 * 	directly but use the other provided public classes instead.
 */
public class HcpJNI {
	
	private boolean _initialized;
	
	private static HcpJNI _singleton;

        static {
		System.loadLibrary("hcp-jni");
	}
	
	public static HcpJNI GetGlobal() {
		if(_singleton == null) {
			_singleton = new HcpJNI();
		}
		
		return _singleton;
	}
	
	private HcpJNI() {
		_initialized = false;
	}
	 
	public native long NewState();
	public native void CloseState(long StateHandle);
	
	public native String GetMessage(int ErrorCode);
	public native long NewCodec(long StateHandle, String Codec, long ModelId);
	public native void CloseCodec(long StateHandle, long CodecId);
	public native long LoadModel(long StateHandle, String Model);
	//public native String LoadCodec(long StateHandle, hcp_tCodecLibrary* pLibrary);
	public native byte[] Encode(long StateHandle, long CodecId, String Command);
	//public native HcpElement Decode(long StateHandle, long CodecId, byte[] source);
	public native void Decode(long StateHandle, long CodecId, byte[] source);
	
	//native int Deserialize(long StateHandle, int SerializerId, byte[] Data, int Length, HcpElement Destination);
	//native int Serialize(long StateHandle, int SerializerId, String Command, byte[] Destination);
	
	//public native int LoadTIF(long StateHandle, String Content);
	
	//native int CreateSerializer(long StateHandle, String Protocol, int TIFId);
	//native void CloseSerializer(long StateHandle, int SerializerId);
}
