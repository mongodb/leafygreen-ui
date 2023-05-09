# GuideCue

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/guide-cue.svg)

#### [View on MongoDB.design](https://www.mongodb.design/component/guide-cue/example/)

## Installation

### Yarn

```shell
yarn add @leafygreen-ui/guide-cue
```

### NPM

```shell
npm install @leafygreen-ui/guide-cue
```

## Example

### Stand-alone example

```js
import { GuideCue } from '@leafygreen-ui/guide-cue';

const [open, setOpen] = useState(true);

<GuideCue
  open={open}
  setOpen={setOpen}
  title="New feature"
  refEl={triggerRef}
  numberOfSteps={1}
  currentStep={1}
  onPrimaryButtonClick={() => {
    // do something
  }}
>
  This is a new feature. You should try it out
</GuideCue>;
```

or

### Multi-step example

```js
import GuideCue from '@leafygreen-ui/guide-cue';

const [open, setOpen] = useState(true);

<GuideCue
  open={open}
  setOpen={setOpen}
  title="New feature"
  refEl={triggerRef}
  numberOfSteps={4}
  currentStep={2}
  onPrimaryButtonClick={() => {
    // do something
  }}
  onDismiss={() => {
    // do something
  }}
>
  This is a new feature. You should try it out
</GuideCue>;
```

An example of how to use the multi-step tooltip can be found in (storybook - MultistepDemo)[https://github.com/mongodb/leafygreen-ui/blob/main/packages/guide-cue/src/GuideCue.story.tsx]

## Usage

There are two variations of the tooltip -- stand-alone and multi-step. The multi-step tooltip shows the number of steps, has a dismiss and primary button, and displays a pulsing beacon while the stand-alone tooltip only shows the primary button and does not include the number of steps or the dismiss button.

The variant that is shown depends on the number of steps. If `numberOfSteps > 1` the multi-step tooltip is shown else the stand-alone tooltip is shown.

## Properties

| Prop                   | Type                                                                                           | Description                                                                                                                                                                                                                                                                | Default                |
| ---------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `open`                 | `boolean`                                                                                      | Determines if the `Tooltip` will appear as open or close.                                                                                                                                                                                                                  | `false`                |
| `setOpen`              | `function`                                                                                     | Callback to change the open state of the Tooltip.                                                                                                                                                                                                                          | `(boolean) => boolean` |
| `refEl`                | `HTMLElement`                                                                                  | Reference to an element that the tooltip should be positioned against.                                                                                                                                                                                                     | `null`                 |
| `numberOfSteps`        | `number`                                                                                       | Used to determine which tooltip will be shown. If `numberOfSteps > 1` then the multi-step tooltip will be shown else the stand-alone tooltip will be shown. This number will only be displayed in the multi-step tooltip.                                                  | `1`                    |
| `currentStep`          | `number`                                                                                       | Used to display the current step. If `numberOfSteps === 1` this number will not display.                                                                                                                                                                                   | `1`                    |
| `darkMode`             | `boolean`                                                                                      | Determines whether the `Tooltip` will appear in dark mode.                                                                                                                                                                                                                 | `false`                |
| `title`                | `string`                                                                                       | Title to appear inside of Tooltip.                                                                                                                                                                                                                                         | `''`                   |
| `children`             | `React.ReactNode`                                                                              | Body content to appear inside the tooltip, under the title.                                                                                                                                                                                                                | `''`                   |
| `buttonText`           | `string`                                                                                       | Text to appear inside the primary button. The default text for the stand-alone tooltip is `Got it`. The default text for the multi-step tooltip varies on the `numberOfSteps` and `currentStep`. If `numberOfSteps === currentStep` the text is `Got it` else it is `Next. | `'Next'`               |
| `onDismiss`            | `function`                                                                                     | Callback fired when the dismiss(X) button is clicked or when the `Esc` key is pressed. This only applies to the multi-step tooltip.                                                                                                                                        | `() => {}`             |
| `onPrimaryButtonClick` | `function`                                                                                     | Callback fired when the bottom primary button is clicked. This applies to both the stand-alone and multi-step tooltip. This is also fired when the `Esc` key is pressed in the stand-alone tooltip.                                                                        | `() => {}`             |
| `tooltipClassName`     | `string`                                                                                       | ClassName to be applied to the tooltip element.                                                                                                                                                                                                                            | `''`                   |
| `tooltipAlign`         | `'top'` \| `'bottom'` \| `'left'` \| `'right'`                                                 | Determines the alignment of the tooltip.                                                                                                                                                                                                                                   | `top`                  |
| `tooltipJustify`       | `'start'` \| `'middle'` \| `'end'`                                                             | Determines the justification of the tooltip.                                                                                                                                                                                                                               | `middle`               |
| `beaconAlign`          | `'top'` \| `'bottom'` \| `'left'` \| `'right'` \| `'center-horizontal'` \| `'center-vertical'` | Determines the alignment of the beacon(animated pulsing circle that appears on top of the trigger element). This only applies to the multi-step tooltip.                                                                                                                   | `center-horizontal`    |
| `portalContainer`      | `HTMLElement` \| `null`                                                                        | Sets the container used for the popover's portal. NOTE: If using a `scrollContainer` make sure that the `portalContainer` is contained within the `scrollContainer`. E.g, passing the same refrence to `scrollContainer` and `portalContainer`.                            |                        |
| `scrollContainer`      | `HTMLElement` \| `null`                                                                        | If the popover portal has a scrollable ancestor other than the window, this prop allows passing a reference to that element to allow the portal to position properly.                                                                                                      |                        |
| `portalClassName`      | `string`                                                                                       | Passes the given className to the popover's portal container if the default portal container is being used.                                                                                                                                                                |                        |
| `popoverZIndex`        | `number`                                                                                       | Sets the z-index CSS property for the popover.                                                                                                                                                                                                                             |                        |
| ...                    | native `div` attributes                                                                        | Any other props will be spread on the tooltip `div` element                                                                                                                                                                                                                |                        |
