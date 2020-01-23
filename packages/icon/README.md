# Icon

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/icon.svg)

## Installation

`yarn install @leafygreen-ui/icon`

## Example

```js
import Icon from '@leafygreen-ui/icon';

const SomeComponent = () => <Icon glyph="Plus" fill="#FF0000" />;
```

**Output HTML**

```HTML
<svg width="16" height="16" role="img" viewBox="0 0 16 16" class="leafygreen-ui-yqbynm">
	<title>Plus Icon</title>
	<path d="M9 7h4v2H9v4H7V9H3V7h4V3h2v4z" fill="currentColor" fill-rule="evenodd"></path>
</svg>
```

## Properties

| Prop    | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Description                                                                                                                                  | Default     |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `glyph` | **Required**: `'Copy'`, `'Bell'`, `'Building'`, `'CaretUp'`, `'CaretDown'`, `'CaretRight'`, `'CaretLeft'`, `'Checkmark'`, `'CheckmarkWithCircle'`, `'ChevronUp'`, `'ChevronDown'`, `'ChevronRight'`, `'ChevronLeft'`, `'Charts'`, `'Cloud'`, `'CreditCard'`, `'Edit'`, `'Ellipsis'`, `'InfoWithCircle'`, `'Laptop'`, `'Lock'`, `'MagnifyingGlass'`, `'Menu'`, `'NotAllowed'`, `'Person'`, `'PersonWithLock'`, `'Plus'`, `'PlusWithCircle'`, `'QuestionMarkWithCircle'`, `'Refresh'`, `'Save'`, `'Settings'`, `'Stitch'`, `'Support'`, `'Trash'`, `'Warning'`, `'X'`, `'XWithCircle'` | Specifies the glyph to use.                                                                                                                  |             |
| `size`  | `string` or `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | The height and width of the glyph's viewBox. This can be any `number` or one of the following `'small'`, `'default'`, `'large'`, `'xlarge'`  | `'default'` |
| `fill`  | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | The fill color that is passed to the glyph. By default, the glyph will inherit its fill from the CSS color property of its nearest ancestor. |             |

## Advanced Usage (Registering custom icon sets)

This package exposes a method used to generate a custom version of the Icon component with any specified set of icons.

```js
// Import the createIconComponent method from the Icon package
import { createIconComponent } from '@leafygreen-ui/Icon';

// Create your 'glyphs' object. For each key / value pair, the key will be the name of the icon,
// and the value can be any valid React component.
const myGlyphs = {
  MyCustomGlyph: () => <svg />,
};

// The createIconComponent function returns your custom Icon component.
const MyIconComponent = createIconComponent(myGlyphs);

// Your icon is now ready to use!
const SomeComponent = () => (
  <div>
    <Icon glyph="MyCustomGlyph" />
  </div>
);
```

We also export the default icon set for you! If you want to include our glyphs with your custom glyphs, you can do something like this:

```js
import { createIconComponent, glyphs } from '@leafygreen-ui/Icon';

const myGlyphs = {
  ...glyphs,
  MyCustomGlyph: () => <svg />,
};

const MyIconComponent = createIconComponent(myGlyphs);
```
