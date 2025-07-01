/* eslint-disable jest/no-disabled-tests */
import {
  LoaderVariant,
  MeterStatus,
  ProgressBarProps,
  Type,
} from './ProgressBar.types';

test.skip('Type errors for incompatible prop combinations', () => {
  {
    const _MeterCannotUseVariantProp: ProgressBarProps = {
      type: Type.Meter,
      // @ts-expect-error - meter type should not have variant prop
      variant: LoaderVariant.Info,
    };

    const _MeterCannotUseIsIndeterminateProp: ProgressBarProps = {
      type: Type.Meter,
      // @ts-expect-error - meter type should not have isIndeterminate prop
      isIndeterminate: false,
    };

    const _LoaderCannotUseStatusProp: ProgressBarProps = {
      type: Type.Loader,
      // @ts-expect-error - loader type should not have status prop
      status: MeterStatus.Warning,
    };

    const _IndeterminateLoaderCannotBeWarning: ProgressBarProps = {
      type: Type.Loader,
      isIndeterminate: true,
      // @ts-expect-error - warning variant should not be used with indeterminate
      variant: LoaderVariant.Warning,
    };

    const _IndeterminateLoaderCannotBeError: ProgressBarProps = {
      type: Type.Loader,
      isIndeterminate: true,
      // @ts-expect-error - error variant should not be used with indeterminate
      variant: LoaderVariant.Error,
    };

    const _IndeterminateLoaderCannotBeDisabled: ProgressBarProps = {
      type: Type.Loader,
      isIndeterminate: true,
      // @ts-expect-error - indeterminate loader should not be disabled
      disabled: true,
    };

    const _IndeterminateLoaderCannotUseEnableAnimation: ProgressBarProps = {
      type: Type.Loader,
      isIndeterminate: true,
      // @ts-expect-error - enableAnimation should not be used with indeterminate
      enableAnimation: true,
    };

    const _AnimatedDeterminateLoaderCannotBeWarning: ProgressBarProps = {
      type: Type.Loader,
      enableAnimation: true,
      // @ts-expect-error - animated determinate loader should not use warning variant
      variant: LoaderVariant.Warning,
    };

    const _AnimatedDeterminateLoaderCannotBeError: ProgressBarProps = {
      type: Type.Loader,
      enableAnimation: true,
      // @ts-expect-error - animated determinate loader should not use error variant
      variant: LoaderVariant.Error,
    };
  }
});
