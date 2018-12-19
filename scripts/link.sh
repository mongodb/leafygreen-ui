#!/bin/sh
set -e
# $1 the first argument after the command is the relative or absolute path to the client
# directory, where you intend to run npm link on installed UI-Kit modules.
# To run, navigate to your leafygreen-ui folder root, then in the shell run
# bash scripts/link.sh ${PATH_TO_APPLICATION}

if [ "$1" != "" ]; then
    npm run bootstrap
    npm run link
    cd ./packages/lib
    npm run build
    cd ../theme
    npm run build
    cd ../../
    npm run build
    cd $1
    {
        cd ./node_modules/@leafygreen-ui
    } || {
        echo "The application either does not have it's node_modules installed or does not have leafygreen-ui components installed"
        exit 1
    }
    INSTALLED_PACKAGES_ARRAY=()
    for d in *; do
        echo $d
        INSTALLED_PACKAGES_ARRAY+=($d)
    done
    cd ../../
    for f in "${INSTALLED_PACKAGES_ARRAY[@]}"; do
        npm link @leafygreen-ui/$f
    done
else
    echo "This script requires a path to the target application from the root folder of this repository."
    echo "After the bash command, please add a relative or absolute path to the repository of your application where you run your node_modules are located"
fi
