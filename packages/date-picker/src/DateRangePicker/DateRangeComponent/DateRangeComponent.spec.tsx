import React from 'react';
import { render } from '@testing-library/react';

import { Month } from '../../constants';

import { DateRangeComponent } from '.';

const testToday = new Date(Date.UTC(2023, Month.September, 10));

describe('packages/date-picker/date-range-picker/date-range-component', () => {
  describe('Rendering', () => {
    test.todo('renders two calendar grids');
    test.todo('left calendar is labelled as the current month');
    test.todo('right calendar is labelled as the following month');
    test.todo('chevrons have aria labels');

    describe('rendered cells', () => {
      test.todo('have correct `aria-label`');
    });

    describe('with quick select menu', () => {
      test.todo('select menu triggers have aria labels');
      test.todo('select menus have correct values');
      test.todo('quick select buttons are rendered');
    });

    describe('when value is updated', () => {
      test.todo('grid is labelled as the current month');
      test.todo('select menus have correct values');
    });

    test.todo('default highlight is on today');
    test.todo('highlight starts on start value when provided');
    test.todo('highlight starts on end value when only end provided');
  });

  describe('Keyboard navigation', () => {
    describe('Arrow Keys', () => {
      test.todo('left arrow moves focus to the previous day');
      test.todo('right arrow moves focus to the next day');
      test.todo('up arrow moves focus to the previous week');
      test.todo('down arrow moves focus to the next week');

      describe('when next day would be out of range', () => {
        const props = {
          // value: testToday,
        };

        test.todo('left arrow does nothing');
        test.todo('right arrow does nothing');
        test.todo('up arrow does nothing');
        test.todo('down arrow does nothing');
      });

      describe('update the displayed month', () => {
        test.todo('left arrow updates displayed month to previous');
        test.todo('right arrow updates displayed month to next');
        test.todo('up arrow updates displayed month to previous');
        test.todo('down arrow updates displayed month to next');
        test.todo('does not update month when month does not need to change');
      });

      describe('when month should be updated', () => {
        test.todo('left arrow focuses the previous day');
        test.todo('right arrow focuses the next day');
        test.todo('up arrow focuses the previous week');
        test.todo('down arrow focuses the next week');
      });
    });
  });
});
