import React from 'react';
import { render, screen } from '@testing-library/react';

import { getTestUtils } from '../testing';

import { ProgressBar } from './ProgressBar';
import { Color, LoaderVariant, Type } from './ProgressBar.types';

describe('packages/progress-bar', () => {
  describe('basic rendering', () => {
    test('renders with a label', () => {
      const TEST_LABEL = 'placeholder label';
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          label={TEST_LABEL}
        />,
      );
      const { queryLabel } = getTestUtils();
      expect(queryLabel()).toBeVisible();
      expect(queryLabel()).toHaveTextContent(TEST_LABEL);
    });

    test('renders with a description', () => {
      const TEST_DESCRIPTION = 'placeholder description';
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          description={TEST_DESCRIPTION}
          aria-label="required label"
        />,
      );
      const { queryDescription } = getTestUtils();
      expect(queryDescription()).toBeVisible();
      expect(queryDescription()).toHaveTextContent(TEST_DESCRIPTION);
    });

    describe('with formatValue', () => {
      const TEST_VALUE = 50;
      const TEST_MAX_VALUE = 100;

      test('renders with a custom format when given a callback', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={true}
            value={TEST_VALUE}
            formatValue={value => `${value} units`}
            aria-label="required label"
          />,
        );
        const { queryValueText } = getTestUtils();
        expect(queryValueText()).toBeVisible();
        expect(queryValueText()).toHaveTextContent('50 units');
      });

      test('renders icon when showIcon is true', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon={true}
            aria-label="required label"
          />,
        );
        const { queryIcon } = getTestUtils();
        expect(queryIcon()).toBeVisible();
      });

      test('renders the correct width for the progress bar fill', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            aria-label="required label"
          />,
        );
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).toHaveStyle({
          width: '50%',
        });
      });

      test('does not render success variant icon if under maxValue, even if showIcon is true', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            variant={LoaderVariant.Success}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
            formatValue="number"
            showIcon={true}
            aria-label="required label"
          />,
        );
        const { queryIcon } = getTestUtils();
        expect(queryIcon()).toBeNull();
      });
    });

    describe('with unexpected input', () => {
      test('renders width 0% when value is less than 0', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={-5}
            maxValue={100}
            aria-label="required label"
          />,
        );
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).toHaveStyle({
          width: '0%',
        });
      });

      test('renders width capped at 100% when value is over maxValue', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={105}
            maxValue={100}
            aria-label="required label"
          />,
        );
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).toHaveStyle({
          width: '100%',
        });
      });

      test('defaults to maxValue of 1 when maxValue is less than 0', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={1}
            maxValue={-10}
            aria-label="required label"
          />,
        );
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).toHaveStyle({
          width: '100%',
        });
      });

      test('defaults to maxValue of 1 when maxValue is 0', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={1}
            maxValue={0}
            aria-label="required label"
          />,
        );
        const { getBarFill } = getTestUtils();
        expect(getBarFill()).toBeInTheDocument();
        expect(getBarFill()).toHaveStyle({
          width: '100%',
        });
      });
    });
  });

  describe('disabled state', () => {
    test('renders no animation even if enableAnimation is true', () => {
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          enableAnimation={true}
          value={50}
          maxValue={100}
          disabled={true}
          aria-label="required label"
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
      const LABEL_TEXT = 'Test Progress Bar';
      const DESCRIPTION_TEXT = 'Test description for the progress bar.';

      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          label={LABEL_TEXT}
          description={DESCRIPTION_TEXT}
        />,
      );

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-labelledby');
      expect(progressBar).toHaveAttribute('aria-describedby');
    });

    test('renders with aria-label when no label is provided', () => {
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          aria-label="required label"
        />,
      );

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-label', 'required label');
    });

    test('renders with aria-value attributes if value and maxValue are provided', () => {
      const TEST_VALUE = 75;
      const TEST_MAX_VALUE = 100;

      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuemin', '0');
      expect(progressBar).toHaveAttribute(
        'aria-valuemax',
        String(TEST_MAX_VALUE),
      );
      expect(progressBar).toHaveAttribute('aria-valuenow', String(TEST_VALUE));
    });

    test('renders with aria-valuetext if maxValue is not provided', () => {
      const TEST_VALUE = 50;

      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          value={TEST_VALUE}
          aria-label="required label"
        />,
      );

      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toHaveAttribute('aria-valuetext', String(TEST_VALUE));
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
          type={Type.Meter}
          value={TEST_VALUE_OVER_50}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toBeNull();
    });

    test('updates live region text for initial value, but not for any further changes if next threshold is not met', () => {
      const { rerender } = render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE_UNDER_50}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_UNDER_50, TEST_MAX_VALUE),
      );

      rerender(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE_UNDER_50 + 1}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toBeNull();
    });

    test('updates live region text if 50% threshold passed', () => {
      const { rerender } = render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE_UNDER_50}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_UNDER_50, TEST_MAX_VALUE),
      );

      rerender(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE_OVER_50}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_OVER_50, TEST_MAX_VALUE),
      );
    });

    test('updates live region text if 100% threshold passed', () => {
      const { rerender } = render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE_UNDER_50}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_VALUE_UNDER_50, TEST_MAX_VALUE),
      );

      rerender(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_MAX_VALUE}
          maxValue={TEST_MAX_VALUE}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        getAnnouncementMessage(TEST_MAX_VALUE, TEST_MAX_VALUE),
      );
    });

    test('additionally updates live region text to include variant if yellow or red', () => {
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={false}
          value={TEST_VALUE_OVER_50}
          maxValue={TEST_MAX_VALUE}
          variant={LoaderVariant.Warning}
          aria-label="required label"
        />,
      );
      expect(screen.queryByRole('status')).toHaveTextContent(
        `${getAnnouncementMessage(
          TEST_VALUE_OVER_50,
          TEST_MAX_VALUE,
        )} Status is ${Color.Yellow}.`,
      );
    });
  });
});
