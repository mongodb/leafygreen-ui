---
'@lg-tools/build': minor
---

- Upgrades to TS 5.8. 
- Adds `--downlevel` option for `build-ts`. This option exports downleveled `*.d.ts` files for a defined set of targets. 
Updates a package's `package.json` if necessary `--update` flag is provided.
This uses [downlevel-dts](https://github.com/sandersn/downlevel-dts) under the hood.
