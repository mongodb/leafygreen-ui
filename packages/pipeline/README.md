# Pipeline

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/pipeline.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/pipeline/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/pipeline
```

### NPM

```shell
npm install @leafygreen-ui/pipeline
```

### Example

```js
<Pipeline size="xsmall" className="my-pipeline">
  <Stage>$match</Stage>
  <Stage>$addFields</Stage>
  <Stage>$limit</Stage>
</Pipeline>
```

## Properties

| Prop        | Type                                         | Description                                                                                                                                                                                                | Default     |
| ----------- | -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `className` | `string`                                     | Adds a className to the class attribute.                                                                                                                                                                   | `''`        |
| `children`  | `node`                                       | The content that will render inside of the component. If any nodes other than `Stage` components are passed in as children, the `Pipeline` component will automatically wrap them with `Stage` components. | `undefined` |
| `size`      | `'xsmall'`, `'small'`, `'normal'`, `'large'` | Sets the size variant of the Pipeline.                                                                                                                                                                     | `'xsmall'`  |
| `darkMode`  | `boolean`                                    | Determines if the component renders in dark theme                                                                                                                                                          | `false`     |
| ...         | native `div` attributes                      | Any other props will be spread on the root `div` element                                                                                                                                                   |             |

_All other props will be spread onto the root element._

# Stage

## Properties

| Prop               | Type                   | Description                                                                                                                                                       | Default     |
| ------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `className`        | `string`               | Adds a className to the class attribute.                                                                                                                          | `''`        |
| `children`         | `node`                 | The content that will render inside of the component.                                                                                                             | `undefined` |
| `intersectionNode` | `React.Element`        | The DOM element to observe intersections with. When used with the `Pipeline` component, this prop is automatically set to the element rendered by the `Pipeline`. | `window`    |
| `threshold`        | `number`               | Either a single number or an array of numbers which indicate at what percentage of the target's visibility, the observer's callback should be executed.           | `0.8`       |
| `size`             | `string`               | Sets the size variant of the Pipeline. Valid sizes are: `'xsmall'`, `'small'`, `'normal'`, `'large'`                                                              | `'xsmall'`  |
| ...                | native `li` attributes | Any other props will be spread on the root `li` element                                                                                                           |             |

_All other props will be spread onto the root element. The Pipeline component will also decorate the child Stage components with the `size` prop that it is supplied with._
