@REM running all app level instance
@REM run app.cmd in your windows terminal
@REM [app.cmd start] - starting new app instance fe & be 
@REM [app.cmd stop]  - stoping all app instance 
@REM [app.cmd install]  - install all required packages 

@echo off

set COMMAND=%1

if "%COMMAND%"=="start" (
    echo Starting the npm project...
    cd api
    start "" npm run dev
    cd ../fe
    start "" npm run dev
    echo check another terminal window please...
) else if "%COMMAND%"=="stop" (
    echo Stopping all running instance...
    taskkill /f /im node.exe > nul 2>&1
) else if "%COMMAND%"=="install" (
    echo Preparing to install cuymodoro dependencies...
    cd api
    start "" npm install -y
    cd ../fe
    start "" npm install -y
) else (
    echo Invalid COMMAND. Please provide either "start" or "stop".
)