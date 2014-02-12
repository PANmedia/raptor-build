echo Raptor Builder

where php 1> %~dp0\..\temp\output.txt 2> NUL
if not %ERRORLEVEL% == 0 (
    echo Could not find PHP executable.
    exit /b 1
)

set /p PHP=<%~dp0\..\temp\output.txt
del %~dp0\..\temp\output.txt
echo Found PHP at %PHP%
