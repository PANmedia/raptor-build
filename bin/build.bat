@echo off
pushd %~dp0\..
call npm install
call node build\build.js build -c %*
popd
