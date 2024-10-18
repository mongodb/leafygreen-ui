---
'@lg-tools/validate': minor
---

Updates `devFilePatterns`, and will exclude all files in `test/` `testing/` or `test-utilities/` directories from explicit dep. checks. i.e. Files in these directories will only need to have their imports listed s `devDependencies` in the `package.json`
