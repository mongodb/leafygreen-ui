#!/bin/sh
set -e
# $1 the first argument after the command is the relative or absolute path to the client
# directory, where you intend to run pnpm link on installed UI-Kit modules.
# To run, navigate to your leafygreen-ui folder root, then in the shell run
# pnpm run link -- ${PATH_TO_APPLICATION}

if [ "$1" == "" ]; then
    echo "This script requires a path to the target application from the root folder of this repository."
    echo "After the bash command, please add a relative or absolute path to the repository of your application."
    exit 1
fi
echo `dirname $1`
LEAFYGREEN_HOME=$(pwd)/`dirname $0`/../
echo $LEAFYGREEN_HOME
cd $LEAFYGREEN_HOME
APPLICATION_HOME=$1
if cd $APPLICATION_HOME/node_modules/@leafygreen-ui; then
    echo "leafygreen modules successfully found"
else
    echo "The application either does not have its node_modules installed or does not have leafygreen-ui components installed"
    exit 1
fi
INSTALLED_PACKAGES_ARRAY=()
for d in *; do
    if [ "$d" != "lib" ]; then
        INSTALLED_PACKAGES_ARRAY+=($d)
    fi
done
cd $LEAFYGREEN_HOME
pnpm
set +e
pnpm run link:all
set -e
cd $LEAFYGREEN_HOME
# Add `--no-build` to the end of the command to skip the build step
if [$2 != "--no-build"]; then
    pnpm build
fi
cd $APPLICATION_HOME
for f in "${INSTALLED_PACKAGES_ARRAY[@]}"; do
    pnpm link @leafygreen-ui/$f
done

exit 0;
