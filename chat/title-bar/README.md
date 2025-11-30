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

```tsx
import { TitleBar } from '@lg-chat/title-bar';

return <TitleBar title="LeafyGreen Chat" badgeText="Beta" />;
```

## Properties

| Prop                     | Type                      | Description                                                    | Default |
| ------------------------ | ------------------------- | -------------------------------------------------------------- | ------- |
| `badgeText` _(optional)_ | `string`                  | Badge text rendered to indicate 'Beta' or 'Experimental' flags |         |
| `title`                  | `string`                  | Title text                                                     |         |
| `...`                    | `HTMLElementProps<'div'>` | Props spread on root element                                   |         |
