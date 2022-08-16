export const Variant = {
  Note: 'note',
  Tip: 'tip',
  Important: 'important',
  Warning: 'warning',
  Example: 'example',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];
