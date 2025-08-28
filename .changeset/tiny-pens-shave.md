---
'@lg-tools/validate': minor
---

Validate script no longer fails if a package is missing a `devDependency`. This was done due to a significant number of false positives, and since using `pnpm` to resolve packages should flag the true missing `devDeps` in the build, test, or stories step
