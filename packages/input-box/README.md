# Input Box

![npm (scoped)](https://img.shields.io/npm/v/@leafygreen-ui/input-box.svg)

## Installation

### PNPM

```shell
pnpm add @leafygreen-ui/input-box
```

### Yarn

```shell
yarn add @leafygreen-ui/input-box
```

### NPM

```shell
npm install @leafygreen-ui/input-box
```

## Example

```tsx
import { InputBox, InputSegment } from '@leafygreen-ui/input-box';
import { Size } from '@leafygreen-ui/tokens';

// 1. Create a custom segment component
const MySegment = ({ segment, ...props }) => (
  <InputSegment
    segment={segment}
    min={minValues[segment]}
    max={maxValues[segment]}
    {...props}
  />
);

// 2. Use InputBox with your segments
<InputBox
  segments={{ day: '01', month: '02', year: '2025' }}
  setSegment={(segment, value) => console.log(segment, value)}
  segmentEnum={{ Day: 'day', Month: 'month', Year: 'year' }}
  segmentComponent={MySegment}
  formatParts={[
    { type: 'month', value: '02' },
    { type: 'literal', value: '/' },
    { type: 'day', value: '01' },
    { type: 'literal', value: '/' },
    { type: 'year', value: '2025' }
  ]}
  charsPerSegment={{ day: 2, month: 2, year: 4 }}
  segmentRefs={{ day: dayRef, month: monthRef, year: yearRef }}
  segmentRules={{
    day: { maxChars: 2, minExplicitValue: 1 },
    month: { maxChars: 2, minExplicitValue: 4 },
    year: { maxChars: 4, minExplicitValue: 1970 }
  }}
  disabled={false}
  size={Size.Default}
/>
```

Refer to `DateInputBox` in the `@leafygreen-ui/date-picker` package for an implementation example.

## Overview

An internal component intended to be used by any date or time component, such as `DatePicker`, `TimeInput`, etc.

This package provides two main components that work together to create segmented input experiences.

### InputBox

A generic controlled input box component that renders an input with multiple segments separated by literals.

**Key Features:**

- **Auto-format**: Automatically pads segment values with leading zeros (based on `charsPerSegment`) when they become explicit/unambiguous. A value is explicit when it either: (1) reaches the maximum character length, or (2) meets or exceeds the `minExplicitValue` threshold (e.g., typing "5" for day → "05", but typing "2" stays "2" since it could be 20-29). Also formats on blur.
- **Auto-focus**: Automatically advances focus to the next segment when the current segment is complete
- **Keyboard navigation**: Handles left/right arrow key navigation between segments
- **Segment management**: Renders segments and separators based on `formatParts` (from `Intl.DateTimeFormat`)

The component handles high-level interactions like moving between segments, while delegating segment-specific logic to the `InputSegment` component. Internally, it uses `InputBoxContext` to share state and handlers across all segments.

#### Props

| Prop               | Type                                                                         | Description                                                                                                                                                                   | Default |
| ------------------ | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `segments`         | `Record<Segment, string>`                                                    | An object containing the values of the segments.<br/><br/>Example: `{ day: '01', month: '02', year: '2025' }`                                                                |         |
| `setSegment`       | `(segment: Segment, value: string) => void`                                  | A function that sets the value of a segment.<br/><br/>Example: `(segment: 'day', value: '15') => void`                                                                       |         |
| `segmentEnum`      | `Record<string, Segment>`                                                    | An enumerable object that maps the segment names to their values.<br/><br/>Example: `{ Day: 'day', Month: 'month', Year: 'year' }`                                           |         |
| `segmentComponent` | `React.ComponentType<InputSegmentComponentProps<Segment>>`                   | React component to render each segment (must accept `InputSegmentComponentProps`).<br/><br/>Example: `DateInputSegment`                                                      |         |
| `formatParts`      | `Array<Intl.DateTimeFormatPart>`                                             | Array of `Intl.DateTimeFormatPart` defining segment order and separators.<br/><br/>Example:<br/>`[{ type: 'month', value: '02' },`<br/>`{ type: 'literal', value: '/' }, ...]` |         |
| `charsPerSegment`  | `Record<Segment, number>`                                                    | Record of maximum characters per segment.<br/><br/>Example: `{ day: 2, month: 2, year: 4 }`                                                                                  |         |
| `segmentRefs`      | `Record<Segment, ReturnType<DynamicRefGetter<HTMLInputElement>>>`            | Record mapping segment names to their input refs.<br/><br/>Example: `{ day: dayRef, month: monthRef, year: yearRef }`                                                        |         |
| `segmentRules`     | `Record<Segment, ExplicitSegmentRule>`                                       | Record of validation rules per segment with `maxChars` and `minExplicitValue`.<br/><br/>Example:<br/>`{ day: { maxChars: 2, minExplicitValue: 1 },`<br/>`month: { maxChars: 2, minExplicitValue: 4 }, ... }` |         |
| `disabled`         | `boolean`                                                                    | Whether the input is disabled                                                                                                                                                 |         |
| `size`             | `Size`                                                                       | Size of the input.<br/><br/>Example: `Size.Default`, `Size.Small`, or `Size.XSmall`                                                                                          |         |
| `onSegmentChange`  | `InputSegmentChangeEventHandler<Segment, string>`                            | Optional callback fired when any segment changes                                                                                                                              |         |
| `labelledBy`       | `string`                                                                     | ID of the labelling element for accessibility.<br/><br/>Example: `'date-input-label'`                                                                                        |         |

\+ other HTML `div` element props

### InputSegment

A controlled input segment component that renders a single input field within an `InputBox`.

**Key Features:**

- **Up/down arrow key navigation**: Increment/decrement segment values using arrow keys
- **Value validation**: Validates input against configurable min/max ranges
- **Auto-formatting**: Formats values with leading zeros based on character length
- **Rollover support**: Optionally rolls over values (e.g., 31 → 1 for days, or stops at boundaries)
- **Keyboard interaction**: Handles backspace and space keys to clear values
- **onChange/onBlur events**: Fires custom change events with segment metadata

#### Props

| Prop                   | Type      | Description                                                                                                                     | Default |
| ---------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `segment`              | `string`  | The segment identifier.<br/><br/>Example: `'day'`, `'month'`, or `'year'`                                                      |         |
| `min`                  | `number`  | Minimum valid value for the segment.<br/><br/>Example: `1` for day, `1` for month, `1900` for year                             |         |
| `max`                  | `number`  | Maximum valid value for the segment.<br/><br/>Example: `31` for day, `12` for month, `2100` for year                           |         |
| `step`                 | `number`  | Increment/decrement step for arrow keys                                                                                         | `1`     |
| `shouldWrap`           | `boolean` | Whether values should wrap around at min/max boundaries.<br/><br/>Example: `true` to wrap 31 → 1 for days                      |         |
| `shouldSkipValidation` | `boolean` | Skips validation for segments that allow extended ranges                                                                        |         |

\+ native HTML `input` element props
