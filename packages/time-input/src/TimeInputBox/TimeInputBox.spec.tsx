import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SupportedLocales } from '@leafygreen-ui/date-utils';

import { TimeInputDisplayProvider } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { TimeInputDisplayProviderProps } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext.types';

import { TimeInputBox } from './TimeInputBox';
import { TimeInputBoxProps } from './TimeInputBox.types';
import { timeSegmentRefsMock } from '../testing/testUtils';

const renderTimeInputBox = ({
  props,
  displayProps,
}: {
  props?: Partial<TimeInputBoxProps>;
  displayProps?: Partial<TimeInputDisplayProviderProps>;
}) => {
  const result = render(
    <TimeInputDisplayProvider label="label" {...displayProps}>
      <TimeInputBox
        segments={{ hour: '', minute: '', second: '' }}
        setSegment={() => {}}
        segmentRefs={timeSegmentRefsMock}
        {...props}
      />
    </TimeInputDisplayProvider>,
  );

  // TODO:: replace with test harnesses
  const hourInput = result.container.querySelector(
    'input[aria-label="hour"]',
  ) as HTMLInputElement;
  const minuteInput = result.container.querySelector(
    'input[aria-label="minute"]',
  ) as HTMLInputElement;
  const secondInput = result.container.querySelector(
    'input[aria-label="second"]',
  ) as HTMLInputElement;

  return {
    ...result,
    hourInput,
    minuteInput,
    secondInput,
  };
};

describe('packages/time-input/time-input-box', () => {
  describe('Rendering', () => {
    it('should render the segments', () => {
      const { hourInput, minuteInput, secondInput } = renderTimeInputBox({});
      expect(hourInput).toBeInTheDocument();
      expect(minuteInput).toBeInTheDocument();
      expect(secondInput).toBeInTheDocument();
    });

    it('should render the correct aria labels', () => {
      const { hourInput, minuteInput, secondInput } = renderTimeInputBox({});
      expect(hourInput).toHaveAttribute('aria-label', 'hour');
      expect(minuteInput).toHaveAttribute('aria-label', 'minute');
      expect(secondInput).toHaveAttribute('aria-label', 'second');
    });

    test('does not render seconds when showSeconds is false', () => {
      const { secondInput } = renderTimeInputBox({
        displayProps: { showSeconds: false },
      });
      expect(secondInput).not.toBeInTheDocument();
    });
  });

  describe('Min/Max', () => {
    describe('hour segment', () => {
      describe('12 hour format', () => {
        it('should have a min of 1 for the hour segment', () => {
          const { hourInput } = renderTimeInputBox({
            displayProps: { locale: SupportedLocales.en_US },
          });
          expect(hourInput).toHaveAttribute('min', '1');
        });
        it('should have a max of 12 for the hour segment', () => {
          const { hourInput } = renderTimeInputBox({
            displayProps: { locale: SupportedLocales.en_US },
          });
          expect(hourInput).toHaveAttribute('max', '12');
        });
      });

      describe('24 hour format', () => {
        it('should have a min of 0 for the hour segment', () => {
          const { hourInput } = renderTimeInputBox({
            displayProps: { locale: SupportedLocales.ISO_8601 },
          });
          expect(hourInput).toHaveAttribute('min', '0');
        });
        it('should have a max of 23 for the hour segment', () => {
          const { hourInput } = renderTimeInputBox({
            displayProps: { locale: SupportedLocales.ISO_8601 },
          });
          expect(hourInput).toHaveAttribute('max', '23');
        });
      });
    });

    describe.each(['minute', 'second'])('%p segment', segment => {
      test('should have a min of 0 for the %p segment', () => {
        const result = renderTimeInputBox({
          displayProps: { locale: SupportedLocales.ISO_8601 },
        });
        const input =
          segment === 'minute' ? result.minuteInput : result.secondInput;
        expect(input).toHaveAttribute('min', '0');
      });
      test('should have a max of 59 for the %p segment', () => {
        const result = renderTimeInputBox({
          displayProps: { locale: SupportedLocales.ISO_8601 },
        });
        const input =
          segment === 'minute' ? result.minuteInput : result.secondInput;
        expect(input).toHaveAttribute('max', '59');
      });
    });
  });

  describe('setSegment', () => {
    test('should call setSegment with the segment name and the value', () => {
      const setSegment = jest.fn();
      const { hourInput } = renderTimeInputBox({ props: { setSegment } });
      userEvent.type(hourInput, '1');
      expect(setSegment).toHaveBeenCalledWith('hour', '1');
    });
  });

  describe('onSegmentChange', () => {
    test('should call onSegmentChange with the segment name and the value', () => {
      const onSegmentChange = jest.fn();
      const { hourInput } = renderTimeInputBox({ props: { onSegmentChange } });
      userEvent.type(hourInput, '1');
      expect(onSegmentChange).toHaveBeenCalledWith(
        expect.objectContaining({ value: '1' }),
      );
    });
  });
});
