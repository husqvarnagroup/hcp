package com.husqvarnagroup.connectivity;

public class HcpSerializer {
	private int _serializerId;
	private long _stateHandle;
	private HcpJNI _jni;
	
	public HcpSerializer(long StateHandle, int SerializerId, HcpJNI Jni) {
		_serializerId = SerializerId;
		_stateHandle = StateHandle;
		_jni = Jni;
	}
	
	public HcpElement fromBytes(byte[] Source, int Length) throws Exception {
		HcpElement element = new HcpElement();
		
		int error = _jni.Deserialize(_stateHandle, _serializerId, Source, Length, element);
		
		if(error < 0) {
			throw new Exception(_jni.GetMessage(error));
		}
		
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

		int bytesWritten = _jni.Serialize(_stateHandle, _serializerId, Command, Destination);
		
		if(bytesWritten < 0) {
			throw new Exception(_jni.GetMessage(bytesWritten));
		}
		
		return bytesWritten;
	}
	
	public void close() {
		_jni.CloseSerializer(_stateHandle, _serializerId);
	}
}
