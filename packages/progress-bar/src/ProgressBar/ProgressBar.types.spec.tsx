/* eslint-disable jest/no-disabled-tests */
import { requiredA11yArgs } from '../test.constants';

import { ProgressBarProps, Role, Variant } from './ProgressBar.types';

test.skip('Type errors for incompatible prop combinations', () => {
  {
    /*
     * restrictions on indeterminate bars
     */
    const _IndeterminateCannotUseRoleType: ProgressBarProps = {
      isIndeterminate: true,
      // @ts-expect-error - indeterminate cannot use role prop
      role: Role.Progress,
      ...requiredA11yArgs,
    };

    const _IndeterminateCannotBeDisabled: ProgressBarProps = {
      isIndeterminate: true,
      // @ts-expect-error - indeterminate cannot be disabled
      disabled: true,
      ...requiredA11yArgs,
    };

    // @ts-expect-error - indeterminate cannot be warning variant
    const _IndeterminateCannotBeWarning: ProgressBarProps = {
      isIndeterminate: true,
      variant: Variant.Warning,
      ...requiredA11yArgs,
    };

    // @ts-expect-error - indeterminate cannot be error variant
    const _IndeterminateCannotBeError: ProgressBarProps = {
      isIndeterminate: true,
      variant: Variant.Error,
      ...requiredA11yArgs,
    };

    /*
     * restrictions on determinate bars with progress role AND with animation enabled
     */
    // @ts-expect-error - animated progress cannot be warning variant
    const _DeterminateProgressCannotBeWarningIfAnimated: ProgressBarProps = {
      role: Role.Progress,
      value: 50,
      enableAnimation: true,
      variant: Variant.Warning,
      ...requiredA11yArgs,
    };

    // @ts-expect-error - animated progress cannot be error variant
    const _DeterminateProgressCannotBeErrorIfAnimated: ProgressBarProps = {
      role: Role.Progress,
      value: 50,
      enableAnimation: true,
      variant: Variant.Error,
      ...requiredA11yArgs,
    };

    /*
     * restrictions on determinate bars with meter role
     */
    const _DeterminateMeterCannotUseEnableAnimation: ProgressBarProps = {
      role: Role.Meter,
      value: 10,
      // @ts-expect-error - meter cannot enable animation
      enableAnimation: true,
      ...requiredA11yArgs,
    };

    /*
     * valid base cases
     */
    const _ValidIndeterminate: ProgressBarProps = {
      isIndeterminate: true,
      variant: Variant.Info,
      ...requiredA11yArgs,
    };

    const _ValidDeterminateMeter: ProgressBarProps = {
      role: Role.Meter,
      value: 10,
      variant: Variant.Warning,
      ...requiredA11yArgs,
    };

    const _ValidDeterminateProgress: ProgressBarProps = {
      role: Role.Progress,
      value: 30,
      enableAnimation: true,
      variant: Variant.Success,
      ...requiredA11yArgs,
    };
  }
});
