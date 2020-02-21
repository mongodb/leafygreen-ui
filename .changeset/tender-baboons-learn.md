---
'@leafygreen-ui/mongo-nav': minor
'@leafygreen-ui/side-nav': minor
'@leafygreen-ui/lib': minor
---

This introduces the following updaters:
- Lib is updated internally with shared test helpers
- Side Nav is updated to match design standards, and to export width and side padding so that users can reference both in integrating the side nav without hardcoding these values and to future-proof design changes
- Mongo Nav is updated with a disabled state for the Org Nav, used for pages where there is no concept of a current project or orgqnization. Additionally, Mongo Nav exports the different nav heights for the above reason
