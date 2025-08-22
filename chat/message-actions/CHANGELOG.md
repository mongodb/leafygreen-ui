# @lg-chat/message-actions

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
