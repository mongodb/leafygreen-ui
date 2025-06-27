# `@lg-tools/storybook-addon`

Storybook addon to share configuration in LeafyGreen repositories.

## Usage

Install this package, and consume it in your `.storybook/` config files.

```ts
// .storybook/main.ts
export default {
  addons: ['@lg-tools/storybook-addon'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {
      fastRefresh: true,
      strictMode: true,
    },
  },
};
```

## Features

### Theme Toggle

This addon includes a theme toggle button in the Storybook toolbar that allows you to switch between light and dark themes.

- Click the sun/moon icon in the toolbar to toggle themes
- Use the keyboard shortcut `T` to toggle themes
- The theme state is global and persists across all stories

For more details, see [README-THEME-TOGGLE.md](./README-THEME-TOGGLE.md)

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
