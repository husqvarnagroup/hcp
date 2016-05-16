using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.InteropServices;
using System.Text;

namespace Husqvarna.Connectivity {

    [StructLayout(LayoutKind.Sequential, Pack = 8)]
    public struct HcpDecodedMessage {
        public HcpString command;
        public HcpString family;
        public int error;
        public int deviceError;
        public IntPtr message;
        public IntPtr parameters;
        public IntPtr parameterCount;
        byte padding;
    }

    /// <summary>
    /// Native wrappers for the C-HCP runtime.
    /// </summary>
    public class HcpRuntime : DynamicLibrary {

        private IntPtr _state;
        private LoadDelegate _load;
        private UnloadDelegate _unload;
        private ToValueDelegate _toValue;
        private GetArgumentHandleDelegate _getArgumentHandle;
        private GetMessageDelegate _getMessage;
        private LoadCodecDelegate _loadCodec;
        private NewCodecDelegate _newCodec;
        private CloseCodecDelegate _closeCodec;
        private EncodeDelegate _encode;
        private DecodeDelegate _decode;
        private LoadModelDelegate _loadModel;
        private string _loadedModel;
        private IntPtr _selectedModel;
        private IntPtr _selectedCodec;
        private StringBuilder _selectedLibrary;
        private Dictionary<string, HcpCodecLoader> _loaders;

        #region HCP functions

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate void GetMessageDelegate(int ErrorCode, StringBuilder Output, IntPtr MaxLength);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate IntPtr LoadDelegate();

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate void UnloadDelegate();

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate IntPtr ToValueDelegate(IntPtr messageHandle, IntPtr index);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate IntPtr GetArgumentHandleDelegate(IntPtr messageHandle, IntPtr index);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate int EncodeDelegate(IntPtr State, IntPtr CodecId, [MarshalAs(UnmanagedType.LPStr)]string Message, IntPtr Destination, UInt32 MaxLength, IntPtr SetFlagCallback, IntPtr InstanceId);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate int DecodeDelegate(IntPtr StateHandle, IntPtr CodecId, IntPtr SourceHandle, IntPtr SourceLength, ref HcpDecodedMessage Result);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate int NewCodecDelegate(IntPtr stateHandle, StringBuilder LibraryName, IntPtr ModelId, ref IntPtr Id);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate int CloseCodecDelegate(IntPtr stateHandle, IntPtr codecId);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate int LoadCodecDelegate(IntPtr State, IntPtr LoadCallback, StringBuilder CodecName, IntPtr MaxLength);

        [UnmanagedFunctionPointer(CallingConvention.Cdecl, BestFitMapping = false, CharSet = CharSet.Ansi)]
        private delegate int LoadModelDelegate(IntPtr StateHandle, StringBuilder Model, IntPtr Length, ref IntPtr Id);

        #endregion

        public void Init(string initialModel) {
            var baseName = "hcp-ni";
            var configuration = string.Empty;
            var platform = string.Empty;

#if DEBUG
            configuration += "debug";
#else
            configuration += "release";
#endif

            if (IntPtr.Size == 4) {
                platform += "x86";
            } else {
                platform += "x64";
            }

            var codeBase = Environment.CurrentDirectory;
            var runtimePath = string.Format("{3}\\{0}-{1}-{2}.dll", baseName, configuration, platform, codeBase);
            var codecPath = string.Format("{0}\\codecs", codeBase);

            if (!File.Exists(runtimePath)) {
                throw new FileNotFoundException(runtimePath);
            }

            try {
                Load(runtimePath);
            } catch(Exception) {
                throw;
            }
            

            if (!Directory.Exists(codecPath)) {
                try {
                    Directory.CreateDirectory(codecPath);
                } catch (Exception) {
                    throw;
                }
            }

            foreach (var file in Directory.GetFiles(Path.GetFullPath(codecPath), "*.dll")) {
                HcpCodecLoader loader = null;
                var handle = IntPtr.Zero;

                // load the library
                try {
                    loader = HcpCodecLoader.LoadFile(file);
                } catch (Exception e) {
                    throw new Exception(String.Format(
                        "Failed to load codec library '{0}', reason: {1}.", file, e.Message), e);
                }

                // register the library in the runtime
                try {
                    var name = new StringBuilder(512);
                    var error = _loadCodec(_state, loader.Handle, name, new IntPtr(name.Capacity));

                    if(error < 0) {
                        throw new HcpException(this, error);
                    }

                    _loaders.Add(name.ToString().ToLower(), loader);
                } catch(Exception e) {
                    throw new Exception(String.Format(
                        "Failed to load codec library '{0}', reason: {1}.", file, e.Message), e);
                }
            }

            if (!String.IsNullOrWhiteSpace(initialModel)) {
                CloseAndLoad(initialModel);
            }
        }

