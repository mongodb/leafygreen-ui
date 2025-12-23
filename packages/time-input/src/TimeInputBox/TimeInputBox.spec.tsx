import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  TimeInputDisplayProvider,
  TimeInputDisplayProviderProps,
} from '../Context';

import { TimeInputBox } from './TimeInputBox';
import { TimeInputBoxProps } from './TimeInputBox.types';

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

  describe('setSegment', () => {
    test('should call setSegment with the segment name and the value', () => {
      const setSegment = jest.fn();
      const { hourInput } = renderTimeInputBox({ props: { setSegment } });
      userEvent.type(hourInput, '1');
      expect(setSegment).toHaveBeenCalledWith('hour', '1');
    });
  });

  describe('onSegmentChange', () => {
    test.todo(
      'should call onSegmentChange with the segment name and the value',
    );
  });
});
