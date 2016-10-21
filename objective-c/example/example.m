#import <hcp_objc_runtime.h>

int main(int argc, char *argv[])
{
    NSError* error = nil;
    
    NSString* codecPath = @"/Users/jonas/dev/husqvarna/build/hcprobotics";
    NSString* modelPath = @"/Users/jonas/dev/husqvarna/hcprobotics/models/_AMG3-Debug.json";
    NSString* model = [NSString stringWithContentsOfFile:modelPath encoding:NSUTF8StringEncoding error:&error];
    if(error) {
        NSLog(@"An error occured: %@", error);
        return 1;
    }

    Hcp* hcp = [[Hcp alloc] init];
    // Scan the file system for codec plugins
    [hcp scanForCodecsInPath:codecPath onError:&error];
    
    // Get a list of found codec plugins
    NSArray* codecs = [hcp codecList];
    
    // Log names of all codecs
    for (int i=0; i<[codecs count]; i++) {
        NSLog(@"%d: %@", i, codecs[i]);
    }
    
    // Add a model
    NSInteger model_id = [hcp addModel:model onError:&error];
    if(error) {
        NSLog(@"An error occured: %@", error);
        return 1;
    }
    
    // Create a new codec using a pluging and a model
    Codec* codec = [hcp newCodecWithModel:model_id library:@"amg3" onError:&error];
    if(error) {
        NSLog(@"An error occured: %@", error);
        return 1;
    }

    // Encode a command
    NSString* command = @"DeviceInformation.GetMmiInformation()";
    NSData* buf = [codec encodeCommand:command onError:&error];
    if(error) {
        NSLog(@"An error occured: %@", error);
        return 1;
    }
    
    // Decode the encoded buffer
    Result* res = [codec decodeResult:buf onError:&error];
    if(error) {
        NSLog(@"An error occured: %@", error);
        return 1;
    }
    // Log the decoded result
    NSLog(@"Family : %@", res.family);
    NSLog(@"Command : %@", res.command);
    
    return 0;
}
