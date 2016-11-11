package com.husqvarnagroup.connectivity;

import java.util.HashMap;
import java.util.Map;

public class HcpElement {
	private String _command;
	private String _family;
	private HashMap<String, Object> _response;
	private int _bytesRead;
	
	public HcpElement() {
		_command = "";
		_family = "";
		_response = new HashMap<String, Object>();
	}
	
	public void setCommand(String Command) {
		_command = Command;
	}
	
	public void setFamily(String Family) {
		_family = Family;
	}
	
	public String getCommand() {
		return _command;
	}
	
	public String getFamily() {
		return _family;
	}
	
	public void put(String Key, Object Value) {
		_response.put(Key, Value);
	}
	
	public Map<String, Object> getResponse() {
		return (Map<String, Object>)_response;
	}
	
	public int getBytesRead() {
		return _bytesRead;
	}
	
	public void setBytesRead(int BytesRead) {
		_bytesRead = BytesRead;
	}
}
