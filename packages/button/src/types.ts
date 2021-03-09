const Variant = {
  Primary: 'primary',
  Info: 'info',
  Default: 'default',
  Danger: 'danger',
  SecondaryDanger: 'secondaryDanger',
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

export interface ButtonProps {
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

  // Interaction Ring props
  borderRadius?: string;
  forceState?: {
    focused?: boolean;
    active?: boolean;
    // Supporting "hovered" requires factoring out all the &:hover
    // styles from the the base style and each variant's styles
  };
}

export { Variant, Size, Mode, FontSize };
