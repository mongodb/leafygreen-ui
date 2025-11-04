# Internal Input Box

An internal component intended to be used by any date or time component, such as `DatePicker`, `TimeInput`, etc.

This package provides three main components that work together to create segmented input experiences:

## Components

### InputBox

A generic controlled input box component that renders an input with multiple segments separated by literals.

**Key Features:**

- **Auto-format**: Automatically formats segment values when they reach an explicit state (e.g., when a day value becomes unambiguous)
- **Auto-focus**: Automatically advances focus to the next segment when the current segment is complete
- **Keyboard navigation**: Handles left/right arrow key navigation between segments
- **Segment management**: Renders segments and separators based on `formatParts` (from `Intl.DateTimeFormat`)

The component handles high-level interactions like moving between segments, while delegating segment-specific logic to the `InputSegment` component.

### InputBoxContext

A React context provider that shares common state and handlers across all input segments.

**Provides:**

- `charsPerSegment`: Maximum character length for each segment
- `segments`: Current values for all segments
- `segmentRefs`: References to each segment's input element
- `segmentEnum`: Enumeration mapping segment names to their values
- `onChange`: Handler for segment value changes
- `onBlur`: Handler for segment blur events
- `labelledBy`: ID of the labelling element for accessibility
- `size`: Size of the input components
- `disabled`: Disabled state of the input

This context allows `InputSegment` components to access shared configuration and state without prop drilling, while maintaining type safety through generics.

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
- `shouldRollover`: Whether values should wrap around at boundaries
- `shouldSkipValidation`: Skips validation for segments that allow extended ranges

## Usage

Refer to `DateInputBox` in the `@leafygreen-ui/date-picker` package for a complete implementation example.

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
  minValues={minValues}
  disabled={false}
  size={Size.Default}
/>;
```

## Installation

This is an internal package and should only be used by other LeafyGreen UI components.

```bash
pnpm add @leafygreen-ui/input-box
```
