const Variant = {
  Primary: 'primary',
  PrimaryOutline: 'primaryOutline',
  Default: 'default',
  Danger: 'danger',
  DangerOutline: 'dangerOutline',
} as const;

type Variant = (typeof Variant)[keyof typeof Variant];

export { Variant };

export interface Options {
  backgroundColor: string;
}
