#!/bin/sh

# Define flags to exclude
excluded_flags="--downlevel --update"

# Filter out excluded flags
filtered_args=""
for arg in "$@"; do
  case " $excluded_flags " in
    *" $arg "*)
      # Skip excluded flag
      ;;
    *)
      filtered_args="$filtered_args $arg"
      ;;
  esac
done

# lg-build can't use itself as a dependency in the build process
tsc --build tsconfig.json $filtered_args
exit 0