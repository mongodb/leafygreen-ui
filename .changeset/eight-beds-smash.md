---
'@leafygreen-ui/date-picker': major
---

Changes the behavior of segments.

## Backspace

### New Behavior
- Pressing `backspace` will always clear the segment and keep the focus on that segment
- Pressing `backspace` twice will clear the segment and move the focus to the previous segment

### Old Behavior
- Pressing `backspace` deletes characters before the cursor one by one
- After all characters are deleted, the focus moves to the previous segment

## Space

### New Behavior
- Pressing `space` will always clear the segment and keep the focus on that segment

### Old Behavior
- Pressing `space` does not change the current value

## Clicking

### New Behavior
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

### Old Behavior
- Clicking on a segment will make the cursor appear in the clicked spot.
- If the segment is full, typing will not change the value
- If the segment is not full, typing will not add a new character after the cursor

## Tabbing and Left/Right arrows

### New behavior
#### When when using the arrow keys or tabbing into a segment with a value, the segment will select the value:
- Typing a digit will reset the segment and populate the segment with that new value.
- Pressing the `backspace` key will clear the segment
- Pressing the `backspace` key twice will clear the segment and move the focus to the previous segment
- Pressing the `space` key will clear the segment

#### When using the arrow keys or tabbing into a segment without a value, the segment will show a cursor:
- Typing a digit will start to populate the segment
- Pressing the `backspace` key will move the focus to the previous segment
- Pressing the `space` key will keep the focus on that segment

## Tabbing
### Old Behavior
- Tabbing into a segment will select the value, but pressing `space` does not reset the value

## Left/Right arrows
### Old Behavior
- When in a segment, `left` or `right` arrow keys navigates through each character instead of selecting the value. 
- If the segment is full, typing does not update the value
- If the segment is not full, typing will add a new character in that spot