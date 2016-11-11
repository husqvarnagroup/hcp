package com.husqvarnagroup.connectivity;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.husqvarnagroup.connectivity.HcpJNI;

public class HcpSerializerFactory {
	
	private HcpJNI _library;
	private long _stateHandle;
	private Map<String, Integer> _tifs;

	
	public HcpSerializerFactory(HcpJNI Library) {
		_library = Library;
		_stateHandle = 0;
		_tifs = new HashMap<String, Integer>(); 
	}
	
	public void loadTIF(String Filename) throws IOException {
		File handle = new File(Filename);
		
		FileInputStream stream = new FileInputStream(handle);
		byte[] data = new byte[(int) handle.length()];
		
		stream.read(data);
		stream.close();

		String body = new String(data, "UTF-8");
		int id = _library.LoadModel(_stateHandle, body);

		// add to internal collection
		_tifs.put(Filename,  id);
	}
	
	public HcpSerializer create(String Protocol, int TIFId) throws Exception {
		// check that the id exists
		if(_tifs.containsValue(new Integer(TIFId)) == false) {
			throw new Exception("Invalid TIF-body id.");
		}

		long serializerId = _library.NewCodec(_stateHandle,  Protocol,  TIFId);
		
		//if(serializerId < 0) {
			//String errorMessage = _library.GetMessage(serializerId);
			//throw new IOException(errorMessage);
		//}
		
		return new HcpSerializer(_stateHandle, serializerId, _library);
	}
	
	public void initialize() {
		_stateHandle = _library.NewState("");
	}
	
	public void close() {
		if(_stateHandle != 0) {
			_library.CloseState(_stateHandle);
		}
	}
}
