import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DateSegment } from './DateInputSegment.types';
import { getValueFormatter } from './utils';
import { DateInputSegment } from '.';

const handler = jest.fn();

describe('packages/date-picker/date-input-segment', () => {
  beforeEach(() => {
    handler.mockClear();
  });

  describe('utils/valueFormatter', () => {
    describe.each(['day', 'month'] as Array<DateSegment>)('', segment => {
      const formatter = getValueFormatter(segment);

      test('formats 2 digit values', () => {
        expect(formatter('12')).toEqual('12');
      });

      test('pads 1 digit value', () => {
        expect(formatter('2')).toEqual('02');
      });

      test('truncates 3+ digit values', () => {
        expect(formatter('123')).toEqual('23');
      });

      test('truncates 3+ digit padded values', () => {
        expect(formatter('012')).toEqual('12');
      });

      test('sets 0 to empty string', () => {
        expect(formatter('0')).toEqual('');
      });

      test('sets undefined to empty string', () => {
        expect(formatter(undefined)).toEqual('');
      });
    });

    describe('year', () => {
      const formatter = getValueFormatter('year');

      test('formats 4 digit values', () => {
        expect(formatter('2023')).toEqual('2023');
      });

      test('pads < 4 digit value', () => {
        expect(formatter('123')).toEqual('0123');
      });

      test('truncates 5+ digit values', () => {
        expect(formatter('12345')).toEqual('2345');
      });

      test('truncates 5+ digit padded values', () => {
        expect(formatter('02345')).toEqual('2345');
      });

      test('sets 0 to empty string', () => {
        expect(formatter('0')).toEqual('');
      });

      test('sets undefined to empty string', () => {
        expect(formatter(undefined)).toEqual('');
      });
    });
  });

  describe('rendering', () => {
    describe('day segment', () => {
      test('Rendering with a value sets the input value', () => {
        const result = render(
          <DateInputSegment segment="day" data-testid="testid" value={12} />,
        );
        const input = result.getByTestId('testid');
        expect((input as HTMLInputElement).value).toBe('12');
      });

      test('values get appropriately padded', () => {
        const result = render(
          <DateInputSegment segment="day" data-testid="testid" value={8} />,
        );
        const input = result.getByTestId('testid');
        expect((input as HTMLInputElement).value).toBe('08');
      });

      test('values get appropriately truncated', () => {
        const result = render(
          <DateInputSegment segment="day" data-testid="testid" value={123} />,
        );
        const input = result.getByTestId('testid');
        expect((input as HTMLInputElement).value).toBe('23');
      });

      test('rerendering updates the value', () => {
        const result = render(
          <DateInputSegment segment="day" data-testid="testid" value={12} />,
        );
        const input = result.getByTestId('testid');
        result.rerender(
          <DateInputSegment segment="day" data-testid="testid" value={8} />,
        );
        expect((input as HTMLInputElement).value).toBe('08');
      });
    });

    describe('year segment', () => {
      test('Rendering with a value sets the input value', () => {
        const result = render(
          <DateInputSegment segment="year" data-testid="testid" value={2023} />,
        );
        const input = result.getByTestId('testid');
        expect((input as HTMLInputElement).value).toBe('2023');
      });

      test('values get appropriately padded', () => {
        const result = render(
          <DateInputSegment segment="year" data-testid="testid" value={123} />,
        );
        const input = result.getByTestId('testid');
        expect((input as HTMLInputElement).value).toBe('0123');
      });

      test('values get appropriately truncated', () => {
        const result = render(
          <DateInputSegment
            segment="year"
            data-testid="testid"
            value={12031}
          />,
        );
        const input = result.getByTestId('testid');
        expect((input as HTMLInputElement).value).toBe('2031');
      });

      test('rerendering updates the value', () => {
        const result = render(
          <DateInputSegment segment="year" data-testid="testid" value={2023} />,
        );
        const input = result.getByTestId('testid');
        result.rerender(
          <DateInputSegment segment="year" data-testid="testid" value={1993} />,
        );
        expect((input as HTMLInputElement).value).toBe('1993');
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
