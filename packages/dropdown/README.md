# Dropdown

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/dropdown.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/dropdown/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/dropdown
```

### NPM

```shell
npm install @leafygreen-ui/dropdown
```

### Example

```js
<Button ref={ref} onClick={handleTriggerClick}>
  Content!
  <Dropdown
    triggerRef={ref}
    open={open}
    setOpen={setOpen}
    maxWidth={400}
    {...props}
  >
    <DropdownLabel label="Testing">
      <DropdownItem description="I am a description">Child A</DropdownItem>
      <DropdownItem>Child B</DropdownItem>
    </DropdownLabel>
    <DropdownItem disabled>Child C</DropdownItem>
    <DropdownItem active>Child D</DropdownItem>
    <DropdownGroup hasAction href="string" title="title">
      <DropdownItem>Child E</DropdownItem>
      <DropdownItem>Child F</DropdownItem>
    </DropdownGroup>
  </Dropdown>
</Button>
```

## Dropdown Properties

| Prop                | Type                           | Description                                                                                                                                                                 | Default |
| ------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `children`          | `React.ReactNode`              | Children passed to the dropdown component                                                                                                                                   |         |
| `open`              | `boolean`                      | Determines the open state of the dropdown                                                                                                                                   | `false` |
| `setOpen`           | `(bool: boolean) => void`      | Callback to change the open state of the dropdown                                                                                                                           |         |
| `shouldClose`       | `() => void`                   | Callback to determine whether or not Menu should close when user tries to close it                                                                                          |         |
| `darkMode`          | `boolean`                      | Determines whether or not the component will be rendered in dark mode                                                                                                       |         |
| `triggerRef`        | `React.RefObject<HTMLElement>` | A ref for the element used to trigger the dropdown. Passing a trigger allows dropdown to control opening and closing itself internally, as well as handle positioning logic |         |
| `highlightBehavior` | `'focus' 'ariaSelected'`       | Determines how component responds to keyboard navigation. Either by manually changing focus or by setting aria-selected attribute                                           |         |
| `maxWidth`          | `number`                       | The max width of the menu (in px)                                                                                                                                           |         |
| `maxHeight`         | `number`                       | The max height of the menu (in px)                                                                                                                                          |         |
| `renderedContext`   | `'menu' 'formElement'          | Determines how the items are styled                                                                                                                                         | 'menu'  |

## DropdownGroup Properties'

| Prop          | Type                      | Description                                                                  | Default     |
| ------------- | ------------------------- | ---------------------------------------------------------------------------- | ----------- |
| `children`    | `React.ReactNode`         | Content to appear inside of group                                            |             |
| `disabled`    | `boolean`                 | Determines whether or not the MenuItem is disabled.                          |             |
| `active`      | `boolean`                 | Determines whether or not the item is active.                                |             |
| `description` | `string`                  | Optional description text                                                    |             |
| `leftGlyph`   | `React.ReactNode`         | Glyph to be displayed to the left of content                                 |             |
| `rightGlyph`  | `React.ReactNode`         | Glyph to be displayed to the right of content                                |             |
| `onClick`     | `React.MouseEventHandler` | Callback fired when item is clicked                                          |             |
| `actionType`  | `'destructive' 'default`  | Styles input based on intended action                                        | `'default'` |
| `title`       | `string`                  | Title text for the DropdownGroup                                             |             |
| `hasAction`   | `boolean`                 | Determines if the DropdownGroup both performs a function and opens a submenu |             |

## DropdownItem Properties

| Prop          | Type                      | Description                                         | Default     |
| ------------- | ------------------------- | --------------------------------------------------- | ----------- |
| `children`    | `React.ReactNode`         | Content to appear inside of item                    |             |
| `disabled`    | `boolean`                 | Determines whether or not the MenuItem is disabled. |             |
| `active`      | `boolean`                 | Determines whether or not the item is active.       |             |
| `description` | `string`                  | Optional description text                           |             |
| `leftGlyph`   | `React.ReactNode`         | Glyph to be displayed to the left of content        |             |
| `rightGlyph`  | `React.ReactNode`         | Glyph to be displayed to the right of content       |             |
| `onClick`     | `React.MouseEventHandler` | Callback fired when item is clicked                 |             |
| `actionType`  | `'destructive' 'default`  | Styles input based on intended action               | `'default'` |

## DropdownLabel Properties

| Prop       | Type              | Description                          | Default |
| ---------- | ----------------- | ------------------------------------ | ------- |
| `children` | `React.ReactNode` | Content to appear inside of label    |         |
| `label`    | `string`          | Text shown above the group's options |         |
