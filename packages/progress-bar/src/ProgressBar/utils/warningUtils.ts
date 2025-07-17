import { AnimatedVariant, Role } from '../ProgressBar.types';

export const warnMeterRole = (props: any): void => {
  if (props.roleType === Role.Meter)
    console.warn('Only determinate bars support role "meter".');
};

export const warnEnableAnimationFlag = (props: any): void => {
  if (props.enableAnimation) {
    console.warn(
      'Only determinate bars with role "progressbar" support additional animation.',
    );
  }
};

export const warnAnimatedVariant = (props: any): void => {
  if (
    props.variant &&
    !Object.values(AnimatedVariant).includes(props.variant)
  ) {
    console.warn(
      'Only non-animated determinate bars support "warning" or "error" variants.',
    );
  }
};
