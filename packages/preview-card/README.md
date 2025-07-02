# Preview Card

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/preview-card.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/preview-card/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/preview-card
```

### Yarn

```shell
yarn add @leafygreen-ui/preview-card
```

### NPM

```shell
npm install @leafygreen-ui/preview-card
```

## Description

The `PreviewCard` component is a container that can be expanded and collapsed to show or hide content. It's useful for displaying a preview of content that can be revealed in full by the user.

## Example

### Uncontrolled

```tsx
import { PreviewCard } from '@leafygreen-ui/preview-card';
import { Body } from '@leafygreen-ui/typography';

<PreviewCard>
  <Body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non
    mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
    tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
    Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
  </Body>
</PreviewCard>;
```

### Controlled

```tsx
import { useState } from 'react';
import { PreviewCard } from '@leafygreen-ui/preview-card';
import { Body } from '@leafygreen-ui/typography';

const [isOpen, setIsOpen] = useState(false);

<PreviewCard isOpen={isOpen} onOpenChange={setIsOpen}>
  <Body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id elit non
    mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo,
    tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
    Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.
  </Body>
</PreviewCard>;
```

## Properties

| Prop              | Type                          | Description                                                                                         | Default       |
| :---------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------- | :------------ |
| `children`        | `React.ReactNode`             | The content to be displayed inside the card.                                                        |               |
| `collapsedHeight` | `number \| string`            | The height of the card when it is collapsed. Can be a number (in pixels) or a string (e.g., '50%'). | `140`         |
| `defaultOpen`     | `boolean`                     | The default open state of the card when it is uncontrolled.                                         | `false`       |
| `isOpen`          | `boolean`                     | The open state of the card. Providing this prop will switch the component to controlled mode.       |               |
| `onOpenChange`    | `ChangeEventHandler<boolean>` | The event handler called when the open state of the card changes.                                   |               |
| `viewLessText`    | `React.ReactNode`             | The button text displayed when the card is expanded.                                                | `"View less"` |
| `viewMoreText`    | `React.ReactNode`             | The button text displayed when the card is collapsed.                                               | `"View more"` |
