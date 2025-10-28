import React from 'react';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

import { InputSegment } from '../InputSegment';
import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';
import {
  charsPerSegmentMock,
  renderInputBox,
  renderInputBoxWithState,
  SegmentObjMock,
} from '../testutils';

describe('packages/input-box', () => {
  describe('Rendering', () => {
    describe.each(['day', 'month', 'year'])('%p', segment => {
      test('renders the correct aria attributes', () => {
        const { getByLabelText } = renderInputBox({});
        const input = getByLabelText(segment);

        // each segment has appropriate aria label
        expect(input).toHaveAttribute('aria-label', segment);
      });
    });

    test('renders segments in the correct order', () => {
      const { getAllByRole } = renderInputBox({});
      const segments = getAllByRole('spinbutton');
      expect(segments[0]).toHaveAttribute('aria-label', 'month');
      expect(segments[1]).toHaveAttribute('aria-label', 'day');
      expect(segments[2]).toHaveAttribute('aria-label', 'year');
    });

    test('renders filled segments when a value is passed', () => {
      const { dayInput, monthInput, yearInput } = renderInputBox({});

      expect(dayInput.value).toBe('02');
      expect(monthInput.value).toBe('02');
      expect(yearInput.value).toBe('2025');
    });

    test.todo('does not render non-segment parts as inputs');
  });

  describe('rerendering', () => {
    test('with new value updates the segments', () => {
      const { rerenderInputBox, dayInput, monthInput, yearInput } =
        renderInputBox({});
      expect(dayInput.value).toBe('02');
      expect(monthInput.value).toBe('02');
      expect(yearInput.value).toBe('2025');

      rerenderInputBox({ segments: { day: '26', month: '09', year: '1993' } });
      expect(dayInput.value).toBe('26');
      expect(monthInput.value).toBe('09');
      expect(yearInput.value).toBe('1993');
    });
  });

  describe('onSegmentChange', () => {
    test('is called when a segment value changes', () => {
      const onSegmentChange =
        jest.fn<InputSegmentChangeEventHandler<SegmentObjMock, string>>();
      const { dayInput } = renderInputBox({
        onSegmentChange,
        segments: { day: '', month: '', year: '' },
      });
      expect(dayInput.value).toBe('');
      userEvent.type(dayInput, '2');
      expect(onSegmentChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: '2' }),
      );
    });

    test('is called when deleting from a single segment', () => {
      const onSegmentChange =
        jest.fn<InputSegmentChangeEventHandler<SegmentObjMock, string>>();
      const { dayInput } = renderInputBox({
        onSegmentChange,
        segments: { day: '21', month: '', year: '' },
      });

      userEvent.type(dayInput, '{backspace}');
      expect(onSegmentChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: '' }),
      );
    });
  });

  describe('setSegment', () => {
    test('is called when a segment value changes', () => {
      const setSegment = jest.fn();
      const { dayInput } = renderInputBox({
        setSegment,
        segments: { day: '', month: '', year: '' },
      });
      userEvent.type(dayInput, '2');
      expect(setSegment).toHaveBeenCalledWith('day', '2');
    });

    test('is called when deleting from a single segment', () => {
      const setSegment = jest.fn();
      const { dayInput } = renderInputBox({
        setSegment,
        segments: { day: '21', month: '', year: '' },
      });

      userEvent.type(dayInput, '{backspace}');
      expect(setSegment).toHaveBeenCalledWith('day', '');
    });
  });

  describe('renderSegment', () => {
    test('calls renderSegment for each segment with correct props', () => {
      const mockRenderSegment = jest.fn(
        ({
          partType,
          onChange,
          onBlur,
        }: {
          partType: SegmentObjMock;
          onChange: any;
          onBlur: any;
        }) => (
          // @ts-expect-error - we are not passing all the props to the InputSegment component
          <InputSegment
            key={partType}
            segment={partType}
            onChange={onChange}
            onBlur={onBlur}
            charsPerSegment={charsPerSegmentMock[partType]}
            data-testid={`input-segment-${partType}`}
          />
        ),
      );
      renderInputBox({
        renderSegment: mockRenderSegment,
        formatParts: [
          { type: 'year', value: '' },
          { type: 'literal', value: '-' },
          { type: 'month', value: '' },
          { type: 'literal', value: '-' },
          { type: 'day', value: '' },
        ],
      });
      // Verify renderSegment was called 3 times (once per segment)
      expect(mockRenderSegment).toHaveBeenCalledTimes(3);
      // Check first call (year)
      expect(mockRenderSegment).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          partType: 'year',
          onChange: expect.any(Function),
          onBlur: expect.any(Function),
        }),
      );
      // Check second call (month)
      expect(mockRenderSegment).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          partType: 'month',
          onChange: expect.any(Function),
          onBlur: expect.any(Function),
        }),
      );
      // Check third call (day)
      expect(mockRenderSegment).toHaveBeenNthCalledWith(
        3,
        expect.objectContaining({
          partType: 'day',
          onChange: expect.any(Function),
          onBlur: expect.any(Function),
        }),
      );
    });
  });

  describe('auto-focus', () => {
    test('focuses the next segment when an explicit value is entered', () => {
      const { dayInput, monthInput } = renderInputBoxWithState({});

      userEvent.type(monthInput, '02');
      expect(dayInput).toHaveFocus();
    });

    test('focus remains in the current segment when an ambiguous value is entered', () => {
      const { dayInput } = renderInputBoxWithState({});

      userEvent.type(dayInput, '2');
      expect(dayInput).toHaveFocus();
    });

    test('focuses the previous segment when a backspace is pressed and the current segment is empty', () => {
      const { dayInput, monthInput } = renderInputBoxWithState({});

      userEvent.type(dayInput, '{backspace}');
      expect(monthInput).toHaveFocus();
    });

    test('focus remains in the current segment when a backspace is pressed and the current segment is not empty', () => {
      const { monthInput } = renderInputBoxWithState({});

      userEvent.type(monthInput, '2');
      userEvent.type(monthInput, '{backspace}');
      expect(monthInput).toHaveFocus();
    });
  });

  describe('Mouse interaction', () => {
    test('click on segment focuses it', () => {
      const { dayInput } = renderInputBoxWithState({});
      userEvent.click(dayInput);
      expect(dayInput).toHaveFocus();
    });
  });

  describe('Keyboard interaction', () => {
    test('Tab moves focus to next segment', () => {
      const { dayInput, monthInput, yearInput } = renderInputBoxWithState({});
      userEvent.click(monthInput);
      userEvent.tab();
      expect(dayInput).toHaveFocus();
      userEvent.tab();
      expect(yearInput).toHaveFocus();
    });

    test('Right arrow key moves focus to next segment', () => {
      const { dayInput, monthInput, yearInput } = renderInputBoxWithState({});
      userEvent.click(monthInput);
      userEvent.type(monthInput, '{arrowright}');
      expect(dayInput).toHaveFocus();
      userEvent.type(dayInput, '{arrowright}');
      expect(yearInput).toHaveFocus();
    });

    test('Left arrow key moves focus to previous segment', () => {
      const { dayInput, monthInput, yearInput } = renderInputBoxWithState({});
      userEvent.click(yearInput);
      userEvent.type(yearInput, '{arrowleft}');
      expect(dayInput).toHaveFocus();
      userEvent.type(dayInput, '{arrowleft}');
      expect(monthInput).toHaveFocus();
    });
  });

  describe('typing', () => {
    describe('explicit value', () => {
      test('updates the rendered segment value', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '26');
        expect(dayInput.value).toBe('26');
      });

      test('segment value is immediately formatted', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '5');
        expect(dayInput.value).toBe('05');
      });

      test('allows leading zeros', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '02');
        expect(dayInput.value).toBe('02');
      });
    });

    describe('ambiguous value', () => {
      test('segment value is not immediately formatted', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '2');
        expect(dayInput.value).toBe('2');
      });

      test('value is formatted on segment blur', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '2');
        userEvent.tab();
        expect(dayInput.value).toBe('02');
      });

      test('allows leading zeros', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '0');
        expect(dayInput.value).toBe('0');
      });

      test('allows backspace to delete the value', () => {
        const { dayInput } = renderInputBoxWithState({});
        userEvent.type(dayInput, '2');
        userEvent.type(dayInput, '{backspace}');
        expect(dayInput.value).toBe('');
      });
    });

    test('returns no value with leading zero on blur', () => {
      const { dayInput } = renderInputBoxWithState({});
      userEvent.type(dayInput, '0');
      userEvent.tab();
      expect(dayInput.value).toBe('');
    });

    test('does not allow non-number characters', () => {
      const { dayInput } = renderInputBoxWithState({});
      userEvent.type(dayInput, 'aB$/');
      expect(dayInput.value).toBe('');
    });

    test('backspace resets the input', () => {
      const { dayInput, yearInput } = renderInputBoxWithState({});
      userEvent.type(dayInput, '21');
      userEvent.type(dayInput, '{backspace}');
      expect(dayInput.value).toBe('');

      userEvent.type(yearInput, '1993');
      userEvent.type(yearInput, '{backspace}');
      expect(yearInput.value).toBe('');
    });
  });
});
