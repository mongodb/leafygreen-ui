import { HTMLProps } from 'react';
import { DarkModeProps } from '@leafygreen-ui/lib';

const Variant = {
  Default: 'default',
  Primary: 'primary',
  PrimaryOutline: 'primaryOutline',
  Danger: 'danger',
  DangerOutline: 'dangerOutline',
  BaseGreen: 'baseGreen',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

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

interface ButtonProps extends DarkModeProps {
  // Would prefer to use Pick<> to extract these properties, but they would not be correctly imported into Storybook otherwise.
  // https://github.com/storybookjs/storybook/issues/14798
  /**
   * Determines whether the button element will be disabled.
   *
   * @default false
   */
  disabled?: HTMLProps<HTMLButtonElement>['disabled'];
  onClick?: HTMLProps<HTMLButtonElement>['onClick'];
  type?: HTMLProps<HTMLButtonElement>['type'];
  className?: HTMLProps<HTMLButtonElement>['className'];
  variant?: Variant;
  baseFontSize?: FontSize;
  size?: Size;
  children?: React.ReactNode;
  leftGlyph?: React.ReactElement;
  rightGlyph?: React.ReactElement;
  href?: string;
  as?: keyof JSX.IntrinsicElements;
}

export { Variant, Size, Mode, FontSize, ButtonProps };
