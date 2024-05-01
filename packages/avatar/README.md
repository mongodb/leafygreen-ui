# Avatar

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/avatar
```

### NPM

```shell
npm install @leafygreen-ui/avatar
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
