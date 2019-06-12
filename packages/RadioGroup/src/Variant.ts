const Variant = {
  Default: 'default',
  Light: 'light',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export default Variant;
