# Skeleton Loader

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/skeleton.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/skeleton/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/skeleton-loader
```

### NPM

```shell
npm install @leafygreen-ui/skeleton-loader
```

## Example

```jsx
<ParagraphSkeleton />
<ParagraphSkeleton withHeader />
<FormSkeleton />
<CardSkeleton />
<TableSkeleton columnLabels={['Column 1', 'Column 2']} />
```

## Properties

#### Skeleton

| Name             | Type     | Default   | Description                           |
| ---------------- | -------- | --------- | ------------------------------------- |
| `size`           | `string` | `default` | Determines the height of the skeleton |
| HTML `div` props |          |           | Additional HTML div properties        |

#### Paragraph Skeleton

| Name             | Type      | Default | Description                                              |
| ---------------- | --------- | ------- | -------------------------------------------------------- |
| `withHeader`     | `boolean` | `false` | Indicates whether the header skeleton should be rendered |
| HTML `div` props |           |         | Additional HTML div properties                           |

#### Table Skeleton

| Name             | Type            | Default | Description                                                                           |
| ---------------- | --------------- | ------- | ------------------------------------------------------------------------------------- |
| `columnLabels`   | `Array<string>` |         | Column labels. Empty strings will be treated as unknown and render a simple skeleton. |
| `numRows`        | `number`        | `5`     | Number of rows                                                                        |
| `numCols`        | `number`        | `4`     | Number of columns                                                                     |
| `baseFontSize`   | `13 \| 16`      | `13`    | Base font size                                                                        |
| HTML `div` props |                 |         | Additional HTML div properties                                                        |

#### Form Skeleton

`<FormSkeleton />` only extends HTML `div` props.

#### Card Skeleton

`<CardSkeleton />` only extends HTML `div` props.
