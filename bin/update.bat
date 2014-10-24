@echo off
setlocal EnableDelayedExpansion

call %~dp0\find-php.bat
if %ERRORLEVEL% == 0 (
    %PHP% %~dp0\update.php
)
