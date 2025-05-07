# Test Generation Instructions

These guidelines are intended to standardize how tests are generated for this codebase. They are designed to be both human- and AI-readable to ensure consistency and compatibility with tools like GitHub Copilot.

## Scope of Test Generation

When generating tests, prioritize:
- Component rendering (with and without props)
- Behavioral logic (interactions, conditional rendering)
- Accessibility (use `jest-axe`)
- Keyboard/mouse interaction
- Refs and focus management
- Custom hooks and utils (unit test independently)

## Testing stack

- `@testing-library/dom`: 9.3.1
- `@testing-library/jest-dom`: 5.17.0
- `@testing-library/react`: 14.0.0
- `@testing-library/react-hooks`: 8.0.1
- `@testing-library/user-event`: 13.5.0
- `babel-jest`: 29.7.0
- `jest`: 29.6.2
- `jest-axe`: 8.0.0
- `jest-canvas-mock`: 2.5.1
- `jest-environment-jsdom`: 29.6.2
- `jest-junit`: 16.0.0
- `react-test-renderer`: 18.2.0

## File structure

- Tests should be colocated with the component under test (e.g. `MyComponent/MyComponent.spec.tsx` contains tests for `MyComponent/MyComponent.tsx`)
- use `*.spec.tsx` or `*.spec.ts` file extensions

## Test conventions

- Use a root `describe` block for the main component exported from a package
- Use `test`, not `it`, to describe specific behaviors
- Use `userEvent` for interaction simulation when possible
- Use `jest-axe` for accessibility tests
- Add `data-testid` sparingly, only when semantic queries aren't possible
