# Icon

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/icon.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/icon/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/icon
```

### NPM

```shell
npm install @leafygreen-ui/icon
```

## Example

```js
import Icon from '@leafygreen-ui/icon';

const SomeComponent = () => <Icon glyph="Plus" fill="#FF0000" />;
```

**Output HTML**

```html
<svg
  width="16"
  height="16"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 16 16"
  class="leafygreen-ui-1gvnm9k"
  role="img"
  aria-label="Beaker Icon"
>
  <path
    d="M10.623 1a.886.886 0 01.041 1.772V5.34c0 .114.035.239.095.343l3.516 5.647.002.003c.232.387.356.818.356 1.254 0 .4-.106.804-.318 1.17l-.003.006-.004.007-.095.158A2.36 2.36 0 0112.217 15h-8.4c-.44 0-.86-.118-1.22-.333a2.448 2.448 0 01-.875-.904l-.001-.003a2.428 2.428 0 01-.301-1.163c0-.438.123-.877.367-1.268l3.53-5.647a.695.695 0 00.094-.343V2.772A.885.885 0 015.452 1zM8.904 2.774H7.185V5.34c0 .457-.136.892-.365 1.27l-.001.001-3.522 5.657a.644.644 0 00-.103.343c0 .102.026.2.081.296l.003.005a.62.62 0 00.553.329h8.4c.12 0 .223-.031.316-.087a.675.675 0 00.238-.898L9.272 6.612a2.324 2.324 0 01-.368-1.273V2.774zm.606 6.633l1.553 2.49a.227.227 0 01.01.243.223.223 0 01-.206.122H5.195c-.122 0-.187-.075-.206-.122-.028-.056-.056-.15.01-.243l1.553-2.49H9.51z"
    fill="currentColor"
  ></path>
</svg>
```

## Properties

| Prop               | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                  | Default     |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `glyph` (Required) | `'ActivityFeed'`, `'AddFile'`, `'AllProducts'`, `'Apps'`, `'Array'`, `'ArrowDown'`, `'ArrowLeft'`, `'ArrowRight'`, `'ArrowUp'`, `'Beaker'`, `'Bell'`, `'Biometric'`, `'Boolean'`, `'Building'`, `'Bulb'`, `'Calendar'`, `'Camera'`, `'Cap'`, `'CaretDown'`, `'CaretLeft'`, `'CaretRight'`, `'CaretUp'`, `'ChartFilled'`, `'Charts'`, `'Checkmark'`, `'CheckmarkWithCircle'`, `'ChevronDown'`,, `'ChevronLeft'` `'ChevronRight'`,`'ChevronUp'`, `'Clock'`,`'ClockWithArrow'`, `'Clone'`, `'Cloud'`, `'Code'`, `'CodeBlock'`,`'Colon'`, `'Connect'`,`'Copy'`,`'CreditCard'`, `'CurlyBraces'`, `'Dashboard'`, `'Database'`, `'Diagram'`, `'Diagram2'`, `'Diagram3'`, `'Disconnect'`, `'Download'`, `'Drag'`, `'Edit'`, `'Ellipsis'`, `'Email'`, `'Eraser'`, `'Escalation'`, `'Export'`, `'Favorite'`, `'Federation'`, `'File'`, `'Filter'`,`'Folder'`, `'Format'`, `'FullScreenEnter'`, `'FullScreenExit'`, `'Guage'`, `'GlobeAmericas'`, `'GovernmentBuilding'`, `'Hash'`, `'Highlight'`, `'Home'`, `'HorizontalDrag'`, `'Import'`, `'ImportantWithCircle'`, `'InfoWithCircle'`, `'InternalEmployee'`, `'InviteUser'`, `'Key'`, `'Laptop'`, `'LightningBolt'`, `'Link'`, `'List'`, `'Lock'`, `'LogIn'`, `'LogOut'`, `'MagnifyingGlass'`, `'Megaphone'`, `'Menu'`, `'Minus'`, `'Mobile'`, `'Moon'`, `'MultiDirectionArrow'`, `'MultiLayers'`, `'NavCollapse'`, `'NavExpand'`, `'NoFilter'`, `'NotAllowed'`, `'Note'`, `'OpenNewTab'`, `'Pause'`, `'Pending'`, `'Person'`, `'PersonGroup'`, `'PersonWithLock'`, `'Pin'`, `'Play'`, `'Plus'`, `'PlusWithCircle'`, `'Primary'`, `'Project'`, `'QuestionMarkWithCircle'`, `'Read'`, `'Recommended'`, `'Redo'`, `'Refresh'`,`'Relationship'`, `'ReplicaSet'`,`'Resize'`, `'Return'`, `'Save'`, `'SearchIndex'`, `'Secondary'`, `'Serverless'`, `'Settings'`, `'ShardedCluster'`, `'Shell'`, `'SMS'`,`'SortAscending'`, `'SortDescending'`, `'SortHorizontal'`, `'SortVertical'`,`'Sparkle'`, `'SplitHorizontal'`, `'SplitVertical'`, `'Stitch'`, `'Stop'`, `'String'`, `'Sun'`, `'Support'`, `'Sweep'`, `'Table'`, `'Tag'`, `'ThumbsDown'`, `'ThumbsUp'`, `'TimeSeries'`, `'TimeSeriesCollection'`, `'Trash'`, `'Undo'`, `'University'`, `'Unlock'`, `'Unsorted'`, `'UpDownCarets'`, `'Upload'`, `'VerticalEllipsis'`, `'Visibility'`, `'VisibilityOff'`, `'Warning'`, `'Wizard'`, `'Wrench'`, `'Write'`,`'X'`, `'XWithCircle'` | Specifies the glyph to use.                                                                                                                                                                                                                                                  |             |
| `size`             | `'small'`, `'default'`, `'large'`, `'xlarge'`, `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | The height and width of the glyph's viewBox. This can be any `number` or one of the following `'small'`, `'default'`, `'large'`, `'xlarge'`                                                                                                                                  | `'default'` |
| `fill`             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The fill color that is passed to the glyph. By default, the glyph will inherit its fill from the CSS color property of its nearest ancestor.                                                                                                                                 |             |
| `title`            | `string`, `boolean`, `null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Renders a title tag with the passed string within the SVG element for screen reader accessibility. Setting this value to `false` will entirely unset the title. <br />If title is `undefined` or `null`, a human-readable title will be generated based on the glyph's name. |             |
| ...                | `SVGR.ComponentProps`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | All other props will be spread on the `svg` element                                                                                                                                                                                                                          |             |

# createIconComponent

## Usage (Registering custom icon sets)

This package exposes a method used to generate a custom version of the Icon component with any specified set of icons.

```js
// Import the createIconComponent method from the Icon package
import { createGlyphComponent, createIconComponent } from '@leafygreen-ui/icon';

