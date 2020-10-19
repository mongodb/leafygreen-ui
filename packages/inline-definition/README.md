# Inline Definition

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/inline-definition.svg)

#### [View on Storybook](https://mongodb.github.io/leafygreen-ui/?path=/story/inline-definition--default)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/inline-definition
```

### NPM

```shell
npm install @leafygreen-ui/inline-definition
```

## Example

```js
<H2>
  <InlineDefinition definition={shardDefinition}>Shard</InlineDefinition> your
  cluster
</H2>
```

**Output HTML**

```html
<h2 class="leafygreen-ui-1xwhtk1">
  <span class="leafygreen-ui-1eprrtj" aria-describedby="tooltip-1">Shard</span>
  your cluster
</h2>
<div>
  <div class="leafygreen-ui-10b9mvh">
    <div role="tooltip" id="tooltip-27" class="leafygreen-ui-10d84ei">
      <div class="leafygreen-ui-qlb2bl">
        <div class="leafygreen-ui-3uslxw"></div>
      </div>
      <p class="leafygreen-ui-1s8990i">
        Sharding is a method for horizontally scaling across multiple replica
        sets by breaking up large datasets (e.g. partitioning) into smaller
        parts. Sharding is native to MongoDB.
      </p>
    </div>
  </div>
</div>
```

## Properties

| Prop                    | Type              | Description                                                  | Default |
| ----------------------- | ----------------- | ------------------------------------------------------------ | ------- |
| `definition` (Required) | `React.ReactNode` | Content that describes the term. Will appear inside Tooltip. |         |
| `children`              | `string`          | Text that will appear underlined                             |         |
| `className`             | `string`          | className will be applied to the trigger element             |         |
| ...                     | `TooltipProps`    | Any other properties will be spread on the Tooltip element   |         |

##### TooltipProps

```typescript
const Justify = {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
  Fit: 'fit',
} as const;
type Justify = typeof Justify[keyof typeof Justify];

const Align = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
  CenterVertical: 'center-vertical',
  CenterHorizontal: 'center-horizontal',
} as const;
type Align = typeof Align[keyof typeof Align];

type PortalProps = OneOf<
  {
    usePortal?: true;
    portalClassName?: string;
  },
  {
    usePortal: false;
  }
>;

export type TooltipProps = HTMLElementProps<'div'> & {
  align?: Align;
  justify?: Justify;
  spacing?: number;
  adjustOnMutation?: boolean;
  onClick?: React.MouseEventHandler;
  trigger: React.ReactElement | Function;
  triggerEvent?: TriggerEvent;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode?: boolean;
  id?: string;
  shouldClose?: () => boolean;
  enabled?: boolean;
} & PortalProps;
```
