describe('packages/date-picker', () => {
  describe('Mouse interaction', () => {
    describe('Clicking the input', () => {
      test.todo('focuses the first empty segment');
      test.todo('opens the menu');
    });

    describe('Clicking a Calendar cell', () => {
      test.todo('fires a change handler');
      test.todo('does nothing if the cell is out-of-range');
    });

    describe('Clicking a Chevron', () => {
      test.todo('Left updates the displayed month to the previous');
      test.todo('Right updates the displayed month to the next');
      test.todo('Left is disabled if prev. month is entirely out of range');
      test.todo('Right is disabled if next month is entirely out of range');
    });

    describe('Clicking the month select menu', () => {
      test.todo('does not close calendar menu');
      test.todo('opens over the calendar menu');
      test.todo('selecting the month updates the calendar');
    });

    describe('Clicking the year select menu', () => {
      test.todo('does not close calendar menu');
      test.todo('opens over the calendar menu');
      test.todo('selecting the year updates the calendar');
    });

    describe('Clicking backdrop', () => {
      test.todo('does not fire a change handler');
      test.todo('closes the menu');
    });
  });

  describe('Typing', () => {
    describe('Typing into the input', () => {
      test.todo('fires a change handler when the value is a valid date');
      test.todo('does not fire a change handler when the value is incomplete');
      test.todo('focuses the next segment if the segment value is valid');
      test.todo('fires a validation handler if the value is updated');
    });

    describe('Delete key', () => {
      test.todo('deletes any value in the input');
      test.todo('deletes the whole value on multiple presses');
      test.todo('focuses the previous segment if current segment is empty');
    });
  });

  describe('Keyboard navigation', () => {
    describe('Tab', () => {
      describe('when the menu is open', () => {
        test.todo('tab 1: Input'); // TODO: Should tab focus each segment separately?
        test.todo('tab 2: Left Chevron');
        test.todo('tab 3: Month menu');
        test.todo('tab 4: Year menu');
        test.todo('tab 5: Right Chevron');
        test.todo('tab 6: Calendar grid (selected date)');
        test.todo('tab 7: Returns to Input');
      });
      describe('when menu is closed', () => {
        test.todo('tab 1: Input'); // TODO: Should tab focus each segment separately?
        test.todo('tab 2: next element in tab order');
      });
    });

    describe('Up/Down Arrow', () => {
      describe('when the input is focused', () => {
        test.todo('up arrow increments the segments value');
        test.todo('down arrow decrements the segments value');
      });
      describe('when any menu element is focused', () => {});
    });

    describe('Left/Right Arrow', () => {
      describe('when the input is focused', () => {
        describe('when the segment is empty', () => {
          test.todo('left arrow focuses the prev. segment');
          test.todo('right arrow focuses the next segment');
        });

        describe('when the segment has a value', () => {
          test.todo('left arrow moves the cursor');
          test.todo('right moves the cursor');
        });
      });
      describe('when any menu element is focused', () => {
        test.todo('up arrow decrements the week by 1');
        test.todo('down arrow decrements the week by 1');
        test.todo('left arrow decrements the day by 1');
        test.todo('right arrow increments the day by 1');
        test.todo('up arrow changes the displayed month if necessary');
        test.todo('down arrow changes the displayed month if necessary');
        test.todo('left arrow changes the displayed month if necessary');
        test.todo('right arrow changes the displayed month if necessary');
      });
    });

    describe('Enter key', () => {
      test.todo('fires a change handler');
      test.todo('closes the menu');
      test.todo('if month/year select is open, updates the displayed month');
      test.todo('if menu is closed, opens the menu');
    });

    describe('Escape key', () => {
      test.todo('closes the menu');
      test.todo('does not fire a change handler');
      test.todo('focus remains on the input element');
    });
  });
});
