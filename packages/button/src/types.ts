import { BaseFontSize } from '@leafygreen-ui/tokens';
import React, { HTMLProps } from 'react';

export const Variant = {
  Default: 'default',
  Primary: 'primary',
  PrimaryOutline: 'primaryOutline',
  Danger: 'danger',
  DangerOutline: 'dangerOutline',
  BaseGreen: 'baseGreen',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

/**
 * Size variants
 *
 * Default: `'default'`
 */
export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
};

export type Size = typeof Size[keyof typeof Size];

// TODO: Remove in next major release
export const FontSize = {
  Body1: 13,
  Body2: 16,
} as const;

export type FontSize = typeof FontSize[keyof typeof FontSize];

export interface ButtonProps {
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

  /**
   * The component or HTML Element that the button is rendered as.
   *
   * To use with NextJS Links, pass in a component that wraps the Link:
   * ```js
   * const Linker = ({ href, children, ...props }) => (
   *  <NextLink href={href}>
   *    <a {...props}>{children}</a>
   *  </NextLink>
   * );
   * <Button as={Linker} />
   * ```
   */
  as?: React.ElementType<any>;
}
