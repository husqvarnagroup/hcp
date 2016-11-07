#import "hcp_objc_runtime.h"
#import "hcp_scan.h"
#import "hcp_runtime.h"

#if ! __has_feature(objc_arc)
#error "ARC is off"
#endif


NSString* fromHcpString(hcp_tString const* str)
{
    if (str->zeroTerm)
        return @(str->value);
    else
        return [[NSString alloc] initWithBytes:(char const*)str->value
                                        length:str->length
                                      encoding:NSUTF8StringEncoding];
}
NSObject* convertHcpParameter(hcp_tParameter const* parameter)
{
    switch (parameter->template_->type) {
    case HCP_FLOAT_ID:
        return [NSNumber numberWithFloat:parameter->value.f];
    case HCP_BOOLEAN_ID:
        return [NSNumber numberWithBool:parameter->value.b];
    case HCP_SIZET_ID:
        return [NSNumber numberWithUnsignedLong:parameter->value.sz];
    case HCP_UINT8_ID:
        return [NSNumber numberWithInt:parameter->value.u8];
    case HCP_INT8_ID:
            return [NSNumber numberWithInt:parameter->value.s8];
    case HCP_UINT16_ID:
        return [NSNumber numberWithUnsignedInt:parameter->value.u16];
    case HCP_INT16_ID:
        return [NSNumber numberWithInt:parameter->value.i16];
    case HCP_UINT32_ID:
        return [NSNumber numberWithUnsignedInt:parameter->value.u32];
    case HCP_INT32_ID:
        return [NSNumber numberWithInt:parameter->value.i32];
    case HCP_UINT64_ID:
        return [NSNumber numberWithUnsignedLong:parameter->value.u64];
    case HCP_INT64_ID:
        return [NSNumber numberWithLong:parameter->value.i64];
    case HCP_STRING_ID:
        return fromHcpString(&parameter->value.str);
    case HCP_DOUBLE_ID:
        return [NSNumber numberWithDouble:parameter->value.d];
    case HCP_BLOB_ID:
        return [NSData dataWithBytes:(void*)parameter->value.blb.value
                              length:parameter->value.blb.length];
    case HCP_UNIXTIME_ID:
        return [NSDate dateWithTimeIntervalSince1970:parameter->value.time];
    case HCP_SIMPLEVERSION_ID:
        return [NSNumber numberWithInt:parameter->value.version];
    default:
            assert(false);
        return nil;
    }
}

@implementation Result
{
}

- (id)initFromHcpResult:(hcp_tResult const*)res
{
    self = [super init];
    if (self) {
        NSMutableDictionary* ret = [[NSMutableDictionary alloc] init];
        for (hcp_Size_t i = 0; i < res->parameterCount; i++) {
            hcp_tParameter const* parameter = res->parameters + i;
            [ret setObject:convertHcpParameter(parameter)
                    forKey:fromHcpString(&parameter->template_->name)];
        }
        _command = fromHcpString(&res->command);
        _family = fromHcpString(&res->family);
        _parameters = ret;
        _error = res->error;
        _deviceError = res->deviceError;
        if (res->message)
            _message = [NSString stringWithUTF8String:res->message];
    }
    return self;
}
@end

@implementation Codec {
    hcp_Size_t pCodec;
    hcp_tState* pState;
}

- (id)initCodecWithHandle:(hcp_Size_t)handle state:(hcp_tState*)state
{
    self = [super init];
    if (self) {
        pCodec = handle;
        pState = state;
    }
    return self;
}
- (NSData*)encodeCommand:(NSString *)command onError:(NSError *__autoreleasing *)error
{
    hcp_Uint8 buffer[1024];
    int bytesWritten =
        hcp_Encode(pState, pCodec, [command UTF8String], buffer, 1024);
    if (bytesWritten < 0) {
        char msg[1024];
        hcp_GetMessage(bytesWritten, msg, 1024);
        *error = [NSError errorWithDomain:@"com.husqvarna"
                                        code:bytesWritten
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return nil;
    }
    return [NSData dataWithBytes:(void*)buffer length:bytesWritten];
}
- (Result*)decodeResult:(NSData *)buffer onError:(NSError *__autoreleasing *)error
{
    hcp_tResult dest;
    int bytesRead =
        hcp_Decode(pState, pCodec, [buffer bytes], [buffer length], &dest);
    if (bytesRead < 0) {
        char msg[1024];
        hcp_GetMessage(bytesRead, msg, 1024);
        *error = [NSError errorWithDomain:@"com.husqvarna"
                                        code:bytesRead
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return nil;
    }
    return [[Result alloc] initFromHcpResult:&dest];
}
@end

@implementation Hcp
{
    hcp_tState* pState;
    hcp_tHost host;
}

- (void)dealloc
{
    hcp_Int err = hcp_CloseState(pState);
    if(err != HCP_NOERROR) {
        char errStr[512];
        hcp_GetMessage(err,errStr,512);
        NSLog(@"%s", errStr);
    }
    host.free_(pState,0);
}
- (void)scanForCodecsInPath:(NSString *)path onError:(NSError *__autoreleasing *)error
{
    error = nil;
    hcp_ScanAndLoad([path UTF8String], pState);
}
- (id)init
{
    self = [super init];
    if (self) {
        hcp_DefaultHost(&host);
        pState = host.malloc_(hcp_SizeOfState(),0);
        host.memset_(pState,0,hcp_SizeOfState(),0);
        hcp_Int err = hcp_NewState(pState,&host);
        if(err != HCP_NOERROR) {
            char errStr[512];
            hcp_GetMessage(err,errStr,512);
            NSLog(@"%s", errStr);
        }
    }
    return self;
}

- (NSArray*)codecList
{
    NSMutableArray* codecs = [NSMutableArray array];
    int count = hcp_getNumOfCodecs(pState);

    for (int i = 0; i < count; ++i)
        [codecs addObject:@(hcp_getCodecNameAtIndex(pState, i))];

    return [NSArray arrayWithArray:codecs];
}

- (NSInteger)addModel:(NSString *)model onError:(NSError *__autoreleasing *)error{
    int handle;
    int err = hcp_LoadModel(pState, [model UTF8String], [model length], &handle);
    if (err != HCP_NOERROR) {
        char msg[1024];
        hcp_GetMessage(err, msg, 1024);
        *error = [NSError errorWithDomain:@"com.husqvarna"
                                        code:err
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return err;
    }
    return (NSInteger)handle;
}

- (Codec*)newCodecWithModel:(NSInteger)model library:(NSString *)name onError:(NSError *__autoreleasing *)error
{
    hcp_Size_t handle;
    int err = hcp_NewCodec(pState, [name UTF8String], model, &handle);
    if (err != HCP_NOERROR) {
        char msg[1024];
        hcp_GetMessage(err, msg, 1024);
        *error = [NSError errorWithDomain:@"com.husqvarna"
                                        code:err
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return nil;
    }
    return [[Codec alloc] initCodecWithHandle:handle state:pState];
}

@end
