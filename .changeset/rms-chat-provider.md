---
'@lg-chat/leafygreen-chat-provider': major
---

- Removed `variant` prop and `Variant` enum export. The provider no longer supports variant selection (spacious/compact). All components now use a single, consistent design.
- Removed `containerWidth` from context value. This was only used in spacious variants.
- Removed wrapper `div` element from `LeafyGreenChatProvider`.
- Removed `use-resize-observer` dependency.
