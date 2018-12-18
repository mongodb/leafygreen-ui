#!/bin/sh

if [ "$1" != "" ]; then
    npm run bootstrap && \
    npm run link && \
    {
        npm run build
        } || {
            npm run bootstrap
            } && \
    npm run build && \
    cd ../$1 && \
    npm link @leafygreen-ui/Button
else
    echo "Client Folder Path is empty"
fi
