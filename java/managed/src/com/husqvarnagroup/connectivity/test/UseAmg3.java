package com.husqvarnagroup.connectivity.test;

import com.husqvarnagroup.connectivity.HcpElement;
import com.husqvarnagroup.connectivity.HcpJNI;
//import com.husqvarnagroup.connectivity.HcpSerializer;
//import com.husqvarnagroup.connectivity.HcpSerializerFactory;

import java.net.URL;
import java.net.URLClassLoader;
 
public class UseAmg3  {
    public static void classPath() {
 
        ClassLoader sysClassLoader = ClassLoader.getSystemClassLoader();
 
        URL[] urls = ((URLClassLoader)sysClassLoader).getURLs();
 
        for(int i=0; i< urls.length; i++)
        {
            System.out.println(urls[i].getFile());
        }     
    }
	public static void main(String[] args) throws Exception {
             System.out.print("Use Amg3 \n");
             classPath();
             HcpElement elm = new HcpElement();
		//HcpJNI global = HcpJNI.GetGlobal();
             System.out.print("Amg3 Ok!!\n");
  }
}
