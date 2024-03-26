# @leafygreen-ui/emotion

## 4.0.8

### Patch Changes

- 356a53fd: Update TS builds to use `typescript@4.9.5`

## 4.0.7

### Patch Changes

- c11bbc29: Fixes problem with ts-docs not being available in bundle.

## 4.0.6

### Patch Changes

- c15ee2ac: Fixes missing documentation file

## 4.0.5

### Patch Changes

- 215268ff: Updates build tooling. No functional changes

## 4.0.4

### Patch Changes

- 8c0c2bdf9: Updates build script to include a transpiled copy of the story file in the bundle

## 4.0.3

### Patch Changes

- 24683433: - Remove an implicit dependency on `@emotion/react` fixing an issue where LG packages would not build if `@leafygreen/emotion@4.0.2` or greater was installed.

## 4.0.2

### Patch Changes

- 3690df49: Updates `tsdoc.json` file

## 4.0.1

### Patch Changes

- 8d7534e9: Adds `tsdoc.json` to published package files

## 4.0.0

### Major Changes

- f6e5655a: Upgrades to emotion v11. See (Emotion Docs)[https://emotion.sh/docs/emotion-11] for more on this version. Additionally, updates where leafygreen styles are injected into the `head` element.

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
