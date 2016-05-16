namespace Husqvarna.Connectivity {
    /// <summary>
    /// Hcp built in type-codes.
    /// </summary>
    public enum HcpTypes : int {
        Invalid = 0,
        Float = 1,
        Bool = 2,
        Void = 3,
        Size = 4,
        Uint8 = 5,
        Sint8 = 6,
        Uint16 = 7,
        Sint16 = 8,
        Uint32 = 9,
        Sint32 = 10,
        Uint64 = 11,
        Sint64 = 12,
        Ascii = 13,
        Double = 14,
        Blob = 15,
        tUnixTime = 16,
        tSimpleVersion = 17

    }
}
