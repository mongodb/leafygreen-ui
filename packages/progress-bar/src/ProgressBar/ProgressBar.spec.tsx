import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProgressBar } from './ProgressBar';
import { Color, LoaderVariant, MeterStatus, Type } from './ProgressBar.types';
import {
  getFormattedValue,
  resolveProgressBarProps,
} from './ProgressBar.utils';

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
      expect(screen.getByText(TEST_LABEL)).toBeVisible();
    });

    test('renders with a description', () => {
      const TEST_DESCRIPTION = 'placeholder description';
      render(
        <ProgressBar
          type={Type.Loader}
          isIndeterminate={true}
          description={TEST_DESCRIPTION}
        />,
      );
      expect(screen.getByText(TEST_DESCRIPTION)).toBeVisible();
    });

    describe('with value format', () => {
      const TEST_VALUE = 50;
      const TEST_MAX_VALUE = 100;

      test('renders with a custom format when given a callback', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={true}
            value={TEST_VALUE}
            formatValue={value => `${value} units`}
          />,
        );
        expect(screen.getByText(`${TEST_VALUE} units`)).toBeVisible();
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
          />,
        );
        expect(screen.getByRole('img')).toBeVisible();
      });

      test('renders the correct width for the progress bar fill', () => {
        render(
          <ProgressBar
            type={Type.Loader}
            isIndeterminate={false}
            value={TEST_VALUE}
            maxValue={TEST_MAX_VALUE}
          />,
        );
        const barFillElement = screen.getByTestId('progress-bar-fill');
        expect(barFillElement).toBeInTheDocument();
        expect(barFillElement).toHaveStyle({
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
          />,
        );
        expect(screen.queryByRole('img')).toBeNull();
      });
    });
  });

  describe('getFormattedValue', () => {
    test('renders a fraction correctly', () => {
      expect(getFormattedValue(50, 100, 'fraction')).toBe('50/100');
    });

    test('renders a percentage correctly', () => {
      expect(getFormattedValue(50, 100, 'percentage')).toBe('50%');
    });

    test('renders a plain number correctly', () => {
      expect(getFormattedValue(50, 100, 'number')).toBe('50');
    });

    test('renders a custom format correctly', () => {
      expect(
        getFormattedValue(
          50,
          100,
          (value, maxValue) => `${value}/${maxValue} units`,
        ),
      ).toBe('50/100 units');
    });
  });

  describe('resolveProgressBarProps', () => {
    test('it correctly resolves props for a meter type', () => {
      const props = {
        type: Type.Meter,
        value: 50,
        maxValue: 100,
        status: MeterStatus.Warning,
      } as const;

      const resolvedProps = resolveProgressBarProps(props);
      expect(resolvedProps).toEqual({
        value: 50,
        maxValue: 100,
        disabled: false,
        color: Color.Yellow,
        isIndeterminate: false,
        enableAnimation: false,
      });
    });

    test('it correctly resolves props for a determinate loader type', () => {
      const props = {
        type: Type.Loader,
        isIndeterminate: false,
        value: 50,
        maxValue: 100,
        variant: LoaderVariant.Success,
        enableAnimation: true,
      } as const;

      const resolvedProps = resolveProgressBarProps(props);
      expect(resolvedProps).toEqual({
        value: 50,
        maxValue: 100,
        disabled: false,
        color: Color.Green,
        isIndeterminate: false,
        enableAnimation: true,
      });
    });

    test('it correctly resolves props for an indeterminate loader type', () => {
      const props = {
        type: Type.Loader,
        isIndeterminate: true,
      } as const;

      const resolvedProps = resolveProgressBarProps(props);
      expect(resolvedProps).toEqual({
        value: undefined,
        maxValue: undefined,
        disabled: false,
        color: Color.Blue,
        isIndeterminate: true,
        enableAnimation: false,
      });
    });
  });
});
