---
'@lg-tools/build': patch
'@lg-tools/cli': patch
---

Refactored lg and lg-build scripts to share build command registration logic, ensuring consistent options and argument handling which fixes an issue where lg-build tsc was not processing args (e.g. --verbose) correctly. Also removed the unused --direct option from the build commands/scripts.
