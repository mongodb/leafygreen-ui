import {
  Color,
  LoaderVariant,
  MeterStatus,
  Type,
} from '../ProgressBar/ProgressBar.types';

import { getFormattedValue, resolveProgressBarProps } from './utils';

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
