# `@lg-tools/storybook`

Storybook addon to share configuration in LeafyGreen repositories.

## Usage

Install this package, and consume it in your `.storybook/` config files.

```ts
// .storybook/main.ts
export default {
  addons: ['@lg-tools/storybook'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
};
```

Most parameters `preview.ts` will be automatically populated by the addon. However you may want to customize certain things like section ordering:

```js
// .storybook/preview.js
const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        // ... section headers
      ],
    },
  },
};

export default {
  parameters,
};
```
