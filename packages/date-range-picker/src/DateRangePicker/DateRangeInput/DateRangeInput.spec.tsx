import React from 'react';
import { render } from '@testing-library/react';

import { DateRangeInput } from '.';

describe('packages/date-picker/date-range-picker/date-range-input', () => {
  describe('Keyboard interaction', () => {
    // yyyy-mm-dd
    describe('Left Arrow', () => {
      test.todo('moves the cursor when the segment has a value');
      test.todo('focuses the previous segment when the segment is empty');
      test.todo(
        'focuses the previous segment if the cursor is at the start of the input text',
      );
    });

    describe('Right Arrow', () => {
      test.todo('moves the cursor when the segment has a value');
      test.todo('focuses the next segment when the segment is empty');
      test.todo(
        'focuses the next segment if the cursor is at the end of the input text',
      );
    });

    describe('Backspace key', () => {
      test.todo('deletes any value in the input');
      test.todo('deletes the whole value on multiple presses');
      test.todo('focuses the previous segment if current segment is empty');
    });
  });
});
