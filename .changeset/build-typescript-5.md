---
'@lg-tools/build': minor
---

- Upgrades to TS 5.0. 
- Adds `--downlevel` option for `build-ts`. This option exports downleveled `*.d.ts` files for a defined set of targets. Updates a package's `package.json` if necessary.
This uses [downlevel-dts](https://github.com/sandersn/downlevel-dts) under the hood.
