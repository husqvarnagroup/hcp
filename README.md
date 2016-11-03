# HCP

HCP is a cross platform protocol encoding library which enables product communication on any platform - from embedded systems to iOS, Android, Linux, Windows and MacOS.

##  1. <a name='Platformspecificdocumentation-0'></a>Platform specific documentation

* [Objective-C](./objective-c.md)

<!-- vscode-markdown-toc -->
* 1. [Platform specific documentation](#Platformspecificdocumentation-0)
* 2. [Background](#Background-1)
* 3. [Benefits](#Benefits-2)
* 4. [How does it work?](#Howdoesitwork-3)
	* 4.1. [The state](#Thestate-4)
	* 4.2. [Memory model](#Memorymodel-5)
		* 4.2.1. [Fixed memory](#Fixedmemory-6)
		* 4.2.2. [Dynamic memory](#Dynamicmemory-7)
	* 4.3. [Codecs](#Codecs-8)
	* 4.4. [Models](#Models-9)
		* 4.4.1. [Header](#Header-10)
		* 4.4.2. [Types](#Types-11)
		* 4.4.3. [Methods](#Methods-12)
		* 4.4.4. [Parameters](#Parameters-13)
	* 4.5. [Example models](#Examplemodels-14)
		* 4.5.1. [Single method, no in-or out-params.](#Singlemethodnoin-orout-params.-15)
		* 4.5.2. [Single method, single in-or out-param.](#Singlemethodsinglein-orout-param.-16)
		* 4.5.3. [Single method, multiple in-or out-param.](#Singlemethodmultiplein-orout-param.-17)
		* 4.5.4. [Multiple methods, multiple in-or out-param.](#Multiplemethodsmultiplein-orout-param.-18)
		* 4.5.5. [Single method, multiple input, single output parameter](#Singlemethodmultipleinputsingleoutputparameter-19)
	* 4.6. [Requests](#Requests-20)
		* 4.6.1. [Request rules](#Requestrules-21)
* 5.1. [Codec library](#Codeclibrary-22)
	* 5.1. [Tutorial](#Tutorial-23)
		* 5.1.1. [Required tools](#Requiredtools-24)
		* 5.1.2. [Folder structure](#Folderstructure-25)

<!-- /vscode-markdown-toc -->

##  2. <a name='Background-1'></a>Background

HCP, short for Husqvarna Connectivity Platform, was founded in 2015 and originated from a need to simply application development that uses Husqvarna products. Most products had different protocols and there were several applications that communicated with the products. Applications written in different languages. This lead to multiple implementations of the product protocols in differnt languages, making any change in a protocol a burden since it effected several implementations maintainted by different development teams.

##  3. <a name='Benefits-2'></a>Benefits

Some of the top selling points of why one might use HCP while developing applications:

* Use the same product protocol implementation on ANY platform.
* App developers need NO knowledge of the underlaying protocol.
* Build application generic apps by having a single interface against any supported protocol.
* HCP comes with a platform wrapper echo system allowing developings to get started on their favorite platform; .Net, Java, C/C++, Node.JS, Python , Objective-C and more*!.

##  4. <a name='Howdoesitwork-3'></a>How does it work?

HCP is a encoder library/runtime which converts a device request into bytes, and a range of bytes into a device response. HCP and all supported protocol codecs is written in ANSI C99 (might be changed to C98).

Nor the runtime or any codec uses any external library, not even the standard library, making it extremly portable as it sets no requirement on the environment in which it runs.

###  4.1. <a name='Thestate-4'></a>The state

Internally, HCP uses a state which is nothing more than a struct which holds the internal state of the runtime, loaded codecs and models*. In most cases, an application uses a single state, depending on the wrapper it might not even be exposed to the developer but is passed automatically when calling the wrapper library. *Wrapper implementors should never expose the state objects*, they should be considered as neccessary boilerplate that the end user shouldnt have to worry about.

There are two cases where multiple states is neccessary:

* Unit tests - To fully tear down and setup a new environment it is neccessary to release a state and create a new. The state holds all loaded *codecs* and models. Therefore it should be teared down (released) between each test suit.
* Multiple threads - To minimize the amount of required memory when loading models, *codec instances* share the same object when reading and writing to input and output parameters. This works well within a single thread but *multiple threads must use different states*. Using the same state for multiple threads *WILL* result in that input and output results from operations will be corrupted as codecs write to the same *non threadsafe* memory instances.

###  4.2. <a name='Memorymodel-5'></a>Memory model

HCP was built to re-use as much memory as possible. Protocol *codecs* are not allowed to allocate or deallocate memory during runtime, only when creating a new instance a receive and send buffer are allocated and passed to the new codec instance. 

There are two ways of running HCP - dynamic memory and fixed memory.

####  4.2.1. <a name='Fixedmemory-6'></a>Fixed memory

When running on embedded systems where dynamic memory is not avalible (or not wanted) - , it is possible to use a fixed memory model where the maximum number of *codec* instances and *models* are pre-defined and specified in compile time. In fact, when 
*dynamic memory* isnt setup, HCP defauts to *fixed memory*. 

Only use *fixed memory* mode when its actually needed since its likely to make loading *models* more compilated. 

####  4.2.2. <a name='Dynamicmemory-7'></a>Dynamic memory

By passing *malloc* and *free* functions while setting up a HCP-state this enables the dynamic memory mode where memory is allocated as needed when creating new codec instances. Its recommended to use the dynamic mode if possible. Since no allocation takes place during *encoding* and *decoding*, allowing dynamic memory has no impact on performance.

###  4.3. <a name='Codecs-8'></a>Codecs

HCP does not expose any functionallity to encode or decode messages by itself. That is provided by loading *codec libraries*, each adding support for a different product protocol. The *codec libraries* are loaded dynamically (from a binary on disc (.so, .dll, .dynlib) or statically linked. During a setup face the *codec libraries* are registered at a *state*. Each codec exposes three basic functions:

* Setup - Allocates send and receive buffers that is required to encode and decode messages.
* Encode - A function that converts a *request* into a range of bytes.
* Decode - A function that converts a range of bytes into a *response* object.

Both the *request* and *response* object are C-style structs and this is where the *platform wrappers* that ships with HCP comes in handy since the already contain functionallity for converting the C-struct into a platform specific object, like a dictionary or JSON-object, all depending on the target platform.

###  4.4. <a name='Models-9'></a>Models

A device will expose one or several methods. These methods are expressed in a dynamically loaded object-model which is a JSON-document that describes the required input and output arguments required when sending a method request to a device. The model also contains codec-specific data that allows the codec implementation to be method generic - the object model for the supported methods is NOT expressed in the wrapper, its generated during runtime allowing developers to add and remove support for methods by editing a *.json* file without having to re-compile any code.

####  4.4.1. <a name='Header-10'></a>Header

Each model may contain an optional header. HCP only reads the *protocol* node of a header (if it exists) which is appended to *each method invocation* appended to the method's own protocol node.

```json
{
    "header" : {
        "protocol" : [
            {
                "key" : "useBigEndian",
                "value" : "1"
            }
        ]
    },
    ...
}
```

####  4.4.2. <a name='Types-11'></a>Types

*Not yet documented*

```json
{
    ...
    "types" : [...]
    ...
}
```

####  4.4.3. <a name='Methods-12'></a>Methods

A model contains zero or more methods which when invoked allows the corresponding method to be sent to the connected device. A method (sometimes refered to as *Command*) consists of:

* *Family* - Represents a logical group where associated methods are placed. The family has no other function than to tell the developer what the method targets. It can be thought of as a namespace, class name or groupname.
* *Command* - Describes the action that the method represents; SetCuttingHeight or GetVersionString. The command has no actuall connection to the corresponding functionallity in the connected device, its only relevant when converting a HCP *request* into bytes and back.
* *inParams* - An array of input-parameters that *must* be passed when invoking a method. *See section parameters below*.
* *outParams* - An array of output parameters which is returned when a method is invoked successfully. *See section parameters below*.
* *protocol* - A key-value pair array which is passed to the *codec implementation*. The entries in *protocol* lets the *codec* decide what actual device function to invoke via the device's own protocol. See section *building a protocol* for more details.

Above is a minimal hcp-model that exposes a single method:

```json
{
    "header" : {},
    "types" : [],
    "methods" : [
        {
            "command" : "SetCuttingHeight",
            "family" : "MainBoard",
            "inParams" : [ {
                "name" : "height",
                "type" : "uint8",
                "description" : "Height in millimeters."
            }],
            "outParams" : [{
                "name" : "height",
                "type" : "uint8",
                "description" : "The height that awas actually set."
                }],
            "protocol" : []
        }
    ]
}
```

####  4.4.4. <a name='Parameters-13'></a>Parameters

Parameters is the way HCP passes arguments to and from a codec. Parameters can be either input or output (request/response). Depending on the protocol, the order of which they appear may represent the actual byte-order.

* name - Descriptive name of the parameter.
* description - Description that should describe what the parameter represents, such as CuttingHeight or Timeout.
* type - Value data type, see *supported data types* for complete listing.
* length - When *type* is *byteArray* or *ascii* a lenght must be specified as it defines how many elements the array of string consists of. See *Parameter length* below.
* description - Optional description for developers to give a hint on what the parameter means.

Both *inParams* and *outParams* follows the definition above.

***
```
Warning(!!!): Do not change the order of the parameters in the JSON file since the order might* represent the order in which the bytes are written when *encoding* or *decoding*. 
```
***

##### Supported data types

The following types are (or will soon be) supported in HCP:

| Name | Implemented | Actual type | Byte size |
| ---- | ----------- | ----------- | --------- |
| double | No | double | 8 |
| float | No | float | 4 |
| bool | Yes | unsigned char | 1 |
| size_t | Yes | uint32 on x86, uint64 on x64 | 4 or 8 |
| uint8 | Yes | unsigned char | 1 |
| sint8 | Yes | char | 1 |
| uint16 | Yes | unsigned short | 2 |
| sint16 | Yes | short | 2 |
| uint32 | Yes | unsigned int | 4 |
| sint32 | Yes | int | 4 |
| uint64 | Yes | unsigned long | 8 |
| sint64 | Yes | long | 8 |
| ascii | Yes | char* | dynamic |
| tUnixTime | Yes | unsigned int | 4 |
| tSimpleVersion | Yes | unsigned int | 2 |
| byteArray | Yes | unsigned char* | dynamic |

##### Parameter length

Each parameter, both in and out, can be assigned a length attribute. The value is ignored for primitive types, (u/s-int 8-64), but the complex types *byteArray* and *ascii*, its mandatory.

| Type | Length | Meaning |
| ---- | ----------- | ----------- |
| ascii | -1 | This can only be applied to a string which is the last parameter in a list. Setting a string length to -1 indicates that every remaning byte belongs to the string. Setting a non-last parameter to -1 causes a undefined behavoir. 
| ascii | 0 | Zero terminated string, all remaning bytes in a response or request, until the first encountered 0 belongs to the string. |
| ascii | N | Positive value specifies exactly how many characters that the string consists of. |
| byteArray | N | Positive value, specifies the maximum number of bytes that the array may consist of. | 
|

###  4.5. <a name='Examplemodels-14'></a>Example models

####  4.5.1. <a name='Singlemethodnoin-orout-params.-15'></a>Single method, no in-or out-params.

```json
{
    "header" : {},
    "types" : [],
    "methods" : [
        {
            "command" : "Ping",
            "family" : "Test",
            "description" : "Keep-alive. A response indicates that the device still is connected.",
            "inParams" : [],
            "outParams" : [],
            "protocol" : []
        }
    ]
}
```

####  4.5.2. <a name='Singlemethodsinglein-orout-param.-16'></a>Single method, single in-or out-param.

```json
{
    "header" : {},
    "types" : [],
    "methods" : [
        {
            "command" : "SetCuttingHeight",
            "family" : "MainBoard",
            "inParams" : [ {
                "name" : "height",
                "type" : "uint8",
                "description" : "Height in millimeters."
            }],
            "outParams" : [{
                "name" : "height",
                "type" : "uint8",
                "description" : "The height that awas actually set."
                }],
            "protocol" : []
        }
    ]
}
```

####  4.5.3. <a name='Singlemethodmultiplein-orout-param.-17'></a>Single method, multiple in-or out-param.

```json
{
    "header" : {},
    "types" : [],
    "methods" : [
        {
            "command" : "GetDeviceInfo",
            "family" : "MainBoard",
            "inParams" : [ {
                "name" : "module",
                "type" : "string",
                "description" : "Name of the module to get info about.",
                "length" : 0
            }],
            "outParams" : [
                {
                    "name" : "version",
                    "type" : "uint32",
                    "description" : "Firmware version."
                },
                {
                    "name" : "name",
                    "type" : "ascii",
                    "length" : 35,
                    "description" : "Descriptive name."
                },
                {
                    "name" : "statusCode",
                    "type" : "sint32",
                    "description" : "Device status code."
                },
                {
                    "name" : "currentTime",
                    "type" : "tUnixTime",
                    "description" : "Current time of the device."
                },
                {
                    "name" : "signature",
                    "type" : "byteArray",
                    "length" : 20,
                    "description" : "Device encryption signature. Used when sending encrypted messages to the device."
                }
            ],
            "protocol" : []
        }
    ]
}
```

####  4.5.4. <a name='Multiplemethodsmultiplein-orout-param.-18'></a>Multiple methods, multiple in-or out-param.

```json
{
    "header" : {},
    "types" : [],
    "methods" : [
        {
            "command" : "Ping",
            "family" : "Test",
            "description" : "Keep-alive. A response indicates that the device still is connected.",
            "inParams" : [],
            "outParams" : [],
            "protocol" : []
        },
        {
            "command" : "SetCuttingHeight",
            "family" : "MainBoard",
            "inParams" : [ {
                "name" : "height",
                "type" : "uint8",
                "description" : "Height in millimeters."
            }],
            "outParams" : [{
                "name" : "height",
                "type" : "uint8",
                "description" : "The height that awas actually set."
                }],
            "protocol" : []
        },
        {
            "command" : "GetDeviceInfo",
            "family" : "MainBoard",
            "inParams" : [ {
                "name" : "module",
                "type" : "string",
                "description" : "Name of the module to get info about.",
                "length" : 0
            }],
            "outParams" : [
                {
                    "name" : "version",
                    "type" : "uint32",
                    "description" : "Firmware version."
                },
                {
                    "name" : "name",
                    "type" : "ascii",
                    "length" : 35,
                    "description" : "Descriptive name."
                },
                {
                    "name" : "statusCode",
                    "type" : "sint32",
                    "description" : "Device status code."
                },
                {
                    "name" : "currentTime",
                    "type" : "tUnixTime",
                    "description" : "Current time of the device."
                },
                {
                    "name" : "signature",
                    "type" : "byteArray",
                    "length" : 20,
                    "description" : "Device encryption signature. Used when sending encrypted messages to the device."
                }
            ],
            "protocol" : []
        }
    ]
}
```

####  4.5.5. <a name='Singlemethodmultipleinputsingleoutputparameter-19'></a>Single method, multiple input, single output parameter

```json
{
    "header" : {},
    "types" : [],
    "methods" : [
        {
            "command" : "SetCuttingHeight",
            "family" : "MainBoard",
            "description" : "Sets the cutting height. If autoAdjust is true, the height parameter is considered a max value and the actual height is determined by the estimated gras height.",
            "inParams" : [
                {
                    "name" : "height",
                    "type" : "uint16",
                    "description" : "Height in millimeters."
                },
                {
                    "name" : "autoAdjust",
                    "type" : "boolean",
                    "description" : "Determines if the height should be automatically determined."
                }
            ],
            "outParams" : [
                {
                    "name" : "uint16",
                    "type" : "height",
                    "description" : "The height that was actually set."
                }
            ],
            "protocol" : []
        }
    ]
}
```


###  4.6. <a name='Requests-20'></a>Requests

To execute/invoke a method defined in a *model* a *request* is created. Requests are expressed as strings which consists of:

* Family - Group/family/namespace that the method is related to.
* Command - Name of the method to execute (yes, command and method are the same thing).
* Arguments - Comma separated list of arguments. Where the argument name and value is separated by a colon, name:value.

```swift
//     Separator       Start of args              Value  0-N spaces
//       |                |                          |     |
MainBoard.SetCuttingHeight(height:15, autoAdjust:   false      )
//  |            |           |      |                          |
//Family      Command   Arg name  Arg separator               End
```

####  4.6.1. <a name='Requestrules-21'></a>Request rules

* Family - Must start with a character, may only contain characters and numbers. *Regex [a-zA-Z]+[a-zA-Z0-9]*.
* . - Separates family and command. No proceeding or trailing space is allowed. "Family . Command" will fail.
* Command -  Must start with a character, may only contain characters and numbers. *Regex [a-zA-Z]+[a-zA-Z0-9]*.
* ( - Start of argument list. May not be proceeded by a space.
* Arguments - None or many arguments, separated by a ','. May be proceede by none or multiple spaces.
  * Name - Name of the argument which corresponds to a parameter name in the input parameter-node of a method. Must start with a character, may only contain characters and numbers. *Regex [a-zA-Z]+[a-zA-Z0-9]*.
  * : - Separates name and value, may be proceeded by non or multiple spaces.
  * Value - Boolean, number, string or byte-array. Represents the value of the argument. Accepted syntax is determined by the data type. See the *value types* below.
While the way a request is sent may differ depending on what platform HCP is used, the *request string* is always the same since its parsed by the HCP runtime.

The parameters may appear in any order and the developer is required to pass values to ALL parameters that appears in the *inParams*-section of a method.

##### ASCII - strings

ASCII (string) parameters can be passed in to formats, enclosed in "" and not:

```Lua
MainBoard.SetDisplayName(name:Hello!);
```

```Lua
MainBoard.SetDisplayName(name:"Hello world!");
```

A string that is *NOT* enclosed in " cannot contain any spaces. Is is recommended to always enclose ascii-paramets in " for clarity.

##### Byte arrays

Byte arrays is passed by converting each byte-value into a two character hex representation:

Passing the byte array [0, 10, 30, 50, 80, 140, 180, 255] would like this:

 ```JSON
MainBoard.WriteMemoryArea(start:0xFFFF, data:000A1E32508CB4FF);
```

Binary values can be enclosed in ", so this is also valid:

```JSON
MainBoard.WriteMemoryArea(start:0xFFFF, data:"000A1E32508CB4FF");
```

##  5.1. <a name='Codeclibrary-22'></a>Codec library

A codec or codec library is a external binary (.so, .dll or .dynlib) which enables *hcp-requests* to be converted into bytes and bytes to be converted into a *result object*. From a codec library, multiple *codec instances* is created, each with its own memory buffer used when encoding and decoding bytes. Hcp was built around the design idea that *codec libraries* is dynamically loaded and added (plugin behavoir), platform independent and preferably developed and maintained by the product owner.

###  5.1. <a name='Tutorial-23'></a>Tutorial

In this tutorial we will cover how we intended codec libraries to be created.

####  5.1.1. <a name='Requiredtools-24'></a>Required tools

To test and run the codec library we will use the Node.JS wrapper located under /node. Make sure to download the latest *LTS version* of (Node.JS|<https://nodejs.org/en/download/>). For IDE and debugger we use (Visual Studio Code|<https://code.visualstudio.com/>).

####  5.1.2. <a name='Folderstructure-25'></a>Folder structure

All files for this tutorial is located under /codecs/example.

* /include - Codec header files.
* /src - Codec source files.
* /test - Test scripts that we use when building the codec.
* / - Build files (make and nmake files) to build the codec into a platform specific binary.
* /resources - Images used for this tutorial.

##### Makefile

We begin by setting up a makefile.

```Makefile

CFLAGS := -fPIC -O3 -g -Wall -Werror
CC := gcc
NAME := example-codec

lib: $(NAME).so

$(NAME).so: $(NAME).o
	$(CC) -shared -Wl,-soname,$(NAME).so $^ -o $@

clean:
	$(RM) *.o *.so*

```
##### Include file

Codec libraries are required to export a function called *
