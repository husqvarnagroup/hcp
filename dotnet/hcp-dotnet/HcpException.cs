
using System;
using System.Text;

namespace Husqvarna.Connectivity {
    /// <summary>
    /// Exception thrown as a result from a native Hcp-operation
    /// which did not complete successfully.
    /// </summary>
    public class HcpException : Exception {
        /// <summary>
        /// Creates a new HCP-exception instance.
        /// </summary>
        /// <param name="code">HCP-Runtime error code.</param>
        public HcpException(HcpRuntime library,int code) {
            Code = code;
            Library = library;
        }
        /// <summary>
        /// Gets the library from which the error originated.
        /// </summary>
        public HcpRuntime Library { get; private set; }
        /// <summary>
        /// Resolves the error code into a human readable message.
        /// </summary>
        public override string Message {
            get {
                string output = "";

                try {
                    output = Library.GetErrorMessage(Code);
                } catch (Exception x) {
                    return x.Message;
                }

                return output.ToString();
            }
        }
        /// <summary>
        /// Gets the error code which caused the exception.
        /// </summary>
        public int Code { get; private set; }
    }
}
