import { HTMLProps } from 'react';

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

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const FontSize = {
  Body1: 13,
  Body2: 16,
} as const;

type FontSize = typeof FontSize[keyof typeof FontSize];

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
  baseFontSize?: FontSize;

  /**
   * Sets the size for the Button
   *
   * Default: `'default'`
   */
  size?: Size;
  children?: React.ReactNode;
  leftGlyph?: React.ReactElement;
  rightGlyph?: React.ReactElement;
  href?: string;
  as?: keyof JSX.IntrinsicElements;
}

export { Variant, Size, Mode, FontSize, ButtonProps };
