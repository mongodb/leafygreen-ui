import { isUndefined } from 'lodash';

export type AsPropType = keyof JSX.IntrinsicElements | React.ExoticComponent<any>;

/** Identifies whether the `as` prop is included in JSX.IntrinsicElements */
export const isJSXIntrinsicElement = (
  as?: AsPropType,
): as is keyof JSX.IntrinsicElements =>
  !isUndefined(as) && typeof as === 'string';

/** Identifies whether the `as` prop is a Component */
export const isAsComponent = (
  as?: AsPropType,
): as is React.ExoticComponent<any> =>
  !isUndefined(as) && typeof as !== 'string';