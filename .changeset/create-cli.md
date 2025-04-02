---
'@lg-tools/create': minor
'@lg-tools/cli': minor
---

- Newly created `tsconfig.json` files will now take the scope into account, and update the references accordingly.
- Root sub-component directory will now take `--parent` option into account (no longer need to specify `--directory` as well as `--parent`)
- Adds `-dry` flag for dry runs
- Improves verbose logging