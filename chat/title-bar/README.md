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

```ts
import { TitleBar } from '@lg-chat/title-bar';

return <TitleBar badgeText="Beta" />;
```

## Properties

| Prop        | Type                                       | Description                                                    | Default                                               |
| ----------- | ------------------------------------------ | -------------------------------------------------------------- | ----------------------------------------------------- |
| `align`     | `'center', 'left'`                         | Alignment of the title text and badge                          | `'left'`                                              |
| `badgeText` | `string`                                   | Badge text rendered to indicate 'Beta' or 'Experimental' flags |                                                       |
| `onClose`   | `React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>`                                            | Event handler called when the close button is clicked |
| `title`     | `string`                                   | Title text                                                     |                                                       |
| `...`       | `HTMLElementProps<'div'>`                  | Props spread on root element                                   |                                                       |
