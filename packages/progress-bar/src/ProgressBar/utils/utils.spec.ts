import { requiredA11yArgs } from '../../test.constants';
import { Role } from '../ProgressBar.types';

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
        (value: number, maxValue?: number) => `${value}/${maxValue} units`,
      ),
    ).toBe('50/100 units');
  });
});

describe('resolveProgressBarProps', () => {
  test('it correctly resolves props for determinate with role "progressbar"', () => {
    const props = {
      value: 50,
      maxValue: 100,
      enableAnimation: true,
      ...requiredA11yArgs,
    } as const;

    const resolvedProps = resolveProgressBarProps(props);
    expect(resolvedProps).toEqual({
      role: Role.Progress,
      value: 50,
      maxValue: 100,
      disabled: false,
      isIndeterminate: false,
      enableAnimation: true,
    });
  });

  test('it correctly resolves props for determinate with role "meter"', () => {
    const props = {
      role: Role.Meter,
      value: 50,
      maxValue: 100,
      ...requiredA11yArgs,
    } as const;

    const resolvedProps = resolveProgressBarProps(props);
    expect(resolvedProps).toEqual({
      role: Role.Meter,
      value: 50,
      maxValue: 100,
      disabled: false,
      isIndeterminate: false,
      enableAnimation: false,
    });
  });

  test('it ignores invalid props for determinate with role "meter"', () => {
    const props = {
      role: Role.Meter,
      value: 50,
      maxValue: 100,
      enableAnimation: true,
      ...requiredA11yArgs,
    } as const;

    const resolvedProps = resolveProgressBarProps(props);
    expect(resolvedProps).toEqual(
      expect.objectContaining({
        enableAnimation: false,
      }),
    );
  });

  test('it correctly resolves props for indeterminate', () => {
    const props = {
      isIndeterminate: true,
      ...requiredA11yArgs,
    } as const;

    const resolvedProps = resolveProgressBarProps(props);
    expect(resolvedProps).toEqual({
      role: Role.Progress,
      value: undefined,
      maxValue: undefined,
      disabled: false,
      isIndeterminate: true,
      enableAnimation: false,
    });
  });

  test('it ignores invalid props for indeterminate', () => {
    const props = {
      isIndeterminate: true,
      role: Role.Meter,
      enableAnimation: true,
      ...requiredA11yArgs,
    } as const;

    const resolvedProps = resolveProgressBarProps(props);
    expect(resolvedProps).toEqual(
      expect.objectContaining({
        role: Role.Progress,
        enableAnimation: false,
      }),
    );
  });
});
