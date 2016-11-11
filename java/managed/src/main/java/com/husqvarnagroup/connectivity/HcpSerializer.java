package com.husqvarnagroup.connectivity;

public class HcpSerializer {
	private long _serializerId;
	private long _stateHandle;
	private HcpJNI _jni;
	
	public HcpSerializer(long StateHandle, long SerializerId, HcpJNI Jni) {
		_serializerId = SerializerId;
		_stateHandle = StateHandle;
		_jni = Jni;
	}
	
	public HcpElement fromBytes(byte[] Source, int Length) throws Exception {
		HcpElement element = new HcpElement();
		
		int error = _jni.Decode(_stateHandle, _serializerId, Source, Length, element);
		
		element.setBytesRead(error);
		return element;
	}
	
	public int toBytes(String Command, byte[] Destination) throws Exception {
		if(Destination == null) {
			throw new NullPointerException("Destination");
		}

		if(Command == null || Command.length() == 0) {
			return 0;
		}

		int bytesWritten = _jni.Encode(_stateHandle, _serializerId, Command, Destination);
		
		return bytesWritten;
	}
	
	//public void close() {
		//_jni.CloseSerializer(_stateHandle, _serializerId);
	//}
}
