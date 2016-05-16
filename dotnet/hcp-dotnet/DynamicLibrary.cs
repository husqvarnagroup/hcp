using System;
using System.Runtime.InteropServices;

namespace Husqvarna.Connectivity
{
    public abstract class DynamicLibrary
    {
        #region Extern functions

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr LoadLibrary(string libname);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto)]
        private static extern bool FreeLibrary(IntPtr hModule);

        [DllImport("kernel32.dll", CharSet = CharSet.Ansi)]
        private static extern IntPtr GetProcAddress(IntPtr hModule, string lpProcName);

        #endregion Extern functions

        private IntPtr _handle;

        protected void Load(string filename)
        {
            _handle = LoadLibrary(filename);

            if(_handle == IntPtr.Zero)
            {
                throw new Exception("Failed to load" + filename + ", code" + Marshal.GetLastWin32Error());
            }

            Filename = filename;

            OnLoad();
        }

        protected T GetMethod<T>(string MethodName, bool ThrowOnNotFound)
        {
            if(_handle == IntPtr.Zero)
            {
                if(ThrowOnNotFound)
                {
                    throw new InvalidOperationException("cannot call 'GetMethod' when no library has been loaded.");
                }

                return default(T);
            }

            var address = GetProcAddress(_handle, MethodName);

            if(address == IntPtr.Zero)
            {
                if(ThrowOnNotFound)
                {
                    throw new MissingMethodException("Method '" + MethodName + "' was not found.");
                }

                return default(T);
            }

            return (T)(object)Marshal.GetDelegateForFunctionPointer(address, typeof(T));
        }

        protected DynamicLibrary()
        {
            _handle = IntPtr.Zero;
        }

        ~DynamicLibrary()
        {
            if(_handle != IntPtr.Zero)
            {
                try
                {
                    FreeLibrary(_handle);
                    _handle = IntPtr.Zero;
                }catch { }
            }
        }

        public string Filename { get; private set; }


        protected abstract void OnLoad();
    }

}
