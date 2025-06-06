#!/bin/bash
# lg-build can't use itself as a dependency in the build process
rollup -c ./rollup.config.mjs
exit 0
