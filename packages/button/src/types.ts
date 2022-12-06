import React, { HTMLProps } from 'react';

import { BaseFontSize } from '@leafygreen-ui/tokens';

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
 * @default 'default'
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
   * @default `() => {}`
   */
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];

  /**
   * Specifies the `type` property of the HTML button element
   *
   * @default 'button'
   */
  type?: HTMLProps<HTMLButtonElement>['type'];

  /**
   * Specifies a CSS class passed to the element.
   */
  className?: HTMLProps<HTMLButtonElement>['className'];

  /**
   * Sets the variant for the Button
   *
   * @default 'default'
   */
  variant?: Variant;

  /**
   * Determines if the component renders in dark mode
   *
   * @default false
   */
  darkMode?: boolean;

  /**
   * Determines the base font-size of the component
   *
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * Sets the size for the Button
   *
   * @default 'default'
   */
  size?: Size;

  /**
   * The content that will appear inside of the `<Button />` component.
   */
  children?: React.ReactNode;
  /**
   * An icon glyph rendered before the button text.
   * To use a custom icon, see {@link Icon}: `createIconComponent` docs
   * @type Leafygreen <Icon /> Component
   */
  leftGlyph?: React.ReactElement;
  /**
   * An icon glyph rendered after the button text.
   * To use a custom icon, see {@link Icon}: `createIconComponent` docs
   * @type Leafygreen <Icon /> Component
   */
  rightGlyph?: React.ReactElement;
  /**
   * A `href` prop that will make the Button render as an anchor tag.
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
   * @type HTMLElement | React.Component
   */
  as?: React.ElementType<any>;
}

export { ButtonProps,Size, Variant };