        public HcpRuntime() {
            _loaders = new Dictionary<string, HcpCodecLoader>();

            _selectedModel = IntPtr.Zero;
            _selectedCodec = IntPtr.Zero;
        }

        public bool HasProtocol(string protocolName) {
            return _loaders.ContainsKey(protocolName.ToLower());
        }

        public void CloseAndLoad(string model) {
            lock(this) {
                // reload the entire codec
                CloseCodec();
                CloseModel();

                LoadModel(model);
            }
        }

        private void LoadModel(string jsonModel) {
            if(String.IsNullOrWhiteSpace(jsonModel)) {
                return;
            }

            try {
                var model = new StringBuilder(jsonModel);
                var error = _loadModel(_state, model, new IntPtr(jsonModel.Length), ref _selectedModel);

                if (error < 0) {
                    throw new HcpException(this, error);
                }

            } catch (Exception) {
                _selectedModel = IntPtr.Zero;
                _loadedModel = String.Empty;
                throw;
            }

            _loadedModel = jsonModel;
        }

        private void CloseModel() {
            if (_selectedModel != IntPtr.Zero) {
                // tear down the current model
                try {
                    // not implemented
                } catch (Exception) {

                }

                _selectedModel = IntPtr.Zero;
            }
        }

        private void CloseCodec() {
            if (_selectedCodec != IntPtr.Zero) {
                // tear down the current codec
                try {
                    _closeCodec(_state, _selectedCodec);
                } catch {}

                _selectedCodec = IntPtr.Zero;
            }
        }

        private IntPtr GetValidCodec() {
            if (_selectedCodec != IntPtr.Zero) {
                return _selectedCodec;
            }

            try {
                var error = _newCodec(_state, _selectedLibrary, _selectedModel, ref _selectedCodec);

                if (error < 0) {
                    throw new HcpException(this, error);
                }
            } catch (Exception) {
                _selectedCodec = IntPtr.Zero;
                throw;
            }

            return _selectedCodec;
        }
        
        ~HcpRuntime() {
            Close();
        }

        protected override void OnLoad() {
            _load = GetMethod<LoadDelegate>("hcp_Load", true);
            _unload = GetMethod<UnloadDelegate>("hcp_Unload", false);
            _toValue = GetMethod<ToValueDelegate>("hcp_tovalue", false);
            _getArgumentHandle = GetMethod<GetArgumentHandleDelegate>("hcp_argat", false);
            _getMessage = GetMethod<GetMessageDelegate>("hcp_GetMessage", false);
            _encode = GetMethod<EncodeDelegate>("hcp_Encode", false);
            _decode = GetMethod<DecodeDelegate>("hcp_Decode", false);
            _newCodec = GetMethod<NewCodecDelegate>("hcp_NewCodec", false);
            _closeCodec = GetMethod<CloseCodecDelegate>("hcp_CloseCodec", false);
            _loadCodec = GetMethod<LoadCodecDelegate>("hcp_LoadCodec", false);
            _loadModel = GetMethod<LoadModelDelegate>("hcp_LoadModel", false);

            try {
                _state = _load();
            } catch (Exception x) {
                throw new Exception("Error occured while calling 'hcp_Load': " + x.Message);
            }
        }


