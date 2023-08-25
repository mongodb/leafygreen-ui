export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
} as const;

export type Size = (typeof Size)[keyof typeof Size];
