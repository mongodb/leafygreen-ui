# Pagination

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/pagination.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/pagination/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/pagination
```

### NPM

```shell
npm install @leafygreen-ui/pagination
```

## Example

**Output HTML**

## Properties

| Prop                       | Type                                 | Description                                                                        | Default    |
| -------------------------- | ------------------------------------ | ---------------------------------------------------------------------------------- | ---------- |
| itemsPerPage               | number                               | Number of items visible on the current page.                                       | 10         |
| itemsPerPageOptions        | number[]                             | Options to be shown in the Select to indicate items per page.                      | [10,25,50] |
| onItemsPerPageOptionChange | SelectProps['onChange']              | onChange prop passed to the Select component that controls the items per page.     |            |
| currentPage                | number                               | Current index of page shown (starting from 1)                                      | 1          |
| onCurrentPageOptionChange  | SelectProps['onChange']              | onChange prop passed to the Select component that controls the current page index. |            |
| numTotalItems              | number                               | Total number of records.                                                           |            |
| onBackArrowClick           | AccessibleIconButtonProps['onClick'] | Function called when the forward arrow icon is clicked                             |            |
| disableBackArrowButton        | boolean | Disables the back arrow button. Back arrow button is only disabled on the first page by default                             | false           |
| onForwardArrowClick        | AccessibleIconButtonProps['onClick'] | Function called when the forward arrow icon is clicked                             |            |
| disableForwardArrowButton        | boolean | Disables the forward arrow button. Forward arrow button is only disabled on the last page by default                             | false           |