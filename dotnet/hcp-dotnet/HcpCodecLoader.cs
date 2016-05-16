using System;
using System.Runtime.InteropServices;

namespace Husqvarna.Connectivity {
    public class HcpCodecLoader : DynamicLibrary
    {
        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate IntPtr LoadDelegate();
        

        public static HcpCodecLoader LoadFile(string fileName)
        {
            return new HcpCodecLoader(fileName);
        }

        public HcpCodecLoader(string fileName) {
            Load(fileName);
        }

        protected override void OnLoad()
        {
            var load = GetMethod<LoadDelegate>("hcp_GetLibrary", true);

            try
            {
                Handle = load();
            }catch(Exception x)
            {
                throw new Exception(String.Format("Failed to call 'hcp_GetLibrary' at file '{0}': {1}.",
                    Filename, x.Message));
            }
        }
        /// <summary>
        /// Returns a handle which is used to call the codec library.
        /// </summary>
        public IntPtr Handle { get; private set; }
    }
}
