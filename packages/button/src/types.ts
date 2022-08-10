import { BaseFontSize } from '@leafygreen-ui/tokens';
import { isUndefined } from 'lodash';
import React, { HTMLProps } from 'react';
import NextLink from './NextLink.type'

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

interface ButtonProps {
  as?: keyof JSX.IntrinsicElements | NextLink;


  // Would prefer to use Pick<> to extract these properties, but they would not be correctly imported into Storybook otherwise.
  // https://github.com/storybookjs/storybook/issues/14798

  /**
   * Determines whether the button element will be disabled.
   *
   * @default false
   */
  disabled?: HTMLProps<HTMLButtonElement>['disabled'];

  /**
   * Callback fired when the button is clicked
   *
   * Default: `() => {}`
   */
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];

  /**
   * Specifies the `type` property of the HTML button element
   *
   * Default: `'button''
   */
  type?: HTMLProps<HTMLButtonElement>['type'];

  /**
   * Specifies a CSS class passed to the element.
   */
  className?: HTMLProps<HTMLButtonElement>['className'];

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

  /**
   * A `href` prop that will make the Button render as an anchor tag.
   *
   * Default: `undefined`
   */
  href?: string;
}

/** Identifies whether the `as` prop is included in JSX.IntrinsicElements */
export const isJSXIntrinsicElement = (as?: keyof JSX.IntrinsicElements | NextLink): as is keyof JSX.IntrinsicElements => !isUndefined(as) && typeof as === 'string';

/** Identifies whether the `as` prop is a Component */
export const isAsComponent = (as?: keyof JSX.IntrinsicElements | NextLink): as is NextLink => !isUndefined(as) && typeof as !== 'string';

export { Variant, Size, ButtonProps };
