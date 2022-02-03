# v3 to v4

v3.3 and above of the palette package contains the updated palette for the brand refresh. In v4, the old palette is removed entirely from this package.

## Imports

### JS

The named export for the new palette has changed from `uiColors` to `palette`. You'll need to import the new colors like so:

```js
import { palette } from '@leafygreen-ui/palette';
```

### Less

The name of the included `.less` variables file has changed from 'ui-colors.less' to `palette.less`. You'll need to import the new file like so:

```less
@import '<path to node_modules>/@leafygreen-ui/palette/dist/palette.less';
```

## Color Variables

### JS

The name and structure of the JS variables is largely unchanged. Here are the notable changes:

- The `focus` variable has been removed. It's recommended to update usage of this color to `palette.blue.light1`.
- The `palette.red.dark1` variable has been removed. It's recommended to update usage of this color to `palette.red.dark2`.
- We've added a new `palette.green.light1` color.
- We've added a new `palette.blue.dark2` color.
- We've added a new `palette.red.light1` color.
- We've added purple to the palette. You can find `dark3`, `dark2`, `base`, `light2`, and `light3` values for the color.

### Less

There's a number of notable changes to the Less variables that are available.

- All variables have moved from a `@leafygreen__[color name]` format to a `@palette__[color name]` format.
- The `@leafygreen__focus` variable has been removed. It's recommended to update usage of this color to `@palette__blue--light-1`.
- The `@leafygreen__red--dark-1` variable has been removed. It's recommended to update usage of this color to `@palette__red--dark-2`.
- We've added a new `@palette__green--light-1` color.
- We've added a new `@palette__blue--dark-2` color.
- We've added a new `@palette__red--light-1` color.
- We've added purple to the palette. You can find `dark-3`, `dark-2`, `base`, `light-2`, and `light-3` values for the color.

## Color Changes

Nearly every color in the palette has been changed to some extent. You'll notice colors are more vibrant all around, though many are compatible with the usage of the previous colors. Here are the most notable changes:

- The new Base Green is lighter, and more vibrant than the previous Base Green (`uiColors.green.base` / `@leafygreen__green--base`). For a 1:1 update, we recommend changing instances of that green to Green: Dark 1 (`palette.green.dark1` / `@palette__green--dark-1`).
- The range of blues available are much more vibrant. While the color contrast should remain largely compatible with the previous blues, we recommend checking instances of Base Blue in particular for any visual oddities.

We recommend visually checking that the new colors make sense in all cases when upgrading, regardless of similarity to the previous palette. For any questions about the color update, please reach out to a product designer working with your team.
