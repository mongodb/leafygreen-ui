#!/bin/bash

# Define an array of flags to exclude
excluded_flags=("--downlevel" "--update")

# Filter out excluded flags
filtered_args=()
for arg in "$@"; do
  [[ " ${excluded_flags[*]} " =~ " ${arg} " ]] || filtered_args+=("$arg")
done


# lg-build can't use itself as a dependency in the build process
tsc --build tsconfig.json "${filtered_args[@]}"
exit 0