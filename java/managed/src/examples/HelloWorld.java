
package com.husqvarnagroup.connectivity.examples;

import java.util.Map;
import java.util.Scanner;

import com.husqvarnagroup.connectivity.HcpElement;
import com.husqvarnagroup.connectivity.HcpJNI;
import com.husqvarnagroup.connectivity.HcpSerializer;
import com.husqvarnagroup.connectivity.HcpSerializerFactory;
import com.fazecast.jSerialComm.*;

public class HelloWorld  {
	
	private static Scanner lineScan = new Scanner(System.in);

	public static void main(String[] args) throws Exception {
		
		SerialPort port = selectPort();
		
		if(port == null) {
			return;
		}
		
		HcpJNI global = HcpJNI.GetGlobal();
		
		HcpSerializerFactory factory = new HcpSerializerFactory(global);
		factory.initialize();
		
		HcpSerializer serializer = null;
		
		factory.loadTIF("../../../amg3/AMG3-Debug.json");
		serializer = factory.create("AMG3", 1);  
		
		InterpretCommands(port, serializer);

		serializer.close();
		factory.close();
	}
	
	 static void InterpretCommands(SerialPort Port, HcpSerializer Serializer) {
         String command = "";

         byte[] received = new byte[1024];

        while(true) 
         {
             System.out.print("\n=========================================\nEnter command ('quit to exit'): ");
             
             if(lineScan == null) {
            	 command = "DeviceInformation.GetMmiInformation()";
             } else {
            	 command = lineScan.nextLine();
             }

             if(command.compareToIgnoreCase("quit") == 0) {
                 return;
             }
             
             System.out.println("'" + command + "'");

             byte[] buffer = new byte[512];
             int bytesWritten = 0;

             try {
            	 bytesWritten = Serializer.toBytes(command, buffer);
             } catch(Exception x) {
                 System.out.println("Serialize failed, reason: " + x.getMessage());
                 return;
             }
             
             Port.writeBytes(buffer, bytesWritten);
             
             try {
				Thread.sleep(900);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

             int bytesRead = Port.readBytes(received, received.length);

             try { 
            	 
                 while(bytesRead > 0) {
                     HcpElement result = Serializer.fromBytes(received,bytesRead);

                     if (result == null) {
                         System.out.println("no data.");
                     } else {
                         print(result);
                     }

                     if(result.getBytesRead() > 0) {
                         bytesRead -= result.getBytesRead();
                     } else {
                         break;
                     }
                 }
                 
             }catch(Exception x) {
                 System.out.println("Deserialize failed, reason: " + x.getMessage());
                 return;
             }
         }
     }
	
	static SerialPort selectPort() {
		System.out.println("Availibe ports: ");
		
		SerialPort[] ports = SerialPort.getCommPorts();
		
		for(int i = 0;i < ports.length; i++) {
			System.out.println("  " + (i + 1) + ": \t" + ports[i].getSystemPortName() + " - (" + ports[i].getDescriptivePortName() + ")");
		}
		
		int portIndex = 0;
		SerialPort port = null;

		while(portIndex < 1) 
		{
			System.out.println("Select (1 to " + ports.length + ") or 'quit' to terminate: ");
			String line = "";
			
			if(lineScan == null) {
				line = Integer.toString(ports.length);
			} else {
				line = lineScan.nextLine();
			}
			
			if(line.compareToIgnoreCase("quit") == 0) {
				lineScan.close();
				return null;
			}
			
			try {
				portIndex = Integer.parseInt(line);
				
				if(portIndex < 1 || portIndex > ports.length) {
					portIndex = 0; 
				} else {
					port = ports[portIndex - 1];
					
					try {
						if(!port.openPort()) {
							throw new Exception("Open port returned false.");
						}
					} catch(Exception x) {
						System.out.println(x.getMessage());
						port = null;
						portIndex = 0;
					}
				}
			} catch(Exception x) {
				portIndex = 0;
			}
		}
		
		return port;
	}
	
	/**
	 *  Stolen from: http://stackoverflow.com/questions/9655181/how-to-convert-a-byte-array-to-a-hex-string-in-java
	 */
	final protected static char[] hexArray = "0123456789ABCDEF".toCharArray();
	public static String bytesToHex(byte[] bytes, int length) {
	    char[] hexChars = new char[2];
	    String result = "";
	    length = length < bytes.length ? length : bytes.length;
	    
	    for ( int j = 0; j < length; j++ ) {
	        int v = bytes[j] & 0xFF;
	        hexChars[0] = hexArray[v >>> 4];
	        hexChars[1] = hexArray[v & 0x0F];
	        
	        result += new String(hexChars);
	        
	        if(j + 1 < length) {
	        	result += ",";
	        }
	    }

	    return result;
	}
	
	private static void print(HcpElement Element) {
		System.out.println("\n===================================");
		System.out.print(Element.getFamily() + "." + Element.getCommand() + "\n");
		
		Map<String, Object> response = Element.getResponse();
		
		for(String key : response.keySet()) {
			System.out.println("\t" + key + ": " + response.get(key).toString());
		}
	}

	private static void print(byte[] source, int length) {
		System.out.println(bytesToHex(source, length));
	}
}
