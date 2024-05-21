# Rich Links

![npm (scoped)](https://img.shields.io/npm/v/@lg-chat/rich-links.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/rich-links/example/)

## Installation

### Yarn

```shell
yarn add @lg-chat/rich-links
```

### NPM

```shell
npm install @lg-chat/rich-links
```

## Properties

### Base Properties

All `RichLink` components support the following props:

| Prop             | Type                                                           | Description                                                              | Default  |
| ---------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ | -------- |
| `children`       | `string`                                                       | The text that shows on the rich link                                     |          |
| `imageUrl`       | `string?`                                                      | A URL for the background image of the rich link                          |          |
| `variant`        | `Variant`                                                      | Render as a built-in Rich Link [Variant](#Variants)                      |          |
| `badgeGlyph`     | `GlyphName`                                                    | A [@leafygreen-ui/icon](../../packages/icon/) glyph to show in the badge |          |
| `badgeLabel`     | `string \| React.ReactNode`                                    | A string or component to show in the badge                               |          |
| `badgeColor`     | `"green" \| "gray" \| "blue" \| "purple" \| "red" \| "yellow"` | The background color of the badge                                        | `"gray"` |
| `...anchorProps` | `HTMLAnchorElement?`                                           | Additional props to spread on the anchor element                         |          |

### Variants

You can choose from a set of pre-defined variants for a specific use case. For
example, the "Docs" variant has a specific color and badge text to ensure
consistency across all documentation links.

To use a variant, specify it in the `variant` prop.

```tsx
<RichLink href="https://www.example.com" variant="Website">
  Example Link
</RichLink>
```

The following variants are supported:

- `"Blog"`
- `"Code"`
- `"Book"`
- `"Docs"`
- `"Learn"`
- `"Video"`
- `"Website"`

### Custom Badge

If an existing variant does not meet your use case, you can define a custom
badge instead. To use a custom badge, omit the `variant` prop and instead
define the badge props:

```tsx
<RichLink
  href="https://www.example.com"
  badgeGlyph="ArrowRight"
  badgeLabel="My Link"
  badgeColor="blue"
>
  Example Link
</RichLink>
```
