const Size = {
  Default: 'default',
  Compact: 'compact',
  Full: 'full',
} as const;

type Size = typeof Size[keyof typeof Size];

export default Size;
