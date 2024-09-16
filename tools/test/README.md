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

### Testing in React 17

In CI we test our components using React 17.

To do this manually, first run the [init script](./scripts/install-react17.ts) in order to install the specific testing dependencies needed for React 17. (`yarn init17` from the repo root)

```bash
> yarn init17
```

Next, run your tests with the `--react17` flag. This ensures that the tests are run with specific Jest config for React 17.

```bash
> yarn test --react17
```
