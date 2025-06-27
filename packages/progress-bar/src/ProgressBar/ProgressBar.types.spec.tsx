/* eslint-disable jest/no-disabled-tests */
import { ProgressBarProps, Variant } from './ProgressBar.types';

test.skip('Type errors for incompatible prop combinations', () => {
  {
    const _MeterCannotUseVariantProp: ProgressBarProps = {
      type: 'meter',
      // @ts-expect-error - meter type should not have variant prop
      variant: Variant.Warning,
    };

    const _MeterCannotUseIsIndeterminateProp: ProgressBarProps = {
      type: 'meter',
      // @ts-expect-error - meter type should not have isIndeterminate prop
      isIndeterminate: false,
    };

    const _LoaderCannotUseStatusProp: ProgressBarProps = {
      type: 'loader',
      // @ts-expect-error - loader type should not have status prop
      status: 'healthy',
    };

    const _IndeterminateLoaderCannotBeWarning: ProgressBarProps = {
      type: 'loader',
      isIndeterminate: true,
      // @ts-expect-error - warning variant should not be used with indeterminate
      variant: Variant.Warning,
    };

    const _IndeterminateLoaderCannotBeError: ProgressBarProps = {
      type: 'loader',
      isIndeterminate: true,
      // @ts-expect-error - error variant should not be used with indeterminate
      variant: Variant.Error,
    };

    const _IndeterminateLoaderCannotBeDisabled: ProgressBarProps = {
      type: 'loader',
      isIndeterminate: true,
      // @ts-expect-error - indeterminate loader should not be disabled
      disabled: true,
    };

    const _IndeterminateLoaderCannotUseEnableAnimation: ProgressBarProps = {
      type: 'loader',
      isIndeterminate: true,
      // @ts-expect-error - enableAnimation should not be used with indeterminate
      enableAnimation: true,
    };

    const _AnimatedDeterminateLoaderCannotBeWarning: ProgressBarProps = {
      type: 'loader',
      enableAnimation: true,
      // @ts-expect-error - animated determinate loader should not use warning variant
      variant: Variant.Warning,
    };

    const _AnimatedDeterminateLoaderCannotBeError: ProgressBarProps = {
      type: 'loader',
      enableAnimation: true,
      // @ts-expect-error - animated determinate loader should not use error variant
      variant: Variant.Error,
    };
  }
});
