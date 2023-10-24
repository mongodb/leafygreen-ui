# eslint-plugin-leafygreen

Lint Rules for LeafyGreen UI

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
yarn add -D eslint
```

Next, install `@lg-tools/eslint-plugin`:

```sh
yarn add -D @lg-tools/eslint-plugin
```

## Usage

Add `@lg-tools` to the plugins section of your `.eslintrc` configuration file. (You can omit the `/eslint-plugin` suffix):

```json
{
  "plugins": ["@lg-tools"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@lg-tools/some-rule": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->

## Contributing

To create a new rule, first run the `create-rule` script

```sh
yarn workspace @lg-tools/eslint-plugin run create-rule <rule-name>
```

or, with npm:

```sh
cd tools/eslint-plugin && npm run create-rule <rule-name>
```
