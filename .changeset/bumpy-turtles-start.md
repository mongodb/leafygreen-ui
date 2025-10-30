---
'@leafygreen-ui/code-editor': minor
---

Fixes a number of bugs. These include:

- Adds gutter padding between the border and the caret when line numbers are turned off
- Fixes icon button vertical alignment in the panel
- Adds comprehensive story, that also include tooltips
- Increases tooltip speed
- Fixes collapsed chevron alignment
- Darkens unfold icon in dark mode
- Fixes widths. This includes making sure the panel and editor containers respect any set widths
- Corrects the color of the copied icon checkmark
- Disabled undo/redo when no undo/redo actions are available
- Hides blinking cursor when editor is in read only mode
- Allows for CTRL+click to pull up the context menu without losing the selection.
- Insert the cursor in the location of the undone action when the undo button is pressed in the panel menu
- Sets the loading height to be the same height as the future rendered editor
- Persists editor when props change
- Assures that font size and dark mode are respected in the panel
- Enhances tests
