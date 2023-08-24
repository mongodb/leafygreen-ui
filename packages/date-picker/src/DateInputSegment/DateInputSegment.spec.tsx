import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateInputSegment } from '.';

describe('packages/date-picker/date-input-segment', () => {
  describe('Typing', () => {
    test('Typing a number sets the value', async () => {
      const result = render(<DateInputSegment segment="day" />);
      const input = result.getByRole('spinbutton');
      await userEvent.type(input, '12');
      expect(input).toHaveValue('12');
    });
    test('Typing letters does not the value', async () => {
      const result = render(<DateInputSegment segment="day" />);
      const input = result.getByRole('spinbutton');
      await userEvent.type(input, 'abc');
      expect(input).toHaveValue('');
    });
  });
  describe('Arrow Keys', () => {
    test('ArrowUp increments value', async () => {
      const result = render(<DateInputSegment segment="day" />);
      const input = result.getByRole('spinbutton');
      await userEvent.type(input, '{arrowup}');
      expect(input).toHaveValue('01');
    });
    test('ArrowDown decrements value', async () => {
      const result = render(<DateInputSegment segment="day" />);
      const input = result.getByRole('spinbutton');
      await userEvent.type(input, '{arrowup}{arrowup}{arrowdown}');
      expect(input).toHaveValue('01');
    });
  });
});
