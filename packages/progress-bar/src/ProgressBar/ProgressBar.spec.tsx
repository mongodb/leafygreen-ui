import React from 'react';
import { act, render, screen } from '@testing-library/react';

import { requiredA11yArgs } from '../test.constants';
import { getTestUtils } from '../testing';

import { ProgressBar } from './ProgressBar';
import { Role, Variant } from './ProgressBar.types';

describe('packages/progress-bar', () => {
  describe('basic rendering', () => {
    test('renders with a label', () => {
      const TEST_LABEL = 'placeholder label';
      render(<ProgressBar isIndeterminate label={TEST_LABEL} />);

      const { queryLabel } = getTestUtils();
      expect(queryLabel()).toBeVisible();
      expect(queryLabel()).toHaveTextContent(TEST_LABEL);
    });

    test('renders with a single description', () => {
      const TEST_DESCRIPTION = 'placeholder description';
      render(
        <ProgressBar
          isIndeterminate
          description={TEST_DESCRIPTION}
          {...requiredA11yArgs}
        />,
      );

      const { queryDescription } = getTestUtils();
      expect(queryDescription()).toBeVisible();
      expect(queryDescription()).toHaveTextContent(TEST_DESCRIPTION);
    });

    test('renders with rotating descriptions', () => {
      jest.useFakeTimers();

      const TEST_DESCRIPTIONS = ['First', 'Second', 'Third'];

      render(
        <ProgressBar
          isIndeterminate
          description={TEST_DESCRIPTIONS}
          {...requiredA11yArgs}
        />,
      );

      const { queryDescription } = getTestUtils();

      expect(queryDescription()).toHaveTextContent('First');

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(queryDescription()).toHaveTextContent('Second');

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(queryDescription()).toHaveTextContent('Third');

      act(() => {
        jest.advanceTimersByTime(2000);
      });
      expect(queryDescription()).toHaveTextContent('First');

      jest.useRealTimers();
    });

    test('renders with a custom className', () => {
      const TEST_CLASSNAME = 'test-classname';
      render(
        <ProgressBar
          isIndeterminate
          className={TEST_CLASSNAME}
          {...requiredA11yArgs}
        />,
      );

      const { getContainer } = getTestUtils();
      expect(getContainer()).toHaveClass(TEST_CLASSNAME);
    });

    describe('with formatValue', () => {
      const TEST_VALUE = 50;
      const TEST_MAX_VALUE = 100;

      test('renders with a custom format when given a callback', () => {
        render(
          <ProgressBar
            isIndeterminate
            value={TEST_VALUE}
            formatValue={value => `${value} units`}
            {...requiredA11yArgs}
          />,
        );

        const { queryValueText } = getTestUtils();
        expect(queryValueText()).toBeVisible();
        expect(queryValueText()).toHaveTextContent('50 units');
      });

      test('renders icon when showIcon is true', () => {
        render(
          <ProgressBar
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon
            {...requiredA11yArgs}
          />,
        );

        const { queryIcon } = getTestUtils();
        expect(queryIcon()).toBeVisible();
      });

      test('renders the correct width for the progress bar fill', () => {
        render(
          <ProgressBar
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            {...requiredA11yArgs}
          />,
        );

        const { getBarFill, getBarFillWidthVar } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFillWidthVar()).toBe('50%');
      });

      test('does not render success variant icon if under maxValue, even if showIcon is true', () => {
        render(
          <ProgressBar
            variant={Variant.Success}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon
            {...requiredA11yArgs}
          />,
        );

        const { queryIcon } = getTestUtils();
        expect(queryIcon()).toBeNull();
      });
    });

    describe('with unexpected input', () => {
      test('renders width 0% when value is less than 0', () => {
        render(<ProgressBar value={-5} maxValue={100} {...requiredA11yArgs} />);

        const { getBarFill, getBarFillWidthVar } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFillWidthVar()).toBe('0%');
      });

      test('renders width capped at 100% when value is over maxValue', () => {
        render(
          <ProgressBar value={105} maxValue={100} {...requiredA11yArgs} />,
        );

        const { getBarFill, getBarFillWidthVar } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFillWidthVar()).toBe('100%');
      });

      test('defaults to maxValue of 1 when maxValue is less than 0', () => {
        render(<ProgressBar value={1} maxValue={-10} {...requiredA11yArgs} />);

        const { getBarFill, getBarFillWidthVar } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFillWidthVar()).toBe('100%');
      });

      test('defaults to maxValue of 1 when maxValue is 0', () => {
        render(<ProgressBar value={1} maxValue={0} {...requiredA11yArgs} />);

        const { getBarFill, getBarFillWidthVar } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFillWidthVar()).toBe('100%');
      });
    });
  });

  describe('disabled state', () => {
    test('renders no animation even if enableAnimation is true', () => {
      render(
        <ProgressBar
          enableAnimation
          value={50}
          maxValue={100}
          disabled
          {...requiredA11yArgs}
        />,
      );

      const { getBarFill } = getTestUtils();
      expect(getBarFill()).toBeInTheDocument();
      expect(getBarFill()).not.toHaveStyle({
        animation: expect.any(String),
      });
    });
  });

  describe('aria attributes', () => {
    test('renders with aria-labelledby and aria-describedby', () => {
      const LABEL_TEXT = 'My Progress Bar';
      const DESCRIPTION_TEXT = 'Here is my lovely helper text.';

      render(
        <ProgressBar
          isIndeterminate
          label={LABEL_TEXT}
          description={DESCRIPTION_TEXT}
        />,
      );

      const { getBar } = getTestUtils();
      expect(getBar()).toHaveAttribute('aria-labelledby');
      expect(getBar()).toHaveAttribute('aria-describedby');
    });

    test('renders with aria-label when no label is provided', () => {
      render(<ProgressBar isIndeterminate aria-label="required label" />);

      const { getBar } = getTestUtils();
      expect(getBar()).toHaveAttribute('aria-label', 'required label');
    });

    test('renders with aria-value attributes if value and maxValue are provided', () => {
      const TEST_VALUE = 75;
      const TEST_MAX_VALUE = 100;

      render(
        <ProgressBar
          value={TEST_VALUE}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );

      const { getBar } = getTestUtils();
      expect(getBar()).toHaveAttribute('aria-valuemin', '0');
      expect(getBar()).toHaveAttribute('aria-valuemax', String(TEST_MAX_VALUE));
      expect(getBar()).toHaveAttribute('aria-valuenow', String(TEST_VALUE));
    });

    test('renders with aria-valuetext if maxValue is not provided', () => {
      const TEST_VALUE = 50;

      render(
        <ProgressBar
          isIndeterminate
          value={TEST_VALUE}
          {...requiredA11yArgs}
        />,
      );

      const { getBar } = getTestUtils();
      expect(getBar()).toHaveAttribute('aria-valuetext', String(TEST_VALUE));
    });
  });

  describe('screen reader behavior', () => {
    const TEST_VALUE_UNDER_50 = 43;
    const TEST_VALUE_OVER_50 = 57;
    const TEST_MAX_VALUE = 100;

    const getAnnouncementMessage = (
      value: number,
      maxValue: number,
    ): string => {
      return `Update: current progress is ${value}% (${value} out of ${maxValue}).`;
    };

    test('does not have a live region for meter types', () => {
      render(
        <ProgressBar
          role={Role.Meter}
          value={TEST_VALUE_OVER_50}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toBeNull();
    });

    test('updates live region text for initial value; ignores further changes until next threshold met', () => {
      const { rerender } = render(
        <ProgressBar
          value={TEST_VALUE_UNDER_50}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_UNDER_50, TEST_MAX_VALUE),
      );

      rerender(
        <ProgressBar
          value={TEST_VALUE_UNDER_50 + 1}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toBeNull();
    });

    test('updates live region text if 50% threshold passed', () => {
      const { rerender } = render(
        <ProgressBar
          value={TEST_VALUE_UNDER_50}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_UNDER_50, TEST_MAX_VALUE),
      );

      rerender(
        <ProgressBar
          value={TEST_VALUE_OVER_50}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_OVER_50, TEST_MAX_VALUE),
      );
    });

    test('updates live region text if 100% threshold passed', () => {
      const { rerender } = render(
        <ProgressBar
          value={TEST_VALUE_UNDER_50}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_UNDER_50, TEST_MAX_VALUE),
      );

      rerender(
        <ProgressBar
          value={TEST_MAX_VALUE}
          maxValue={TEST_MAX_VALUE}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_MAX_VALUE, TEST_MAX_VALUE),
      );
    });

    test('additionally updates live region text to include variant if warning or error', () => {
      render(
        <ProgressBar
          value={TEST_VALUE_OVER_50}
          maxValue={TEST_MAX_VALUE}
          variant={Variant.Warning}
          {...requiredA11yArgs}
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        `${getAnnouncementMessage(
          TEST_VALUE_OVER_50,
          TEST_MAX_VALUE,
        )} Status is ${Variant.Warning}.`,
      );
    });
  });
});
