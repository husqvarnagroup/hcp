#import <Foundation/Foundation.h>

@interface Result : NSObject
@property(copy,readonly) NSString* command;
@property(copy,readonly) NSString* family;
@property(copy,readonly) NSDictionary* parameters;
@property(copy,readonly) NSString* message;
@property(readonly) NSInteger error;
@property(readonly) NSInteger deviceError;
@end

@interface Codec : NSObject
- (NSData*)encodeCommand:(NSString*)command onError:(NSError**)error;
- (Result*)decodeResult:(NSData*)buffer onError:(NSError**)error;
@end

@interface Hcp : NSObject
- (void)scanForCodecsInPath:(NSString*)path
                    onError:(NSError**)error;
- (NSArray*)codecList;
- (NSInteger)addModel:(NSString*)model onError:(NSError**)error;
- (Codec*)newCodecWithModel:(NSInteger)model
                    library:(NSString*)name
                    onError:(NSError**)error;
@end

