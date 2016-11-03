#define CATCH_CONFIG_MAIN
#import <catch.hpp>
#import <hcp_objc_runtime.h>
#import "objc_test_utils.hpp"

TEST_CASE( "ObjC", "Hcp" ) {
    
    auto params = std::vector<std::string>{"uint8","sint8","uint16","sint16","uint32","sint32","uint64","sint64"};
    NSError* error = nil;
    
    NSString* codecPath = @"./../../echo_codec/Debug";

    NSString* model = [NSString stringWithUTF8String:createModel(params).c_str()];
    REQUIRE(error == nullptr);
    
    Hcp* hcp = [[Hcp alloc] init];
    // Scan the file system for codec plugins
    [hcp scanForCodecsInPath:codecPath onError:&error];
    
    NSArray* codecs = [hcp codecList];
    REQUIRE([codecs count] == 1);
    
    for(NSString* c : codecs)
        REQUIRE([c isEqualToString:@"Echo"]);
    
    // Add a model
    NSInteger model_id = [hcp addModel:model onError:&error];
    REQUIRE(error == nullptr);
    
    // Create a new codec using a pluging and a model
    Codec* codec = [hcp newCodecWithModel:model_id library:@"Echo" onError:&error];
    REQUIRE(error == nullptr);
    
    for(auto type : params)
        SECTION(type) {
    // Encode a command
    NSString* command = [NSString stringWithFormat:@"Basic.CallWith%s(param:16)",type.c_str()];
    NSData* buf = [codec encodeCommand:command onError:&error];
    REQUIRE(error == nullptr);

    // Decode the encoded buffer
    Result* res = [codec decodeResult:buf onError:&error];
    REQUIRE(error == nullptr);
    // Log the decoded result
    REQUIRE([res.family isEqualToString:@"Basic"]);
    NSString* expectedCall = [NSString stringWithFormat:@"CallWith%s",type.c_str()];
    REQUIRE([res.command isEqualToString:expectedCall]);
    
    NSDictionary *expected = @{
                               @"result" : [NSNumber numberWithInt:16]
                               };
    REQUIRE([res.parameters isEqualToDictionary:expected]);
    }
    
}
