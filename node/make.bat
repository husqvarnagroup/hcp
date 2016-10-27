call node-gyp clean
call node-gyp configure
call node-gyp build

@echo off

IF NOT EXIST package mkdir package
cd package
IF NOT EXIST lib mkdir lib
cd lib
IF NOT EXIST bin mkdir bin
cd bin
IF NOT EXIST x64 mkdir x64
cd x64

copy .\..\..\..\..\build\Release\hcp.node /Y
cd ..\..\..\..\

cd package
call npm install
call tsd install
call tsc

IF NOT EXIST release mkdir release
cd release
IF NOT EXIST lib mkdir lib
cd lib
IF NOT EXIST bin mkdir bin
cd bin
IF NOT EXIST x64 mkdir x64
cd x64

copy .\..\..\..\..\..\build\Release\hcp.node /Y

cd ..\..\..\..\
copy package-npm.json release\package.json /Y
cd ..

echo "done!"
@echo on