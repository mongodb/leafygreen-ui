---
'@lg-chat/message-feedback': major
---

[LG-5414](https://jira.mongodb.org/browse/LG-5414)

#### Breaking Changes

- Replaced `isSubmitted` boolean prop with `state` enum prop with default of `'unset'`

#### Non-breaking Changes

- Enabled async form submission
- Added error and loading states
- Added `errorMessage` prop for customizing error message
- Fixed accessibility for label/textarea relationship

#### Migration Guide

##### Before

```tsx
import { InlineMessageFeedback } from '@lg-chat/message-feedback';

<InlineMessageFeedback
  isSubmitted={true}
  onSubmit={handleSubmit}
/>
```

##### After

```tsx
import { FormState, InlineMessageFeedback } from '@lg-chat/message-feedback';

<InlineMessageFeedback
  state={FormState.Submitted}
  onSubmit={handleSubmit} // Can now be async
/>
```
