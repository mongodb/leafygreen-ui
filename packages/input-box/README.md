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
// InputBox will pass: segment, value, onChange, onBlur, segmentEnum, disabled, ref, aria-labelledby
// You add: minSegmentValue, maxSegmentValue, charsCount, size, and any other InputSegment props
const MySegment = ({
  segment,
  value,
  onChange,
  onBlur,
  segmentEnum,
  disabled,
  ...props
}) => (
  <InputSegment
    segment={segment}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    segmentEnum={segmentEnum}
    disabled={disabled}
    minSegmentValue={minValues[segment]}
    maxSegmentValue={maxValues[segment]}
    charsCount={charsPerSegment[segment]}
    size={Size.Default}
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
    { type: 'year', value: '2025' },
  ]}
  segmentRefs={{ day: dayRef, month: monthRef, year: yearRef }}
  segmentRules={{
    day: { maxChars: 2, minExplicitValue: 4 },
    month: { maxChars: 2, minExplicitValue: 2 },
    year: { maxChars: 4, minExplicitValue: 1970 },
  }}
  disabled={false}
/>;
```

Refer to `DateInputBox` in the `@leafygreen-ui/date-picker` package for a full implementation example.

## Overview

An internal component for building date or time inputs with multiple segments (e.g., `DatePicker`, `TimeInput`).

### How It Works

`InputBox` handles the high-level coordination (navigation, formatting, focus management), while `InputSegment` handles individual segment behavior (validation, arrow key increments).

**The `segmentComponent` Pattern:**

`InputBox` doesn't directly render `InputSegment` components. Instead, you provide a custom `segmentComponent` that acts as a wrapper:

1. **InputBox automatically passes** these props to your `segmentComponent`:

   - `segment` - the segment identifier (e.g., `'day'`, `'month'`)
   - `value` - the current segment value
   - `onChange` - change handler for the segment
   - `onBlur` - blur handler for the segment
   - `segmentEnum` - the segment enum object
   - `disabled` - whether the segment is disabled
   - `ref` - ref for the input element
   - `aria-labelledby` - accessibility label reference
   - `charsCount` - character length
   - `size` - input size

2. **Your `segmentComponent` adds** segment-specific configuration:
   - `minSegmentValue` / `maxSegmentValue` - validation ranges
   - `step`, `shouldWrap`, `shouldValidate` - optional behavior customization

This pattern allows you to define segment-specific rules (like min/max values that vary by segment) while keeping the core InputBox logic generic and reusable.

### InputBox

A generic controlled input component that renders multiple segments separated by literals (e.g., `MM/DD/YYYY`).

**Key Features:**

- **Auto-format**: Pads values with leading zeros when explicit (reaches max length or `minExplicitValue` threshold)
- **Auto-advance**: Moves focus to next segment when current segment is complete
- **Keyboard navigation**: Arrow keys move between segments, backspace navigates back when empty

#### Props

| Prop               | Type                                                       | Description                                                                    | Default |
| ------------------ | ---------------------------------------------------------- | ------------------------------------------------------------------------------ | ------- |
| `segments`         | `Record<Segment, string>`                                  | Current values for all segments                                                |         |
| `setSegment`       | `(segment: Segment, value: string) => void`                | Callback to update a segment's value                                           |         |
| `segmentEnum`      | `Record<string, Segment>`                                  | Maps segment names to values (e.g., `{ Day: 'day' }`)                          |         |
| `segmentComponent` | `React.ComponentType<InputSegmentComponentProps<Segment>>` | Custom wrapper component that renders InputSegment with segment-specific props |         |
| `formatParts`      | `Array<Intl.DateTimeFormatPart>`                           | Defines segment order and separators                                           |         |
| `segmentRefs`      | `Record<Segment, React.RefObject<HTMLInputElement>>`       | Refs for each segment input                                                    |         |
| `segmentRules`     | `Record<Segment, ExplicitSegmentRule>`                     | Rules for auto-formatting (`maxChars`, `minExplicitValue`)                     |         |
| `disabled`         | `boolean`                                                  | Disables all segments                                                          |         |
| `onSegmentChange`  | `InputSegmentChangeEventHandler<Segment, string>`          | Callback fired on any segment change                                           |         |
| `labelledBy`       | `string`                                                   | ID of labelling element for accessibility                                      |         |

\+ other HTML `div` props

### InputSegment

A generic controlled input field for a single segment within `InputBox`.

**Key Features:**

- **Arrow key increment/decrement**: Up/down arrows adjust values with optional wrapping
- **Value validation**: Validates against min/max ranges
- **Keyboard shortcuts**: Backspace/Space clears the value

#### Props

| Prop              | Type                                              | Description                                  | Default |
| ----------------- | ------------------------------------------------- | -------------------------------------------- | ------- |
| `segment`         | `Segment`                                         | Segment identifier (e.g., `'day'`)           |         |
| `value`           | `string`                                          | Current segment value                        |         |
| `minSegmentValue` | `number`                                          | Minimum valid value                          |         |
| `maxSegmentValue` | `number`                                          | Maximum valid value                          |         |
| `charsCount`      | `number`                                          | Max character length                         |         |
| `size`            | `Size`                                            | Input size                                   |         |
| `segmentEnum`     | `Record<string, Segment>`                         | Segment enum from InputBox                   |         |
| `onChange`        | `InputSegmentChangeEventHandler<Segment, string>` | Change handler                               |         |
| `onBlur`          | `FocusEventHandler<HTMLInputElement>`             | Blur handler                                 |         |
| `disabled`        | `boolean`                                         | Disables the segment                         |         |
| `step`            | `number`                                          | Arrow key increment/decrement step           | `1`     |
| `shouldWrap`      | `boolean`                                         | Whether to wrap at boundaries (e.g., 31 → 1) | `true`  |
| `shouldValidate`  | `boolean`                                         | Whether to validate against min/max          | `true`  |

\+ native HTML `input` props
