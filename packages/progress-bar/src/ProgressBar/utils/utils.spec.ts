import { requiredA11yArgs } from '../../test.constants';
import { DEFAULT_VARIANT } from '../constants';
import { Role, Variant } from '../ProgressBar.types';

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
