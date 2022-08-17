export type StyledElements =
  | 'toast'
  | 'body'
  | 'icon'
  | 'contentWrapper'
  | 'dismissButton';

const Variant = {
  Success: 'success',
  Note: 'note',
  Warning: 'warning',
  Important: 'important',
  Progress: 'progress',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };
