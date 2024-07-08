# Avatar

## Installation

### Yarn

```shell
yarn add @lg-chat/avatar
```

### NPM

```shell
npm install @lg-chat/avatar
```

## Example

```ts
import { Avatar } from '@lg-chat/avatar';

return <Avatar darkMode variant={Variant.Mongo} />;
```

**Output HTML**

```html
<div class="lg-ui-lg-message-avatar-0000">
  <div class="leafygreen-ui-i5hsjh" data-testid="mongo-avatar">
    <svg
      role="img"
      aria-label="MongoDB Logo"
      class="leafygreen-ui-ebwjgf"
      height="40"
      viewBox="0 0 15 32"
      fill="none"
    >
      <path />
    </svg>
  </div>
</div>
```

## Properties

| Prop           | Type                         | Description                                                                                                                    | Default     |
| -------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `darkMode`     | `boolean`                    | Determines if the component will render in dark mode                                                                           | `false`     |
| `name`         | `string`                     | The name of the user who is represented by the avatar. The rendered text will be the initials of the text passed to this prop. |             |
| `size`         | `"small", "default"`         | Determines the size of the avatar                                                                                              | `"default"` |
| `sizeOverride` | `number`                     | If provided, overrides the size prop to a customizable number (in px)                                                          |             |
| `variant`      | `"mongo", "user", "default"` | Determines the Avatar component's variant                                                                                      | `"default"` |
| `...`          | `HTMLElementProps<'div'>`    | Props spread on the root element                                                                                               |             |

## Behavior

- When `variant = "user"` and a value is not passed to the `name` prop, an Avatar with the Person icon will be rendered as a fallback.
- The `size` prop is given default values responsinve to the chat container size. The chat container size is determined by the width of the first child in `LeafyGreenChatContext`. If a `size` prop value is provided, however, it will override the default values.
