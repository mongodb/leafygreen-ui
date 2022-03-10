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

type FontSize = 14 | 16;

interface ButtonProps {
  variant?: Variant;
  darkMode?: boolean;
  baseFontSize?: FontSize;
  size?: Size;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  leftGlyph?: React.ReactElement;
  rightGlyph?: React.ReactElement;
  href?: string;
  type?: JSX.IntrinsicElements['button']['type'];
  as?: keyof JSX.IntrinsicElements;
}

export { Variant, Size, Mode, FontSize, ButtonProps };
