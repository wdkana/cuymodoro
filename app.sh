#!/bin/bash
# for unix environtment
# use git bash if you are using windows operating system
# [app.sh start] - starting new app instance fe & be 
# [app.sh stop]  - stoping all app instance 
# [app.sh install]  - install all required packages 

COMMAND=$1

if [ "$COMMAND" = "start" ]; then
    echo "Starting the npm project..."
    cd api
    start "" npm run dev
    cd ../fe
    start "" npm run dev
    echo "check another terminal window please..."
elif [ "$COMMAND" = "stop" ]; then
    echo "Stopping all running instance..."
    pkill -f "node"
elif [ "$COMMAND" = "install" ]; then
    echo "preparing cuymodoro project..."
    cd api
    start "" npm install -y
    cd ../fe
    start "" npm install -y
else
    echo "Invalid COMMAND. Please provide either 'start' or 'stop'."
fi