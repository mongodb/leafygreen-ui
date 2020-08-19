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

```jsx
<H2>
  <InlineDefinition definition={shardDefinition}>Shard</InlineDefinition> your
  cluster
</H2>
```

**Output HTML**

```html

```

## Properties

| Prop         | Type                  | Description                                                  | Default |
| ------------ | --------------------- | ------------------------------------------------------------ | ------- |
| `definition` | **Required** `string` | Content that describes the term. Will appear inside Tooltip. |         |
| `children`   | `string`              | Text that will appear underlined                             |         |

_Any other properties will be spread on the `Tooltip` element_
