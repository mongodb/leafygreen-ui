#!/bin/bash
# lg-build can't use itself as a dependency in the build process
tsc --build tsconfig.json
exit 0