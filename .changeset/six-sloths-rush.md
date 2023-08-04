---
'@lg-tools/storybook': minor
---

Updates `storybook` package to be a Storybook addon.

#### Usage
1. Install 
```bash
> yarn add @lg-tools/storybook@latest
```

2. Add to `./storybook/main.ts`
```ts
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
