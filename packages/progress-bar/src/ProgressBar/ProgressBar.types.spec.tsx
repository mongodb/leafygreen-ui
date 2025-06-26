/* eslint-disable jest/no-disabled-tests */
import { ProgressBarProps, Variant } from './ProgressBar.types';

test.skip('Indeterminate and variant compatibility', () => {
  {
    const _MeterCannotUseVariantProp: ProgressBarProps = {
      type: 'meter',
      // @ts-expect-error - meter type should not have variant prop
      variant: Variant.Warning,
    };

    const _MeterCannotUseDeterminateProp: ProgressBarProps = {
      type: 'meter',
      // @ts-expect-error - meter type should not have isDeterminate prop
      isDeterminate: true,
    };

    const _LoaderCannotUseStatusProp: ProgressBarProps = {
      type: 'loader',
      // @ts-expect-error - loader type should not have status prop
      status: 'healthy',
    };

    const _IndeterminateCannotBeWarning: ProgressBarProps = {
      type: 'loader',
      isIndeterminate: true,
      // @ts-expect-error - warning variant should not be used with indeterminate
      variant: Variant.Warning,
    };

    const _IndeterminateCannotBeError: ProgressBarProps = {
      type: 'loader',
      isIndeterminate: true,
      // @ts-expect-error - error variant should not be used with indeterminate
      variant: Variant.Error,
    };

    const _AnimatedDeterminateCannotBeWarning: ProgressBarProps = {
      type: 'loader',
      enableAnimation: true,
      // @ts-expect-error - animated determinate loader should not use warning variant
      variant: Variant.Warning,
    };

    const _AnimatedDeterminateCannotError: ProgressBarProps = {
      type: 'loader',
      enableAnimation: true,
      // @ts-expect-error - animated determinate loader should not use warning variant
      variant: Variant.Error,
    };
  }
});
