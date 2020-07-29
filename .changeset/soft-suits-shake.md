---
'@leafygreen-ui/code': major
'@leafygreen-ui/syntax': major
---

Updates Syntax component to use the Highlight.js plugin API to render syntax.

This helps in a couple ways:
- Lets us remove the only instance of `dangerouslySetInnerHTML` within LeafyGreen UI by rendering syntax highlighting through React directly.
- Allows us to render the component's content as a Table. This allows us to fix an alignment issue between line numbers and wrapped text, as well as opens the door for future features.
