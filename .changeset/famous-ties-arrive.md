---
'@leafygreen-ui/select': minor
---

Adds controlled component functionality for managing open/closed state

## New Features

- **Controlled Open State**: Added `open` and `setOpen` props to allow external control of the dropdown's open/closed state
- **Hybrid Mode Support**: Component can now be used in both controlled and uncontrolled modes for the open state
- **Developer Warnings**: Added helpful console warnings when `open` prop is provided without `setOpen` handler

## API Changes

### New Props
- `open?: boolean` - Controls whether the dropdown menu is open
- `setOpen?: (open: boolean) => void` - Callback function called when open state should change

## Documentation & Examples

- **README**: Updated with new prop documentation and usage examples
- **Storybook**: Added comprehensive stories demonstrating:
  - Basic controlled open state functionality
  - Advanced scenarios with external triggers
  - Settings panel integration patterns
  - State visualization and debugging helpers

## Backward Compatibility

All existing Select usage remains unchanged. The new props are optional and the component maintains full backward compatibility.
