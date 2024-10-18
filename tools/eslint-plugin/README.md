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
  "plugins": ["@lg-tools"],
  "extends": ["plugin:@lg-tools/internal"]
}
```

Optionally configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@lg-tools/some-rule": ["warn"]
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

⚠️ Configurations set to warn in.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                     | Description                                                              | ⚠️                  | 🔧  | 💡  |
| :------------------------------------------------------- | :----------------------------------------------------------------------- | :------------------ | :-- | :-- |
| [boolean-verb-prefix](docs/rules/boolean-verb-prefix.md) | Enforce prefixing boolean variables & properties with a conditional verb | ![badge-internal][] |     | 💡  |
| [no-indirect-imports](docs/rules/no-indirect-imports.md) | Forbid indirect imports from `src/` or `packages/`                       | ![badge-internal][] | 🔧  |     |
| [standard-testid](docs/rules/standard-testid.md)         | Enforce a consistent prefix for hard-coded `data-testid` attributes      | ![badge-internal][] | 🔧  |     |

<!-- end auto-generated rules list -->

## Contributing

To create a new rule:

### 1. Run the `create-rule` script

```sh
yarn workspace @lg-tools/eslint-plugin run create-rule <rule-name>
```

or, with npm:

```sh
cd tools/eslint-plugin && npm run create-rule <rule-name>
```

This will create a new file in `src/rules`, and a test file in `src/tests`

### 2. Add AST Listeners

Inside your new `src/rules/<my-rule>.ts` file, add the appropriate metadata, and write AST listeners.

The return object of a rule's `create` method should return at least one AST listener.

These work similar to CSS selectors, and run a function when the ESLint static analyzer hits a specific AST node.

See [ESLint Docs](https://eslint.org/docs/latest/extend/custom-rules) for more details.

```ts
export const exampleRule = createRule({
  // ...
  create: context => {
    return {
      VariableDeclaration: node => {
        // Executes on any variable declaration
        // e.g. const myVar = 5;
      },
    };
  },
});
```

## 3. Add tests

Inside the new `src/test/<my-rule>.spec.ts` file, add valid and invalid test cases.

See [ESLint RuleTester docs](https://eslint.org/docs/latest/integrate/nodejs-api#ruletester) for more details.

### Useful Resources

- [ESLint Docs](https://eslint.org/docs/latest/extend/custom-rules)
- [ESLint RuleTester](https://eslint.org/docs/latest/integrate/nodejs-api#ruletester)
- [ESTree Spec](https://github.com/estree/estree/blob/master/README.md)
- [JSX Spec](https://github.com/facebook/jsx/blob/main/README.md)
- [TSESLint Listener Definitions](https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/utils/src/ts-eslint/Rule.ts#L293)
