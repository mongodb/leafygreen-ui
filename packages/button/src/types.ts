import { BaseFontSize } from '@leafygreen-ui/tokens';
import { isUndefined } from 'lodash';
import React, { HTMLProps } from 'react';

const Variant = {
  Default: 'default',
  Primary: 'primary',
  PrimaryOutline: 'primaryOutline',
  Danger: 'danger',
  DangerOutline: 'dangerOutline',
  BaseGreen: 'baseGreen',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

/**
 * Size variants
 *
 * Default: `'default'`
 */
const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
};

type Size = typeof Size[keyof typeof Size];

// TODO: Remove in next major release
export const FontSize = {
  Body1: 13,
  Body2: 16,
} as const;

export type FontSize = typeof FontSize[keyof typeof FontSize];

interface BaseButtonProps extends Omit<HTMLProps<'button'>, 'size'> {
  /**
   * Sets the variant for the Button
   *
   * Default: `'default'`
   */
  variant?: Variant;
  darkMode?: boolean;
  baseFontSize?: BaseFontSize;

  /**
   * Sets the size for the Button
   *
   * Default: `'default'`
   */
  size?: Size;
  children?: React.ReactNode;
  /**
   * An icon glyph rendered before the button text.
   *
   * Default: `undefined`
   */
  leftGlyph?: React.ReactElement;
  /**
   * An icon glyph rendered after the button text.
   *
   * Default: `undefined`
   */
  rightGlyph?: React.ReactElement;
}

type ButtonProps = BaseButtonProps &
(
  {
    as: keyof Pick<JSX.IntrinsicElements, 'a'> | React.ComponentType<any>;
    href?: string;
  } | {
    as: keyof Omit<JSX.IntrinsicElements, 'a'>;
    href?: never
  }
)

/** Identifies whether the `as` prop is included in JSX.IntrinsicElements */
export const isJSXIntrinsicElement = (
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>,
): as is keyof JSX.IntrinsicElements =>
  !isUndefined(as) && typeof as === 'string';

/** Identifies whether the `as` prop is a Component */
export const isReactComponent = (
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>,
): as is React.ComponentType<any> =>
  !isUndefined(as) && typeof as !== 'string';

export { Variant, Size, ButtonProps };
