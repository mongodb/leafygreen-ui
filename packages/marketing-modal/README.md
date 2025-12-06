# Marketing Modal

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/marketing-modal.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/marketing-modal/live-example/)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/marketing-modal
```

### Yarn

```shell
yarn add @leafygreen-ui/marketing-modal
```

### NPM

```shell
npm install @leafygreen-ui/marketing-modal
```

## Example

```tsx
import MarketingModal from '@leafygreen-ui/marketing-modal';

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(!open)}>Open Modal</button>
      <MarketingModal
        open={open}
        buttonProps={{
          children: 'Get started',
          onClick: () => setOpen(false),
        }}
        onLinkClick={() => setOpen(false)}
        onClose={() => setOpen(false)}
        title="Introducing New Feature!"
        graphic={
          <img alt="" src="examples/DataLake.png" width={275} height={220} />
        }
        graphicStyle={ImageStyle.Center}
        linkText="Cancel"
      >
        This is some description text, and it is extra long so it fills up this
        modal. Another thing about the modals here.
      </MarketingModal>
    </>
  );
}
```

## Properties

| Prop             | Type                                          | Description                                                                                                                                                                           | Default     |
| ---------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `open`           | `boolean`                                     | Determines open state of `Modal` component                                                                                                                                            | `false`     |
| `onLinkClick`    | `function`                                    | Callback that fires when the secondary link is clicked. This can be used to set the modal to be closed.                                                                               | `() => {}`  |
| `onClose`        | `function`                                    | Callback that fires when the cancel button, x button, or backdrop is clicked. This can be used to set the modal to be closed.                                                         | `() => {}`  |
| `title`          | `ReactNode`                                   | Title text to display above the main content text.                                                                                                                                    |             |
| `graphic`        | `React.ReactElement`                          | Element to be used as the main graphic of the modal.                                                                                                                                  |             |
| `graphicStyle`   | `'center'`, `'fill'`                          | Determines how the main graphic should be displayed in the modal.                                                                                                                     | `'center'`  |
| `children`       | `node`                                        | Children that will be rendered inside `<MarketingModal />` component.                                                                                                                 |             |
| `linkText`       | `string`                                      | Text content of the alternate action link.                                                                                                                                            |             |
| `className`      | `string`                                      | Style to be applied to the container's root node.                                                                                                                                     |             |
| `darkMode`       | `boolean`                                     | Determines if the component will appear in dark mode.                                                                                                                                 | `false`     |
| `closeIconColor` | `'default'`, `'dark'`, `'light'`              | Determines the color of the close icon.                                                                                                                                               | `'default'` |
| `showBlob`       | `boolean`                                     | Determines if the blob illustration should appear in the background of the modal. Currently will only work if `darkMode` is set to false.                                             | `false`     |
| `blobPosition`   | `'top left'`, `'top right'`, `'bottom right'` | Determines the position of the blob if `showBlob` is set to `true`.                                                                                                                   | `top left`  |
| `disclaimer`     | `React.ReactElement`                          | Disclaimer text to be rendered under the primary action button.                                                                                                                       |             |
| `buttonProps`    | `ButtonProps`                                 | The primary button. An object that accepts all [Button props](https://github.com/mongodb/leafygreen-ui/blob/main/packages/button/README.md#properties) except for the `variant` prop. |             |

## Testing Considerations

The `MarketingModal` component uses the native `HTMLDialogElement` API for better accessibility and browser-native behavior. However, `JSDOM` (used by `Jest` and other test runners) does not fully support this API. You'll need to mock the `show`, `showModal`, and `close` methods in your test setup:

```tsx
beforeAll(() => {
  HTMLDialogElement.prototype.show = jest.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.showModal = jest.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = true;
  });

  HTMLDialogElement.prototype.close = jest.fn(function mock(
    this: HTMLDialogElement,
  ) {
    this.open = false;
  });
});
```

This mock can be placed in a `beforeAll` block in your test file, or in a global test setup file.
