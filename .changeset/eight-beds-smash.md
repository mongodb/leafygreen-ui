---
'@leafygreen-ui/date-picker': major
---

Changes the behavior of segments.

## New Behavior

### Backspace
- Pressing `backspace` will always clear the segment and keep the focus on that segment
- Pressing `backspace` twice will clear the segment and move the focus to the previous segment

### Space
- Pressing `space` will always clear the segment and keep the focus on that segment

### Clicking
#### When initially clicking on a segment with a value, the segment will select the value:
- Typing a digit will clear the segment and populate the segment with that new value.
- Pressing the `backspace` key will clear the segment
- Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
- Pressing the `space` key will clear the segment

#### When initially clicking on a segment without a value, the segment will show a cursor:
- Typing a digit will start to populate the segment
- Pressing the `backspace` key will move the focus to the previous segment
- Pressing the `space` key will keep the focus on that segment

#### When a segment is already selected, clicking on the segment a second time will deselect the segment, and a cursor will appear:
- Typing a digit will clear the segment and populate the segment with that new value.
- Pressing the `backspace` key will clear the segment
- Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
- Pressing the `space` key will clear the segment

### Tabbing and Left/Right arrows
#### When when using the arrow keys or tabbing into a segment with a value, the segment will select the value:
- Typing a digit will reset the segment and populate the segment with that new value.
- Pressing the `backspace` key will clear the segment
- Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
- Pressing the `space` key will clear the segment

#### When using the arrow keys or tabbing into a segment without a value, the segment will show a cursor:
- Typing a digit will start to populate the segment
- Pressing the `backspace` key will move the focus to the previous segment
- Pressing the `space` key will keep the focus on that segment


## Old Behavior

### Backspace
- Pressing `backspace` deletes characters before the cursor one by one
- After all characters are deleted, the focus moves to the previous segment

### Space
- Pressing `space` does not change the current value

### Clicking
- Clicking on a segment will make the cursor appear in the clicked spot.
- If the segment is full, typing will not change the value
- If the segment is not full, typing will not add a new character after the cursor

### Tabbing
- Tabbing into a segment will select the value, but pressing space does not reset the value

### Left/Right arrows
- When in a segment, `left`/`right` arrow keys move through each character, but typing does not update the value