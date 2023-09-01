---
'@lg-tools/build': minor
---

Adds the regex `^@lg-[a-z]+\/` to rollup's `external` property. This tells rollup to treat any `@lg-*` scoped package as external, and to not bundle it into the package.
