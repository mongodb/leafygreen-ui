# Ordered List

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/ordered-list.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/ordered-list/live-example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/ordered-list
```

### NPM

```shell
npm install @leafygreen-ui/ordered-list
```

## Example

```js
<OrderedList>
  <OrderedListItem
    title="Title"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
  />
  <OrderedListItem
    title="Title"
    description={
      <>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna. <Link>Learn more.</Link>
      </>
    }
  />
  <OrderedListItem
    title="Title"
    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna."
  />
</OrderedList>
```

# OrderedList

| Prop       | Type      | Description                                      | Default |
| ---------- | --------- | ------------------------------------------------ | ------- |
| `darkMode` | `boolean` | Determines if the component renders in dark mode | `false` |

# OrderedListItem

| Prop        | Type              | Description                                                         | Default |
| ----------- | ----------------- | ------------------------------------------------------------------- | ------- |
| title       | `React.ReactNode` | The title of the list item.                                         |         |
| description | `React.ReactNode` | The description of the list item. This will render below the title. |         |
