---
'@lg-tools/build': minor
---

Added a new exported `modernDevProdConfig` Rollup configuration, designed for component packages.

This configuration generates both minified and non-minified bundles to support production and development environments respectively. Please update the `exports` field in your `package.json` to include a `browser.production` entry for both `import` and `require` that points to the minified bundle (`[bundle-name]-min.js`). This ensures that consumers’ build tools use the optimized, minified bundle in production automatically.

The charts/legend package is the initial adopter of this configuration and is a good example of how to use this new configuration.