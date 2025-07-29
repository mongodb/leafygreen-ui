import { requiredA11yArgs } from '../../test.constants';
import { DEFAULT_VARIANT } from '../constants';
import { Role, Variant } from '../ProgressBar.types';

import {
  getFormattedValue,
  getValidMaxValue,
  getValidValue,
  resolveProgressBarProps,
} from './utils';

describe('getValidMaxValue', () => {
  test('defaults to maxValue of 1 when maxValue is less than 0', () => {
    expect(getValidMaxValue(-10)).toBe(1);
  });

  test('defaults to maxValue of 1 when maxValue is 0', () => {
    expect(getValidMaxValue(0)).toBe(1);
  });

  test('returns the original maxValue when it is greater than 0', () => {
    expect(getValidMaxValue(10)).toBe(10);
  });
});

describe('getValidValue', () => {
  const TEST_MAX_VALUE = 100;
  test('defaults to value of 0 when value is less than 0', () => {
    expect(getValidValue(-10, TEST_MAX_VALUE)).toBe(0);
  });

  test('defaults to maxValue when value is greater than maxValue', () => {
    expect(getValidValue(150, TEST_MAX_VALUE)).toBe(TEST_MAX_VALUE);
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
    expect(resolvedProps).toMatchObject({
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
    expect(resolvedProps).toMatchObject({
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
    expect(resolvedProps).toMatchObject({
      enableAnimation: false,
    });
  });

  test('it correctly resolves props for indeterminate', () => {
    const props = {
      isIndeterminate: true,
      ...requiredA11yArgs,
    } as const;

    const resolvedProps = resolveProgressBarProps(props);
    expect(resolvedProps).toMatchObject({
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
    expect(resolvedProps).toMatchObject({
      role: Role.Progress,
      enableAnimation: false,
    });
  });

  describe('with invalid values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    test('warns if indeterminate bar uses meter role', () => {
      const props = {
        isIndeterminate: true,
        role: Role.Meter,
        ...requiredA11yArgs,
      } as const;

      resolveProgressBarProps(props);
      expect(warnSpy).toHaveBeenCalledWith(
        'Only determinate bars support role "meter".',
      );
    });

    test('warns if indeterminate bar uses non-animated variant', () => {
      const props = {
        isIndeterminate: true,
        variant: Variant.Warning,
        ...requiredA11yArgs,
      } as const;

      // @ts-expect-error - indeterminate cannot be warning variant
      const resolvedProps = resolveProgressBarProps(props);
      expect(resolvedProps).toMatchObject({
        variant: DEFAULT_VARIANT,
      });
      expect(warnSpy).toHaveBeenCalledWith(
        'Only non-animated determinate bars support "warning" or "error" variants.',
      );
    });

    test('warns if determinate bar with meter role uses enableAnimation flag', () => {
      const props = {
        role: Role.Meter,
        enableAnimation: true,
        ...requiredA11yArgs,
      } as const;

      // @ts-expect-error - meter cannot enable animation
      resolveProgressBarProps(props);
      expect(warnSpy).toHaveBeenCalledWith(
        'Only determinate bars with role "progressbar" support the `enableAnimation` flag.',
      );
    });

    test('warns if determinate bar uses non-animated variant with enableAnimation flag', () => {
      const props = {
        value: 50,
        maxValue: 100,
        enableAnimation: true,
        variant: Variant.Warning,
        ...requiredA11yArgs,
      } as const;

      // @ts-expect-error - animated progress cannot be warning variant
      resolveProgressBarProps(props);
      expect(warnSpy).toHaveBeenCalledWith(
        'Only non-animated determinate bars support "warning" or "error" variants.',
      );
    });
  });
});
