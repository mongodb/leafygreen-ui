---
'@lg-chat/message-actions': minor
---

[LG-5414](https://jira.mongodb.org/browse/LG-5414)

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
