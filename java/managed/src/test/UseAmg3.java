package com.husqvarnagroup.connectivity.test;

import com.husqvarnagroup.connectivity.HcpElement;
import com.husqvarnagroup.connectivity.HcpJNI;
//import com.husqvarnagroup.connectivity.HcpSerializer;
//import com.husqvarnagroup.connectivity.HcpSerializerFactory;

import java.net.URL;
import java.net.URLClassLoader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
 
public class UseAmg3  {
    private static String codecPath = "/Users/jonas/dev/husqvarna/cmake_ninja/hcprobotics";
    private static String modelPath = "/Users/jonas/dev/husqvarna/hcprobotics/models/_AMG3-Debug.json";
    public static void classPath() {
 
        ClassLoader sysClassLoader = ClassLoader.getSystemClassLoader();
 
        URL[] urls = ((URLClassLoader)sysClassLoader).getURLs();
 
        for(int i=0; i< urls.length; i++)
        {
            System.out.println(urls[i].getFile());
        }
    }
    public static void main(String[] args) throws Exception
    {
      try {
        System.out.print("Use Amg3 \n");
        classPath();
        HcpElement elm = new HcpElement();
        HcpJNI global = new HcpJNI(); /// HcpJNI.GetGlobal();
        long state = global.NewState(codecPath);
        String[] names = global.GetCodecNames();
        System.out.print("Codec names " + Arrays.toString(names));
        String model = new String(Files.readAllBytes(Paths.get(modelPath)));
        int mid = global.LoadModel(state,model);
        long cid = global.NewCodec(state,"amg3",mid);
        System.out.print("Amg3 set up!!\n");
        String command = "DeviceInformation.GetMmiInformation()";
        byte[] data = new byte[1024];
        int len = global.Encode(state,cid,command,data);
        HcpElement elem = new HcpElement();
        int rec = global.Decode(state,cid,data, len, elem);
        System.err.println("Family: " + elem.getFamily());
        System.err.println("Command: " + elem.getCommand());
        global.CloseCodec(state,cid);
        global.CloseState(state);
        System.out.print("Amg3 Ok!!\n");
      } catch(Exception ex) {
        System.err.println("Oops: " + ex.getMessage());
      }
    }
}
