#!/bin/sh

# $1 the first argument after the command is the relative path to the client

if [ "$1" != "" ]; then
    # ARRAY=()
    # for d in packages/*; do
    #     echo $d
    # done
    npm run bootstrap && \
    npm run link && \
    {
        npm run build
        } || {
            npm run bootstrap
            } && \
    npm run build && \
    cd $1 && \
    npm link @leafygreen-ui/Button
else
    echo "Client Folder Path is empty"
fi
