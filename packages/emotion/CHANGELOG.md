# @leafygreen-ui/emotion

## 3.0.1

### Patch Changes

- dac3f38b: Fixes a publishing error that prevented UMD modules from being distributed

## 3.0.0

### Major Changes

- 0267bfd2: The underlying structure of distributed module definition files have changed and now have official support for ES modules. Module definition files are now generated using Rollup instead of Webpack. This should not affect functionality, but some thorough testing and caution should be exercised when upgrading.

## 2.0.2

### Patch Changes

- 691eb05: Better support for UMD

## 2.0.1

### Patch Changes

- bd3bcd9: Makes `create-emotion-server` an external dependency of the build

## 2.0.0

### Major Changes

- 464c09d: Introduces SSR compatibility though a change to our build process and files
