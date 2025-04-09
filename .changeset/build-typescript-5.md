---
'@lg-tools/build': minor
---

- Upgrades to TS 5.0. 
- Adds `--downlevel` option for `build-ts`. This option reads a package's package.json and exports downleveled `*.d.ts` files for all targets listed in `"typesVersions"`. This uses [downlevel-dts](https://github.com/sandersn/downlevel-dts) under the hood.
