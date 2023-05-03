# Search Input

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/search-input.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/search-input/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/search-input
```

### NPM

```shell
npm install @leafygreen-ui/search-input
```

## Example

```js
import {
  SearchInput,
  SearchResult,
  SearchResultGroup,
} from '@leafygreen-ui/search-input';

<SearchInput
  className={css`
    width: 200px;
  `}
  onChange={() => {
    console.log('SB: Change');
  }}
  aria-label="some label"
>
  <SearchResult
    onClick={() => {
      console.log('SB: Click Apple');
    }}
    description="This is a description"
  >
    Apple
  </SearchResult>
  <SearchResult>Banana</SearchResult>
  <SearchResult as="a" href="#" description="This is a link">
    Carrot
  </SearchResult>
  <SearchResult description="This is a very very long description. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.">
    Dragonfruit
  </SearchResult>
  <SearchResultGroup label="Peppers">
    <SearchResult description="A moderately hot chili pepper used to flavor dishes">
      Cayenne
    </SearchResult>
    <SearchResult>Ghost pepper</SearchResult>
    <SearchResult>Habanero</SearchResult>
    <SearchResult>Jalapeño</SearchResult>
    <SearchResult>Red pepper</SearchResult>
    <SearchResult>Scotch bonnet</SearchResult>
  </SearchResultGroup>
</SearchInput>;
```

## Properties

| Prop              | Type                                   | Description                                                                                          | Default   |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- | --------- |
| `darkMode`        | `boolean`                              | Determines whether or not the component appears in dark theme.                                       | `false`   |
| `state`           | `'none'`, `'loading'`,                 | The current state of the SearchInput.                                                                | `none`    |
| `size`            | `'small'`, `'default'`, `'large'`      | Determines the font size, padding and spacing.                                                       | `default` |
| `disabled`        | `boolean`                              | Determines whether the field is currently disabled.                                                  | `false`   |
| `value`           | `string`                               | The current value of the text box.                                                                   | `''`      |
| `placeholder`     | `string`                               | The placeholder text shown in the input field before the user begins typing.                         | `Search`  |
| `aria-labelledby` | `string`                               | A value for `aria-labelledby`. Allows use of the component with an external `<label>` element.       |           |
| `aria-label`      | `string`                               | A value for `aria-label`. Allows use of the component without a `label`.                             |           |
| `onChange`        | `ChangeEventHandler<HTMLInputElement>` | Callback fired when the input value changes. Use this callback to filter the `SearchResult` options. |           |
| `onSubmit`        | `FormEventHandler<HTMLFormElement>`    | Callback fired when a search result is clicked, or the enter key is pressed.                         | `''`      |
| `...`             | native `form` attributes               | Any other properties will be spread on the root `form` element.                                      |           |

# SearchResult

## Props

| Prop          | Type                      | Description                                                                                                                                                | Default |
| ------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`    | `React.ReactNode`         | The value of the result.                                                                                                                                   |         |
| `description` | `React.ReactNode`         | Optional description text.                                                                                                                                 |         |
| `onClick`     | `React.MouseEventHandler` | Callback fired when the option is clicked.                                                                                                                 |         |
| `as`          | `React.ElementType`       | The component or element to render as.                                                                                                                     | `li`    |
| `disabled`    | `boolean`                 | Prevents the option from being selectable.                                                                                                                 | `false` |
| `highlighted` | `boolean`                 | Defines the currently highlighted option element for keyboard navigation. Not to be confused with selected, which identifies the currently selected option | `false` |
| `selected`    | `boolean`                 | Whether the component is selected, regardless of keyboard navigation                                                                                       | `false` |
| `href`        | `string`                  | `href` is required for Anchor tags                                                                                                                         |         |
| `...`         | native `as` attributes    | Any other properties will be spread on the root `as` element.                                                                                              |

# SearchResultGroup

## Props

| Prop       | Type                    | Description                                                    | Default |
| ---------- | ----------------------- | -------------------------------------------------------------- | ------- |
| `children` | `React.ReactNode`       | Must be `<SearchResult/>` or `<SearchResultGroup/>`.           |         |
| `label`    | `string`                | Title for the group of options.                                |         |
| `...`      | native `div` attributes | Any other properties will be spread on the root `div` element. |         |
