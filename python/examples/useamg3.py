
import hcp_python
#print ("ho ho")

def testAmg3() : 
    codecPath = "/Users/jonas/dev/husqvarna/cmake_ninja/hcprobotics"
    modelPath = "/Users/jonas/dev/husqvarna/hcprobotics/models/_AMG3-Debug.json"
    state = hcp_python.NewState(codecPath)
    hcp_python.GetCodecNames()
    with open(modelPath, 'r') as modelFile:
        model=modelFile.read()

    mid = hcp_python.LoadModel(state,model)
    cid = hcp_python.NewCodec(state,"amg3",mid)

    command = "DeviceInformation.GetMmiInformation()"
    data, len = hcp_python.Encode(state,cid,command)
    elem, rec = hcp_python.Decode(state,cid,data)

    print("Family: " + elem.family)
    print("Command: " + elem.command)
    hcp_python.CloseCodec(state,cid)
    hcp_python.CloseState(state)


#testAmg3()
