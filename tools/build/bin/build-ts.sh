#!/bin/bash
# Build TypeScript files using the TypeScript CLI directly.
# We build this from a .sh script, since `tsc` doesn't take the same flags as our 
# build-ts command. As a result, when trying to build with our custom flags, running this command directly will fail.
tsc --build tsconfig.json
exit 0