        public void Unload() {
            lock(this) {
                if (_unload == null) {
                    throw new MissingMethodException("Unloading is not supported.");
                }

                _unload();
            }
        }

        public string SelectedLibrary {
            get {
                return _selectedLibrary.ToString();
            } set {

                lock(this) {
                    if (!_loaders.ContainsKey(value.ToLower())) {

                        throw new NullReferenceException(string.Format(
                            "No codec named '{0}' has been loaded.", value));
                    }

                    _selectedLibrary = new StringBuilder(value);
                    CloseAndLoad(_loadedModel);
                }
            }
        }


        private static HcpElement MarshalDecodedMessage(HcpDecodedMessage Message) {
            var output = new Dictionary<string, dynamic>();
            var size = Marshal.SizeOf(typeof(HcpParameter));
            var count = Message.parameterCount.ToInt32();

            for (var i = 0; i < count; i++) {
                var address = IntPtr.Zero;

                if (IntPtr.Size == 4) {
                    address = new IntPtr(Message.parameters.ToInt32() + (int)i * size);
                } else {
                    address = new IntPtr(Message.parameters.ToInt64() + (long)i * size);
                }

                var parameter = (HcpParameter)Marshal.PtrToStructure(address, typeof(HcpParameter));

                output.Add(parameter.Name, parameter.Value);
            }

            return new HcpElement(Message.command.ToString(), Message.family.ToString(), output);
        }

        public HcpElement Decode(byte[] Source, int Length, out int BytesRead) {
            if (_decode == null) {
                throw new MissingMethodException("The HCP-runtime does not support decoding.");
            }

            lock(this) {
                var handle = GCHandle.Alloc(Source, GCHandleType.Pinned);
                HcpDecodedMessage message = new HcpDecodedMessage();
                var codec = GetValidCodec();
                try {
                    BytesRead = _decode(_state, codec, handle.AddrOfPinnedObject(), new IntPtr(Length), ref message);
                }
                catch(Exception x) {
                    throw x;
                }
                finally {
                    handle.Free();
                }

                return MarshalDecodedMessage(message);
            }
        }

        private readonly Object _encodeLock = new object();

        public byte[] Encode(string Message) {
            if (_encode == null) {
                throw new MissingMethodException("The HCP-runtime does not support encoding.");
            }

            lock(this) {
                var buffer = new byte[1024];
                var handle = GCHandle.Alloc(buffer, GCHandleType.Pinned);
                int bytesWritten = 0;
                var codec = GetValidCodec();

                try {
                    bytesWritten = _encode(_state, codec, Message, handle.AddrOfPinnedObject(),
                    (uint)buffer.Length, IntPtr.Zero, IntPtr.Zero);
                } finally {
                    handle.Free();
                }


                if (bytesWritten < 0) {
                    throw new HcpException(this, bytesWritten);
                }

                var output = new byte[bytesWritten];
                Array.Copy(buffer, output, bytesWritten);
                return output;
            }
        }
        /// <summary>
        /// Returns a message describing error code.
        /// </summary>
        /// <param name="code">Code to resolve.</param>
        /// <returns></returns>
        public string GetErrorMessage(int code) {
            var output = new StringBuilder(512);
            _getMessage(code, output, new IntPtr(output.Capacity));
            return output.ToString();
        }

        #region IDisposable Support
        /// <summary>
        /// Returns true if the library is currently being closed.
        /// </summary>
        public bool IsClosing { get; private set; }

        // This code added to correctly implement the disposable pattern.
        public void Close() {
            lock (this) {
                if (_state == IntPtr.Zero || IsClosing) {
                    return;
                }

                IsClosing = true;
            }

            try {

                // TODO: Implement proper close.
            } finally {
                _state = IntPtr.Zero;
                IsClosing = false;
            }
        }



        #endregion
    }

}
