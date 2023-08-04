---
'@lg-tools/build': minor
'@lg-tools/cli': minor
---

Updates `build` package to use Rollup's JS API rather than spawning rollup using the command line. This gives us more control over the build, and we don't need to worry about the path of the `rollup` binary in consuming ap
plications
