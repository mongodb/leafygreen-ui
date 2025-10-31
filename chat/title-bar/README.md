# Title Bar

## Installation

### PNPM

```shell
pnpm add @lg-chat/title-bar
```

### Yarn

```shell
yarn add @lg-chat/title-bar
```

### NPM

```shell
npm install @lg-chat/title-bar
```

## Example

### Compact

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { TitleBar } from '@lg-chat/title-bar';

return (
  <LeafyGreenChatProvider variant={Variant.Compact}>
    <TitleBar title="LeafyGreen Chat" badgeText="Beta" />
  </LeafyGreenChatProvider>
);
```

### Spacious

```tsx
import {
  LeafyGreenChatProvider,
  Variant,
} from '@lg-chat/leafygreen-chat-provider';
import { TitleBar, Align } from '@lg-chat/title-bar';

return (
  <LeafyGreenChatProvider variant={Variant.Spacious}>
    <TitleBar
      title="LeafyGreen Chat"
      badgeText="Beta"
      align={Align.Center}
      onClose={() => console.log('Close clicked')}
    />
  </LeafyGreenChatProvider>
);
```

## Properties

| Prop                     | Type                                                              | Description                                                                              | Default    |
| ------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ---------- |
| `align` _(optional)_     | `'center' \| 'left'`                                              | Alignment of the title text and badge. Only applies to spacious variant.                 | `'center'` |
| `badgeText` _(optional)_ | `string`                                                          | Badge text rendered to indicate 'Beta' or 'Experimental' flags                           |            |
| `iconSlot` _(optional)_  | `ReactNode`                                                       | Slot for custom close icon. Only applies to spacious variant.                            |            |
| `onClose` _(optional)_   | `React.MouseEventHandler<HTMLButtonElement \| HTMLAnchorElement>` | Event handler called when the close button is clicked. Only applies to spacious variant. |            |
| `title`                  | `string`                                                          | Title text                                                                               |            |
| `...`                    | `HTMLElementProps<'div'>`                                         | Props spread on root element                                                             |            |
