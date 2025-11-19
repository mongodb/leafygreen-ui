---
'@lg-tools/build': minor
'@lg-tools/cli': minor
---

Introduced new `lg build-minify` and `lg-build minify` commands to separately minify JavaScript bundle files. 
Files to be minified can be specified using the `--glob` argument (default: `--glob=dist/**/*.*js --glob=!dist/**/*-min.*js`). 
This allows generating both minified and non-minified bundles in the same package for use in different environments, decoupling minification from the main build process.