// Create your 'glyphs' object. For each key / value pair, the key will be the name of the icon,
// and the value can be any valid React component.
const myGlyphs = {
  MyCustomGlyph: createGlyphComponent('MyCustomGlyph', props => (
    <svg {...props} />
  )),
};

// The createIconComponent function returns your custom Icon component.
const MyIconComponent = createIconComponent(myGlyphs);

// Your icon is now ready to use!
const SomeComponent = () => (
  <div>
    <MyIconComponent glyph="MyCustomGlyph" />
  </div>
);
```

We also export the default icon set for you! If you want to include our glyphs with your custom glyphs, you can do something like this:

```js
import { createGlyphComponent, createIconComponent } from '@leafygreen-ui/icon';

const myGlyphs = {
  ...glyphs,
  MyCustomGlyph: createGlyphComponent('MyCustomGlyph', props => (
    <svg {...props} />
  )),
};

const MyIconComponent = createIconComponent(myGlyphs);
```

**Note:** Glyph has a static property, `isGlyph`, that enables checking whether or not a component is a LeafyGreen glyph.

## Returns

A custom `Icon` component, that includes any custom `glyph`s

## Properties

| Prop          | Type                                | Description                                                | Default |
| ------------- | ----------------------------------- | ---------------------------------------------------------- | ------- |
| `GlyphObject` | `Record<string, LGGlyph.Component>` | A dictionary record of all the named icons in the icon set |         |

# createGlyphComponent

Ensures a custom glyph accepts the same props and treat them the same as a built-in Leafygreen icon.
To ensure a custom glyph behaves similarly to built-in icons, be sure to:

- Spread `props` onto the `svg` element
- Ensure all fills in the `svg` are set to `currentColor`
- Strokes are converted to outlines (this should be done in Figma)

## Usage

```js
import { createGlyphComponent, Size } from '@leafygreen-ui/icon';

const MyIconGlyph = createGlyphComponent('myIconName', props => (
  <svg {...props} />
));

return <MyIconGlyph size={Size.Large} role="presentation" />;
```

## Returns

A `LGGlyph.Component`

## Properties

| Prop    | Type             | Description             | Default |
| ------- | ---------------- | ----------------------- | ------- |
| `name`  | `string`         | The name of the icon    |         |
| `Glyph` | `SVGR.Component` | The React SVG component |         |

## Reference

### Creating a new icon component

(For DS engineers)

- After uploading a new SVG file to `src/glyphs`, replace all `fill` property values for strokes with `#000`.
- Update `src/glyphs/index.ts` to import/export the SVG file.
- Build the package with `yarn build:packages icon` to create the component in `src/generated`.
- Update README
