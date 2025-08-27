# Icon

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/icon.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/icon/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/icon
```

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
import PlusIcon from '@leafygreen-ui/icon/dist/Plus';

const SomeComponent = () => <Icon glyph="Plus" fill="#FF0000" />;
const OneImport = () => <PlusIcon />;
```

## Properties

| Prop               | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                  | Default     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `glyph` (Required) | "ActivityFeed", "AddFile", "AllProducts", "AnalyticsNode", "Apps", "Array", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowUp", "Award", "Beaker", "Bell", "Biometric", "Boolean", "Building", "Bulb", "Calendar", "Camera", "Cap", "CaretDown", "CaretLeft", "CaretRight", "CaretUp", "ChartFilled", "Charts", "Checkmark", "CheckmarkWithCircle", "ChevronDown", "ChevronLeft", "ChevronRight", "ChevronUp", "Circle", "Clock", "ClockWithArrow", "Clone", "Cloud", "Code", "CodeBlock", "Coin", "Colon", "Config", "Connect", "Copy", "CreditCard", "CurlyBraces", "Cursor", "Dashboard", "Database", "Diagram", "Diagram2", "Diagram3", "Disconnect", "Download", "Drag", "Edit", "Ellipsis", "Email", "EmptyDatabase", "EmptyFolder", "Eraser", "Escalation", "Export", "Favorite", "Federation", "File", "Filter", "Folder", "Format", "FullScreenEnter", "FullScreenExit", "Function", "Gauge", "GlobeAmericas", "GovernmentBuilding", "Guide", "Hash", "HiddenSecondaryNode", "Highlight", "Home", "HorizontalDrag", "Import", "ImportantWithCircle", "InfoWithCircle", "InternalEmployee", "InviteUser", "Key", "Laptop", "LightningBolt", "Link", "List", "Lock", "LogIn", "LogOut", "MagnifyingGlass", "Megaphone", "Menu", "Minus", "Mobile", "Moon", "MultiDirectionArrow", "MultiLayers", "NavCollapse", "NavExpand", "NoFilter", "NotAllowed", "Note", "NumberedList", "OpenNewTab", "OutlineFavorite", "Package", "Pause", "Pending", "Person", "PersonGroup", "PersonWithLock", "Pin", "Play", "Plus", "PlusWithCircle", "Primary", "Project", "QuestionMarkWithCircle", "Read", "Recommended", "Redo", "Refresh", "Relationship", "ReplicaSet", "Resize", "Resource", "Return", "Revert", "Router", "SMS", "Save", "SearchIndex", "Secondary", "Serverless", "Settings", "ShardedCluster", "Shell", "Shield", "Shirt", "SortAscending", "SortDescending", "Sparkle", "SplitHorizontal", "SplitVertical", "Stitch", "Stop", "String", "Sun", "Support", "Sweep", "Table", "Tag", "TemporaryTable", "ThumbsDown", "ThumbsUp", "TimeSeries", "TimeSeriesCollection", "Trash", "Undo", "University", "Unlock", "Unsorted", "UpDownCarets", "Upload", "VerticalEllipsis", "View", "Visibility", "VisibilityOff", "Warning", "Wizard", "Wrench", "Write", "X", "XWithCircle" | Specifies the glyph to use.                                                                                                                                                                                                                                                  |             |
| `size`             | `'small'`, `'default'`, `'large'`, `'xlarge'`, `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | The height and width of the glyph's viewBox. This can be any `number` or one of the following `'small'`, `'default'`, `'large'`, `'xlarge'`                                                                                                                                  | `'default'` |
| `fill`             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | The fill color that is passed to the glyph. By default, the glyph will inherit its fill from the CSS color property of its nearest ancestor.                                                                                                                                 |             |
| `title`            | `string`, `boolean`, `null`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Renders a title tag with the passed string within the SVG element for screen reader accessibility. Setting this value to `false` will entirely unset the title. <br />If title is `undefined` or `null`, a human-readable title will be generated based on the glyph's name. |             |
| ...                | `SVGR.ComponentProps`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | All other props will be spread on the `svg` element                                                                                                                                                                                                                          |             |

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
- Build the package with `pnpm run build` to create the component in `src/generated`.
- Update README
