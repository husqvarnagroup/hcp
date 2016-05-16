using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Husqvarna.Connectivity {
    public class HcpElement {
        
        public HcpElement(string command, string family, IReadOnlyDictionary<string, dynamic> response) {
            Command = command;
            Family = family;
            Response = response;
        }
        /// <summary>
        /// Gets the command that caused the response
        /// </summary>
        public string Command {
            get; private set;
        }
        /// <summary>
        /// Gets the family of the command that caused the response
        /// </summary>
        public string Family {
            get; private set;
        }
        /// <summary>
        /// Gets a dictionary with the result of the executed command
        /// </summary>
        public IReadOnlyDictionary<string, dynamic> Response {
            get; private set;
        }
    }
}
