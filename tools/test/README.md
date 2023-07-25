# `@lg-tools/test`

Shared test config & scripts for LeafyGreen repositories.

## Usage

It's best not to use this as a standalone package, but use it as part of `@lg-tools/cli` instead.

To run tests using the shared config, use the `lg` cli:

```bash
> lg test
```

### Options

To see all options for this command run:

```bash
> lg test --help
```

### Extending & overriding the shared config

To extend/override the shared config (located in `@lg-tools/test/config`), create a `jest.config.js` file at the root of the repository, and extend the default config with the code below:

```js
// ./jest.config.js
const jestConfig = require('@lg-tools/test/config/js.config.js');

module.exports = {
  ...jestConfig,
  // extend your jest config here
};
```

You can also pass a `--config` option to the test command:

```bash
> lg test --config ./path/to/config
```
