# `@lg-tools/storybook`

Shared Storybook configuration for LeafyGreen repositories.

##

Install this package, and consume it in your `.storybook` config files.

```js
// .storybook/main.ts

import main from '@lg-tools/storybook';
export default main;
```

```js
// .storybook/manager.js
import { addons } from '@storybook/addons';

import theme from '@lg-tools/storybook/theme';

addons.setConfig({
  name: 'LeafyGreen UI',
  theme,
});
```
