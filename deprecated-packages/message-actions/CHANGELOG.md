# @lg-chat/message-actions

## 1.1.3

### Patch Changes

- cee1e79: Interfaces now extend built-in `React.ComponentType` rather than custom `HTMLElementProps` for compatability with React 19
- Updated dependencies [1a5c69f]
- Updated dependencies [aeb3b3f]
- Updated dependencies [3471b94]
- Updated dependencies [6f30c55]
- Updated dependencies [cee1e79]
- Updated dependencies [6f30c55]
  - @leafygreen-ui/icon@14.5.1
  - @leafygreen-ui/icon-button@17.0.6
  - @lg-chat/message-feedback@7.0.3
  - @lg-chat/message-rating@5.0.3
  - @lg-chat/message@8.1.1
  - @leafygreen-ui/lib@15.4.0
  - @leafygreen-ui/emotion@5.0.3

## 1.1.2

### Patch Changes

- dc3299b: Adds "exports" field to all packages
  Enables TS downleveling to TS 4.9
- a9eb172: Deprecate `MessageActions` and `MessageActionsProps`. Use `Message.Actions` from @lg-chat/message instead.
- Updated dependencies [a9eb172]
- Updated dependencies [a9eb172]
- Updated dependencies [a9eb172]
- Updated dependencies [5ef631a]
- Updated dependencies [a9eb172]
- Updated dependencies [dc3299b]
  - @lg-chat/message@8.1.0
  - @leafygreen-ui/lib@15.3.0
  - @leafygreen-ui/icon@14.5.0
  - @lg-chat/leafygreen-chat-provider@5.0.2
  - @lg-chat/message-feedback@7.0.2
  - @lg-chat/message-rating@5.0.2
  - @leafygreen-ui/emotion@5.0.2
  - @leafygreen-ui/icon-button@17.0.5
  - @leafygreen-ui/leafygreen-provider@5.0.4
  - @leafygreen-ui/tokens@3.2.4
  - @lg-tools/test-harnesses@0.3.4

## 1.1.1

### Patch Changes

- 172c228: Removes `*.spec.ts` files from tsconfig `exclude` pattern, ensuring that tests are type-checked at build time.
  Also adds missing TS "references" for packages that are imported into test files
- Updated dependencies [172c228]
- Updated dependencies [172c228]
  - @lg-chat/leafygreen-chat-provider@5.0.1
  - @leafygreen-ui/emotion@5.0.1
  - @leafygreen-ui/icon@14.4.1
  - @leafygreen-ui/icon-button@17.0.4
  - @leafygreen-ui/leafygreen-provider@5.0.3
  - @leafygreen-ui/lib@15.2.1
  - @leafygreen-ui/tokens@3.2.3
  - @lg-chat/message@8.0.1
  - @lg-chat/message-feedback@7.0.1
  - @lg-chat/message-rating@5.0.1
  - @lg-tools/test-harnesses@0.3.3

## 1.1.0

### Minor Changes

- 8b4f493: [LG-5414](https://jira.mongodb.org/browse/LG-5414)

  #### Changes

  - Enabled async form submission
  - Added error and loading states
  - Added `errorMessage` prop for customizing error message

  #### Fixes

  - Removed deselection of rating when feedback form is closed

  #### Example

  ```tsx
  <MessageActions
    onSubmitFeedback={async (e, { rating, feedback }) => {
      try {
        await submitToAPI({ rating, feedback });
      } catch (error) {
        throw error; // Component handles error state automatically
      }
    }}
    errorMessage="Custom error message"
  />
  ```

### Patch Changes

- Updated dependencies [8b4f493]
- Updated dependencies [f87b084]
  - @lg-chat/message-feedback@7.0.0
  - @leafygreen-ui/icon@14.4.0
  - @lg-chat/message@8.0.0

## 1.0.0

### Patch Changes

- Updated dependencies [d72b413]
  - @lg-chat/leafygreen-chat-provider@5.0.0
  - @lg-chat/message@8.0.0
  - @lg-chat/message-feedback@6.0.0
  - @lg-chat/message-rating@5.0.0
