@echo off
setlocal EnableDelayedExpansion

call %~dp0\find-php.bat
if %ERRORLEVEL% == 0 (
    set /p AREYOUSURE=Are you sure, this is delete local Raptor repositories (Y/[N])?
    if /i "%AREYOUSURE%" neq "Y" goto end

    %PHP% %~dp0\reset.php
)


:end
