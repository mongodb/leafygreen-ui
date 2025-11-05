# Internal Input Box

An internal component intended to be used by any date or time component, such as `DatePicker`, `TimeInput`, etc.

This package provides two main components that work together to create segmented input experiences:

## Components

### InputBox

A generic controlled input box component that renders an input with multiple segments separated by literals.

**Key Features:**

- **Auto-format**: Automatically formats segment values when they reach an explicit state (e.g., when a day value becomes unambiguous)
- **Auto-focus**: Automatically advances focus to the next segment when the current segment is complete
- **Keyboard navigation**: Handles left/right arrow key navigation between segments
- **Segment management**: Renders segments and separators based on `formatParts` (from `Intl.DateTimeFormat`)

The component handles high-level interactions like moving between segments, while delegating segment-specific logic to the `InputSegment` component. Internally, it uses `InputBoxContext` to share state and handlers across all segments.

**Props:**

- `segments`: Record of current segment values (e.g., `{ day: '01', month: '02', year: '2025' }`)
- `setSegment`: Function to update a segment value `(segment, value) => void`
- `segmentEnum`: Enumerable object mapping segment names to values (e.g., `{ Day: 'day', Month: 'month', Year: 'year' }`)
- `segmentComponent`: React component to render each segment (must accept `InputSegmentComponentProps`)
- `formatParts`: Array of `Intl.DateTimeFormatPart` defining segment order and separators
- `charsPerSegment`: Record of maximum characters per segment (e.g., `{ day: 2, month: 2, year: 4 }`)
- `segmentRefs`: Record mapping segment names to their input refs
- `segmentRules`: Record of validation rules per segment with `maxChars` and `minExplicitValue`
- `disabled`: Whether the input is disabled
- `size`: Size of the input (`Size.Default`, `Size.Small`, or `Size.XSmall`)
- `onSegmentChange`: Optional callback fired when any segment changes
- `labelledBy`: ID of the labelling element for accessibility
- Standard div props are also supported (className, onKeyDown, etc.)

### InputSegment

A controlled input segment component that renders a single input field within an `InputBox`.

**Key Features:**

- **Up/down arrow key navigation**: Increment/decrement segment values using arrow keys
- **Value validation**: Validates input against configurable min/max ranges
- **Auto-formatting**: Formats values with leading zeros based on character length
- **Rollover support**: Optionally rolls over values (e.g., 31 → 1 for days, or stops at boundaries)
- **Keyboard interaction**: Handles backspace and space keys to clear values
- **onChange/onBlur events**: Fires custom change events with segment metadata

**Props:**

- `segment`: The segment identifier (e.g., 'day', 'month', 'year')
- `min`/`max`: Valid range for the segment value
- `step`: Increment/decrement step for arrow keys (default: 1)
- `shouldWrap`: Whether values should wrap around at min/max boundaries
- `shouldSkipValidation`: Skips validation for segments that allow extended ranges
- native input props are passed through to the input element

## Usage

**Basic pattern:**

```tsx
import { InputBox, InputBoxProvider } from '@leafygreen-ui/input-box';

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
  segments={segments}
  setSegment={setSegment}
  segmentEnum={MySegmentEnum}
  segmentComponent={MySegment}
  formatParts={formatParts}
  charsPerSegment={charsPerSegment}
  segmentRefs={segmentRefs}
  segmentRules={segmentRules}
  disabled={false}
  size={Size.Default}
/>;
```

Refer to `DateInputBox` in the `@leafygreen-ui/date-picker` package for a implementation example.

## Installation

```bash
pnpm add @leafygreen-ui/input-box
```
