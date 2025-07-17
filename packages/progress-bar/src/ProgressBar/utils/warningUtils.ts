import { AnimatedVariant, Role } from '../ProgressBar.types';

/** Warns if role "meter" is assigned improperly. */
export const warnMeterRole = (props: any): void => {
  if (props.roleType === Role.Meter)
    console.warn('Only determinate bars support role "meter".');
};

/** Warns if `enableAnimation` flag is used improperly. */
export const warnEnableAnimationFlag = (props: any): void => {
  if (props.enableAnimation) {
    console.warn(
      'Only determinate bars with role "progressbar" support additional animation.',
    );
  }
};

/** Warns if non-animated variants are used improperly. */
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
