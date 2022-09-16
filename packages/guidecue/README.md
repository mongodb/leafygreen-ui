# Guidecue

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/guidecue.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/guidecue/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/guidecue
```

### NPM

```shell
npm install @leafygreen-ui/guidecue
```

## Example

```js
import GuideCue from '@leafygreen-ui/guidecue';

const [open, setOpen] = useState < boolean > true;

<Guidecue open={open} setOpen={setOpen} title="New feature" refEl={triggerRef}>
  This is a new feature. You should try it out
</Guidecue>;
```

or

```js
import GuideCue from '@leafygreen-ui/guidecue';

const [open, setOpen] = useState < boolean > true;

<Guidecue
  open={open}
  setOpen={setOpen}
  title="New feature"
  refEl={triggerRef}
  onButtonClick={() => {}}
  onClose={() => {}}
  numberOfSteps={4}
  currentStep={1}
>
  This is a new feature. You should try it out
</Guidecue>;
```

## Properties

| Prop               | Type                                                                                           | Description                                                                                                                                                                                                                                     | Default                |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `open`             | `boolean`                                                                                      | Determines if the `Tooltip` will appear as open or close.                                                                                                                                                                                       | `false`                |
| `setOpen`          | `function`                                                                                     | Callback to change the open state of the Tooltip in consuming applications.                                                                                                                                                                     | `(boolean) => boolean` |
| `refEl`            | `HTMLElement`                                                                                  | Pass a reference to an element that the beacon/tooltip(if stand-alone) should be centered against.                                                                                                                                              | `null`                 |
| `numberOfSteps`    | `number`                                                                                       | Used to display the number of steps. If `numberOfSteps` is `<= 1` then the step text will not show and a stand-alone tooltip without the beacon will be used.                                                                                   | `1`                    |
| `currentStep`      | `number`                                                                                       | Used to display the current step                                                                                                                                                                                                                | `1`                    |
| `darkMode`         | `boolean`                                                                                      | Determines whether the `Tooltip` will appear in dark mode.                                                                                                                                                                                      | `false`                |
| `title`            | `string`                                                                                       | Title to appear inside of Tooltip.                                                                                                                                                                                                              | `''`                   |
| `children`         | `React.ReactNode`                                                                              | Body content to appear inside the tooltip, under the title.                                                                                                                                                                                     | `''`                   |
| `buttonText`       | `string`                                                                                       | Text to appear inside the primary button. If no string is provided then it defaults to `'Next'` if the `currentStep < numberOfSteps` or `'Got it'` if `currentStep === numberOfSteps`.                                                          | `'Next'`               |
| `onClose`          | `function`                                                                                     | Callback fired when the dismiss(X) button is clicked or when the `Esc` key is pressed. This only applies to the multi-step guided tooltip.                                                                                                      | `() => {}`             |
| `onButtonClick`    | `function`                                                                                     | Callback fired when the bottom primary button is clicked. This applies to both the stand-alone and guided multi-step guided tooltip. This is also fired when the `Esc` key is pressed in the stand-alone tooltip.                               | `() => {}`             |
| `tooltipClassName` | `string`                                                                                       | ClassName to be applied to the tooltip element.                                                                                                                                                                                                 | `''`                   |
| `tooltipAlign`     | `'top'` \| `'bottom'` \| `'left'` \| `'right'`                                                 | Determines the alignment of the tooltip.                                                                                                                                                                                                        | `top`                  |
| `tooltipJustify`   | `'start'` \| `'middle'` \| `'end'`                                                             | Determines the justification of the tooltip.                                                                                                                                                                                                    | `middle`               |
| `beaconAlign`      | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'center-horizontal'` \| `'center-vertical'` | Determines the alignment of the beacon. This is only applied when `numberOfSteps is > 1`, making it a multi-step guided tooltip.                                                                                                                | `center-horizontal`    |
| `portalContainer`  | `HTMLElement` \| `null`                                                                        | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same refrence to `scrollContainer` and `portalContainer`. |                        |
| `scrollContainer`  | `HTMLElement` \| `null`                                                                        | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that lement to allow the portal to position properly.                                                                            |                        |
| `portalClassName`  | `string`                                                                                       | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                     |                        |
| `popoverZIndex`    | `number`                                                                                       | Sets the z-index CSS property for the popover.                                                                                                                                                                                                  |                        |
| ...                | native `div` attributes                                                                        | Any other props will be spread on the root `div` element                                                                                                                                                                                        |                        |
