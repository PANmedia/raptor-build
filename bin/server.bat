@echo off
setlocal EnableDelayedExpansion

call %~dp0\find-php.bat
if %ERRORLEVEL% == 0 (
    %PHP% -S 0.0.0.0:3000 -t %~dp0\.. %~dp0\server.php
)
