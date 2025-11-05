import React from 'react';
import { jest } from '@jest/globals';
import userEvent from '@testing-library/user-event';

import { Size } from '@leafygreen-ui/tokens';

import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';
import {
  InputBoxWithState,
  InputSegmentWrapper,
  renderInputBox,
} from '../testutils';
import {
  charsPerSegmentMock,
  defaultMinMock,
  SegmentObjMock,
  segmentRefsMock,
  segmentRulesMock,
  segmentsMock,
} from '../testutils/testutils.mocks';

import { InputBox } from './InputBox';
import { render } from '@testing-library/react';

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
      const { dayInput, monthInput, yearInput } = renderInputBox({
        segments: { day: '02', month: '02', year: '2025' },
      });

      expect(dayInput.value).toBe('02');
      expect(monthInput.value).toBe('02');
      expect(yearInput.value).toBe('2025');
    });
  });

  describe('rerendering', () => {
    test('with new value updates the segments', () => {
      const setSegment = jest.fn();
      const { rerenderInputBox, getDayInput, getMonthInput, getYearInput } =
        renderInputBox({
          segments: { day: '02', month: '02', year: '2025' },
          setSegment,
        });
      expect(getDayInput().value).toBe('02');
      expect(getMonthInput().value).toBe('02');
      expect(getYearInput().value).toBe('2025');

      rerenderInputBox({
        segments: { day: '26', month: '09', year: '1993' },
        setSegment,
      });
      expect(getDayInput().value).toBe('26');
      expect(getMonthInput().value).toBe('09');
      expect(getYearInput().value).toBe('1993');
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

  describe('auto-focus', () => {
    test('focuses the next segment when an explicit value is entered', () => {
      const { dayInput, monthInput } = renderInputBox({});

      userEvent.type(monthInput, '02');
      expect(dayInput).toHaveFocus();
      expect(monthInput.value).toBe('02');
    });

    test('focus remains in the current segment when an ambiguous value is entered', () => {
      const { dayInput } = renderInputBox({});

      userEvent.type(dayInput, '2');
      expect(dayInput).toHaveFocus();
    });

    test('focuses the previous segment when a backspace is pressed and the current segment is empty', () => {
      const { dayInput, monthInput } = renderInputBox({});

      userEvent.type(dayInput, '{backspace}');
      expect(monthInput).toHaveFocus();
    });

    test('focus remains in the current segment when a backspace is pressed and the current segment is not empty', () => {
      const { monthInput } = renderInputBox({});

      userEvent.type(monthInput, '2');
      userEvent.type(monthInput, '{backspace}');
      expect(monthInput).toHaveFocus();
    });
  });

  describe('Mouse interaction', () => {
    test('click on segment focuses it', () => {
      const { dayInput } = renderInputBox({});
      userEvent.click(dayInput);
      expect(dayInput).toHaveFocus();
    });
  });

  describe('Keyboard interaction', () => {
    test('Tab moves focus to next segment', () => {
      const { dayInput, monthInput, yearInput } = renderInputBox({});
      userEvent.click(monthInput);
      userEvent.tab();
      expect(dayInput).toHaveFocus();
      userEvent.tab();
      expect(yearInput).toHaveFocus();
    });

    test('Right arrow key moves focus to next segment', () => {
      const { dayInput, monthInput, yearInput } = renderInputBox({});
      userEvent.click(monthInput);
      userEvent.type(monthInput, '{arrowright}');
      expect(dayInput).toHaveFocus();
      userEvent.type(dayInput, '{arrowright}');
      expect(yearInput).toHaveFocus();
    });

    test('Left arrow key moves focus to previous segment', () => {
      const { dayInput, monthInput, yearInput } = renderInputBox({});
      userEvent.click(yearInput);
      userEvent.type(yearInput, '{arrowleft}');
      expect(dayInput).toHaveFocus();
      userEvent.type(dayInput, '{arrowleft}');
      expect(monthInput).toHaveFocus();
    });
  });

  describe('onBlur', () => {
    test('returns no value with leading zero on blur', () => {
      // min value is 1
      const { monthInput } = renderInputBox({});
      userEvent.type(monthInput, '0');
      userEvent.tab();
      expect(monthInput.value).toBe('');
    });

    test('returns value with leading zero on blur', () => {
      // min value is 0
      const { dayInput } = renderInputBox({});
      userEvent.type(dayInput, '0');
      userEvent.tab();
      expect(dayInput.value).toBe('00');
    });
  });

  describe('typing', () => {
    describe('explicit value', () => {
      test('updates the rendered segment value', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '26');
        expect(dayInput.value).toBe('26');
      });

      test('segment value is immediately formatted', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '5');
        expect(dayInput.value).toBe('05');
      });

      test('allows leading zeros', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '02');
        expect(dayInput.value).toBe('02');
      });

      test('allows 00 as a valid value if min value is 0', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '00');
        expect(dayInput.value).toBe('00');
      });
    });

    describe('ambiguous value', () => {
      test('segment value is not immediately formatted', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '2');
        expect(dayInput.value).toBe('2');
      });

      test('value is formatted on segment blur', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '2');
        userEvent.tab();
        expect(dayInput.value).toBe('02');
      });

      test('allows leading zeros', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '0');
        expect(dayInput.value).toBe('0');
      });

      test('allows backspace to delete the value', () => {
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '2');
        userEvent.type(dayInput, '{backspace}');
        expect(dayInput.value).toBe('');
      });
    });

    describe('min/max range', () => {
      test('does not allow values outside max range', () => {
        // max is 31
        const { dayInput } = renderInputBox({});
        userEvent.type(dayInput, '32');
        expect(dayInput.value).toBe('02');
      });

      test('allows values below min range', () => {
        // min is 1. We still allow values below min range because the user can still type in the value and it will be formatted. It should still be displayed but an error message should be shown.
        const { monthInput } = renderInputBox({});
        userEvent.type(monthInput, '2');
        // should be formatted to 02 since 2 is explicitly valid
        expect(monthInput.value).toBe('02');
      });
    });

    test('does not allow non-number characters', () => {
      const { dayInput } = renderInputBox({});
      userEvent.type(dayInput, 'aB$/');
      expect(dayInput.value).toBe('');
    });

    test('backspace resets the input', () => {
      const { dayInput, yearInput } = renderInputBox({});
      userEvent.type(dayInput, '21');
      userEvent.type(dayInput, '{backspace}');
      expect(dayInput.value).toBe('');

      userEvent.type(yearInput, '1993');
      userEvent.type(yearInput, '{backspace}');
      expect(yearInput.value).toBe('');
    });
  });

  describe('Arrow keys with auto-advance', () => {
    test('arrow up does not auto-advance to next segment', () => {
      const { monthInput, dayInput } = renderInputBox({
        segments: { day: '', month: '05', year: '' },
      });

      userEvent.click(monthInput);
      userEvent.type(monthInput, '{arrowup}');
      expect(monthInput).toHaveFocus();
      expect(dayInput).not.toHaveFocus();
    });

    test('arrow down does not auto-advance to next segment', () => {
      const { monthInput, dayInput } = renderInputBox({
        segments: { day: '', month: '05', year: '' },
      });

      userEvent.click(monthInput);
      userEvent.type(monthInput, '{arrowdown}');
      expect(monthInput).toHaveFocus();
      expect(dayInput).not.toHaveFocus();
    });
  });

  describe('Edge cases for segment navigation', () => {
    test('does not auto-advance from the last segment', () => {
      const { yearInput } = renderInputBox({
        segments: { day: '', month: '', year: '' },
      });

      userEvent.click(yearInput);
      userEvent.type(yearInput, '2025');
      expect(yearInput).toHaveFocus();
    });

    test('arrow left from first segment keeps focus on first segment', () => {
      const { monthInput } = renderInputBox({});
      userEvent.click(monthInput);
      userEvent.type(monthInput, '{arrowleft}');
      expect(monthInput).toHaveFocus();
    });

    test('arrow right from last segment keeps focus on last segment', () => {
      const { yearInput } = renderInputBox({});
      userEvent.click(yearInput);
      userEvent.type(yearInput, '{arrowright}');
      expect(yearInput).toHaveFocus();
    });

    test('backspace from first empty segment keeps focus on first segment', () => {
      const { monthInput } = renderInputBox({
        segments: { day: '', month: '', year: '' },
      });

      userEvent.click(monthInput);
      userEvent.type(monthInput, '{backspace}');
      expect(monthInput).toHaveFocus();
    });
  });

  describe('Format parts and literal separators', () => {
    test('renders literal separators between segments', () => {
      const { container } = renderInputBox({
        formatParts: [
          { type: 'month', value: '02' },
          { type: 'literal', value: '/' },
          { type: 'day', value: '02' },
          { type: 'literal', value: '/' },
          { type: 'year', value: '2025' },
        ],
      });

      const separators = container.querySelectorAll('span');
      expect(separators.length).toBeGreaterThanOrEqual(2);
      expect(container.textContent).toContain('/');
    });

    test('does not render non-segment parts as inputs', () => {
      const { container } = render(
        <InputBoxWithState
          formatParts={[
            { type: 'month', value: '02' },
            { type: 'literal', value: '/' },
            { type: 'day', value: '02' },
          ]}
        />,
      );

      const inputs = container.querySelectorAll('input');
      expect(inputs).toHaveLength(2); // Only month and day, not the literal
    });
  });

  describe('Disabled state', () => {
    test('all segments are disabled when disabled prop is true', () => {
      const { dayInput, monthInput, yearInput } = renderInputBox({
        disabled: true,
      });

      expect(dayInput).toBeDisabled();
      expect(monthInput).toBeDisabled();
      expect(yearInput).toBeDisabled();
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('InputBox throws error when no required props are provided', () => {
      // @ts-expect-error - missing required props
      <InputBox />;
    });
  });

  test('With required props', () => {
    <InputBox
      segmentEnum={SegmentObjMock}
      segmentRefs={segmentRefsMock}
      segments={segmentsMock}
      setSegment={() => {}}
      charsPerSegment={charsPerSegmentMock}
      segmentRules={segmentRulesMock}
      minValues={defaultMinMock}
      segmentComponent={InputSegmentWrapper}
      size={Size.Default}
      disabled={false}
    />;
  });
});
