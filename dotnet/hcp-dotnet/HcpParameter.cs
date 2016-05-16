using System;
using System.Runtime.InteropServices;

namespace Husqvarna.Connectivity {

    [StructLayout(LayoutKind.Sequential, Pack = 8)]
    public struct HcpString {
        private IntPtr value;
        private IntPtr length;
        private byte zeroTerm;

        public override string ToString() {
            if (value == IntPtr.Zero) {
                return String.Empty;
            }

            return Marshal.PtrToStringAnsi(value, length.ToInt32());
        }
    }

    [StructLayout(LayoutKind.Sequential, Pack = 8)]
    public struct HcpBlob {
        IntPtr value;
        IntPtr length;
        IntPtr maxLength;

        public byte[] Value {
            get {
                var count = length.ToInt32();
                var result = new byte[count];
                Marshal.Copy(value, result, 0, count);

                return result;
            }
        }
    }

    [StructLayout(LayoutKind.Explicit, Pack = 8)]
    public struct HcpValue {
        [FieldOffset(0)]
        public double d;
        [FieldOffset(0)]
        public float f;
        [FieldOffset(0)]
        public byte b;
        [FieldOffset(0)]
        public ulong sz;
        [FieldOffset(0)]
        public byte u8;
        [FieldOffset(0)]
        public sbyte s8;
        [FieldOffset(0)]
        public UInt16 u16;
        [FieldOffset(0)]
        public Int16 i16;
        [FieldOffset(0)]
        public UInt32 u32;
        [FieldOffset(0)]
        public Int32 i32;
        [FieldOffset(0)]
        public UInt64 u64;
        [FieldOffset(0)]
        public Int64 i64;
        [FieldOffset(0)]
        public UInt32 time;
        [FieldOffset(0)]
        public UInt16 version;
        [FieldOffset(0)]
        public int i;
        [FieldOffset(0)]
        public IntPtr p;
        [FieldOffset(0)]
        public HcpString str;
        [FieldOffset(0)]
        public HcpBlob blb;
    }

    [StructLayout(LayoutKind.Sequential, Pack = 8)]
    public struct HcpParameterTemplate {
        HcpString name;
        byte type;
        UInt32 length;

        public string Name {
            get {
                return name.ToString();
            }
        }

        public int Type {
            get {
                return type;
            }
        }

        public uint Length {
            get {
                return length;
            }
        }
    }

    [StructLayout(LayoutKind.Sequential, Pack = 8)]
    public struct HcpParameter {
        IntPtr template;
        HcpValue value;
        Byte hasValue;

        public string Name {
            get {
                var template = MarshalTemplate();
                return template.Name;
            }
        }
        public dynamic Value {
            get {
                var template = MarshalTemplate();

                switch (template.Type) {
                    case (int)HcpTypes.Invalid: return null;
                    case (int)HcpTypes.Float: return value.f;
                    case (int)HcpTypes.Bool: return value.b == 1;
                    case (int)HcpTypes.Size: return value.p;
                    case (int)HcpTypes.Uint8: return value.u8;
                    case (int)HcpTypes.Sint8: return value.s8;
                    case (int)HcpTypes.tSimpleVersion: return value.version;
                    case (int)HcpTypes.Uint16: return value.u16;
                    case (int)HcpTypes.Sint16: return value.i16;
                    case (int)HcpTypes.tUnixTime: return value.time;
                    case (int)HcpTypes.Uint32: return value.u32;
                    case (int)HcpTypes.Sint32: return value.i32;
                    case (int)HcpTypes.Uint64: return value.u64;
                    case (int)HcpTypes.Sint64: return value.i64;
                    case (int)HcpTypes.Ascii: return value.str.ToString();
                    case (int)HcpTypes.Double: return value.d;
                    case (int)HcpTypes.Blob: return value.blb.Value;
                    default:
                        throw new NotSupportedException(String.Format(
                   "The type {0} is not supported.", template.Type));
                }
            }
        }

        private HcpParameterTemplate MarshalTemplate() {
            if (template == IntPtr.Zero) {
                throw new ArgumentNullException("templateHeader");
            }

            return (HcpParameterTemplate)Marshal.PtrToStructure(template, typeof(HcpParameterTemplate));
        }
    }
}
