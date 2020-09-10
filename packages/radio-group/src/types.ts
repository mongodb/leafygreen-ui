const Variant = {
  Default: 'default',
  Light: 'light',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
} as const;

type Size = typeof Size[keyof typeof Size];

export { Size };
