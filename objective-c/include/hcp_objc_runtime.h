#import <Foundation/Foundation.h>
#import <hcp_runtime.h>

@interface Result : NSObject {
  @private
    NSDictionary* parameters;
    int error;
    int deviceError;
    NSString* message;
}
@property(copy) NSString* command;
@property(copy) NSString* family;
@end

@interface Codec : NSObject {
  @private
    hcp_Size_t pCodec;
    hcp_tState* pState;
}
- (id)initCodec:(hcp_Size_t)handle state:(hcp_tState*)st;
- (NSData*)encode:(NSString*)command onError:(NSError**)errorPtr;
- (Result*)decode:(NSData*)buffer onError:(NSError**)errorPtr;
@end

@interface Hcp : NSObject {
  @private
    hcp_tState* pState;
}
- (void)scanForCodecs:(NSString*)path onError:(NSError**)errorPtr;
- (NSArray*)codecList;
- (int)addModel:(NSString*)model onError:(NSError**)errorPtr;
- (Codec*)newCodec:(int)model
           library:(NSString*)name
           onError:(NSError**)errorPtr;
@end

