/* eslint-disable jest/no-disabled-tests */
import { ProgressBarProps, Role, Variant } from './ProgressBar.types';

const requiredAriaLabel = { 'aria-label': 'required label' };

test.skip('Type errors for incompatible prop combinations', () => {
  {
    /*
     * restrictions on indeterminate bars
     */
    const _IndeterminateCannotUseRoleType: ProgressBarProps = {
      isIndeterminate: true,
      // @ts-expect-error - indeterminate cannot use roleType prop
      roleType: Role.Progress,
      ...requiredAriaLabel,
    };

    const _IndeterminateCannotBeDisabled: ProgressBarProps = {
      isIndeterminate: true,
      // @ts-expect-error - indeterminate cannot be disabled
      disabled: true,
      ...requiredAriaLabel,
    };

    // @ts-expect-error - indeterminate cannot be warning variant
    const _IndeterminateCannotBeWarning: ProgressBarProps = {
      isIndeterminate: true,
      variant: Variant.Warning,
      ...requiredAriaLabel,
    };

    // @ts-expect-error - indeterminate cannot be error variant
    const _IndeterminateCannotBeError: ProgressBarProps = {
      isIndeterminate: true,
      variant: Variant.Error,
      ...requiredAriaLabel,
    };

    /*
     * restrictions on determinate bars with progress role AND have animation enabled
     */
    // @ts-expect-error - animated progress cannot be warning variant
    const _DeterminateProgressCannotBeWarningIfAnimated: ProgressBarProps = {
      roleType: Role.Progress,
      value: 50,
      enableAnimation: true,
      variant: Variant.Warning,
      ...requiredAriaLabel,
    };

    // @ts-expect-error - animated progress cannot be error variant
    const _DeterminateProgressCannotBeWarningIfError: ProgressBarProps = {
      roleType: Role.Progress,
      value: 50,
      enableAnimation: true,
      variant: Variant.Error,
      ...requiredAriaLabel,
    };

    /*
     * restrictions on determinate bars with meter role
     */
    const _DeterminateMeterCannotUseEnableAnimation: ProgressBarProps = {
      roleType: Role.Meter,
      value: 10,
      // @ts-expect-error - meter cannot enable animation
      enableAnimation: true,
      ...requiredAriaLabel,
    };

    /*
     * valid base cases
     */
    const _ValidIndeterminate: ProgressBarProps = {
      isIndeterminate: true,
      variant: Variant.Info,
      ...requiredAriaLabel,
    };

    const _ValidDeterminateMeter: ProgressBarProps = {
      roleType: Role.Meter,
      value: 10,
      variant: Variant.Warning,
      ...requiredAriaLabel,
    };

    const _ValidDeterminateProgress: ProgressBarProps = {
      roleType: Role.Progress,
      value: 30,
      enableAnimation: true,
      variant: Variant.Success,
      ...requiredAriaLabel,
    };
  }
});
