#import <hcp_objc_runtime.h>
#import <hcp_scan.h>

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
        return nil;
    }
}
@implementation Result
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
        error = res->error;
        deviceError = res->deviceError;
        if (res->message)
            message = [NSString stringWithUTF8String:res->message];
    }
    return self;
}
@end

@implementation Codec
- (id)initCodec:(hcp_Size_t)handle state:(hcp_tState*)state
{
    self = [super init];
    if (self) {
        pCodec = handle;
        pState = state;
    }
    return self;
}
- (NSData*)encode:(NSString*)command onError:(NSError**)errorPtr
{
    hcp_Uint8 buffer[1024];
    int bytesWritten =
        hcp_Encode(pState, pCodec, [command UTF8String], buffer, 1024);
    if (bytesWritten < 0) {
        char msg[1024];
        hcp_GetMessage(bytesWritten, msg, 1024);
        *errorPtr = [NSError errorWithDomain:@"com.husqvarna"
                                        code:bytesWritten
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return nil;
    }
    return [NSData dataWithBytes:(void*)buffer length:bytesWritten];
}
- (Result*)decode:(NSData*)buffer onError:(NSError**)errorPtr
{
    hcp_tResult dest;
    int bytesRead =
        hcp_Decode(pState, pCodec, [buffer bytes], [buffer length], &dest);
    if (bytesRead < 0) {
        char msg[1024];
        hcp_GetMessage(bytesRead, msg, 1024);
        *errorPtr = [NSError errorWithDomain:@"com.husqvarna"
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

- (void)dealloc
{
    hcp_CloseState2(pState, NULL);
    [super dealloc];
}
- (void)scanForCodecs:(NSString*)path onError:(NSError**)errorPtr
{
    hcp_ScanAndLoad([path UTF8String], pState);
}
- (id)init
{
    self = [super init];
    if (self) {
        pState = hcp_NewState2(NULL);
    }
    return self;
}

- (NSArray*)codecList
{
    NSMutableArray* codecs = [NSMutableArray array];
    int count = hcp_getCodecCount(pState);

    for (int i = 0; i < count; ++i)
        [codecs addObject:@(hcp_getCodecName(pState, i))];

    return [NSArray arrayWithArray:codecs];
}

- (int)addModel:(NSString*)model onError:(NSError**)errorPtr
{
    int id;
    int err = hcp_LoadModel(pState, [model UTF8String], [model length], &id);
    if (err != HCP_NOERROR) {
        char msg[1024];
        hcp_GetMessage(err, msg, 1024);
        *errorPtr = [NSError errorWithDomain:@"com.husqvarna"
                                        code:err
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return err;
    }
    return id;
}

- (Codec*)newCodec:(int)model
           library:(NSString*)name
           onError:(NSError**)errorPtr
{
    hcp_Size_t id;
    int err = hcp_NewCodec(pState, [name UTF8String], model, &id);
    if (err != HCP_NOERROR) {
        char msg[1024];
        hcp_GetMessage(err, msg, 1024);
        *errorPtr = [NSError errorWithDomain:@"com.husqvarna"
                                        code:err
                                    userInfo:@{
                                        @"Error reason" : @(msg)
                                    }];
        return nil;
    }
    return [[Codec alloc] initCodec:id state:pState];
}

@end
