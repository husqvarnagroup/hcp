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
	
  static {
		System.loadLibrary("HcpJNI");
	}
	
	public native long NewState(String path);
	public native void CloseState(long StateHandle);
  public native String[] GetCodecNames();

	public native String GetMessage(int ErrorCode);
	public native long NewCodec(long StateHandle, String Codec, long ModelId);
	public native void CloseCodec(long StateHandle, long CodecId);
	public native int LoadModel(long StateHandle, String Model);
	public native int Decode(long StateHandle, long CodecId, byte[] Data, int Length, HcpElement Destination);
	public native int Encode(long StateHandle, long CodecId, String Command, byte[] Destination);
}
