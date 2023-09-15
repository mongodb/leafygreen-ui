import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateInputSegment, type DateInputSegmentProps } from '.';

const handler = jest.fn();

const renderSegment = (props: DateInputSegmentProps) => {
  const result = render(<DateInputSegment data-testid="testid" {...props} />);
  const input = result.getByTestId('testid');
  return {
    ...result,
    input: input as HTMLInputElement,
  };
};

describe('packages/date-picker/date-input-segment', () => {
  beforeEach(() => {
    handler.mockClear();
  });

  describe('rendering', () => {
    describe('aria attributes', () => {
      test('has `spinbutton` role', () => {
        const { input } = renderSegment({ segment: 'day' });
        expect(input).toHaveAttribute('role', 'spinbutton');
      });
      test('day segment has aria-label', () => {
        const { input } = renderSegment({ segment: 'day' });
        expect(input).toHaveAttribute('aria-label', 'day');
      });
      test('month segment has aria-label', () => {
        const { input } = renderSegment({ segment: 'month' });
        expect(input).toHaveAttribute('aria-label', 'month');
      });
      test('year segment has aria-label', () => {
        const { input } = renderSegment({ segment: 'year' });
        expect(input).toHaveAttribute('aria-label', 'year');
      });
    });

    describe('day segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'day' });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({ segment: 'day', value: 12 });
        expect(input.value).toBe('12');
      });

      test('values get appropriately padded', () => {
        const { input } = renderSegment({ segment: 'day', value: 8 });
        expect(input.value).toBe('08');
      });

      test('values get appropriately truncated', () => {
        const { input } = renderSegment({ segment: 'day', value: 123 });
        expect(input.value).toBe('23');
      });

      test('rerendering updates the value', () => {
        const { input, rerender } = renderSegment({
          segment: 'day',
          value: 12,
        });

        rerender(
          <DateInputSegment segment="day" data-testid="testid" value={8} />,
        );
        expect(input.value).toBe('08');
      });
    });

    describe('year segment', () => {
      test('Rendering with undefined sets the value to empty string', () => {
        const { input } = renderSegment({ segment: 'year' });
        expect(input.value).toBe('');
      });

      test('Rendering with a value sets the input value', () => {
        const { input } = renderSegment({ segment: 'year', value: 2023 });
        expect(input.value).toBe('2023');
      });

      test('values get appropriately padded', () => {
        const { input } = renderSegment({ segment: 'year', value: 123 });
        expect(input.value).toBe('0123');
      });

      test('values get appropriately truncated', () => {
        const { input } = renderSegment({ segment: 'year', value: 12031 });
        expect(input.value).toBe('2031');
      });

      test('rerendering updates the value', () => {
        const { input, rerender } = renderSegment({
          segment: 'year',
          value: 2023,
        });
        rerender(
          <DateInputSegment segment="year" data-testid="testid" value={1993} />,
        );
        expect(input.value).toBe('1993');
      });
    });
  });

  describe('Typing', () => {
    test('Typing a number calls the change handler', () => {
      const result = render(
        <DateInputSegment
          segment="day"
          data-testid="testid"
          onChange={handler}
        />,
      );
      const input = result.getByTestId('testid');
      userEvent.type(input, '12');
      expect(handler).toHaveBeenCalledWith('12');
    });

    test('Typing letters does not call the handler', async () => {
      const result = render(
        <DateInputSegment
          segment="day"
          data-testid="testid"
          onChange={handler}
        />,
      );
      const input = result.getByTestId('testid');
      userEvent.type(input, 'abc');
      expect(handler).not.toHaveBeenCalled();
    });

    test('Typing 1 digit pads value', () => {
      const result = render(
        <DateInputSegment
          segment="day"
          data-testid="testid"
          onChange={handler}
        />,
      );
      const input = result.getByTestId('testid');
      userEvent.type(input, '1');
      expect(handler).toHaveBeenCalledWith('01');
    });

    test('typing 3+ digits truncates value', () => {
      const result = render(
        <DateInputSegment
          segment="day"
          data-testid="testid"
          onChange={handler}
        />,
      );
      const input = result.getByTestId('testid');
      userEvent.type(input, '123');
      expect(handler).toHaveBeenCalledWith('23');
    });
  });

  // Skipping, since {arrowup}/{arrowdown} do not trigger
  // a change event in userEvent
  // https://github.com/testing-library/user-event/issues/1066
  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('Arrow Keys', () => {
    test('ArrowUp calls handler with +1', () => {
      const result = render(
        <DateInputSegment
          segment="day"
          data-testid="testid"
          onChange={handler}
          value={8}
        />,
      );
      const input = result.getByTestId('testid');
      userEvent.type(input, '{arrowup}');
      expect(handler).toHaveBeenCalledWith('09');
    });

    test('ArrowDown calls handler with -1', () => {
      const result = render(
        <DateInputSegment
          segment="day"
          data-testid="testid"
          onChange={handler}
          value={8}
        />,
      );
      const input = result.getByTestId('testid');
      userEvent.type(input, '{arrowdown}');
      expect(handler).toHaveBeenCalledWith('07');
    });
  });
});
