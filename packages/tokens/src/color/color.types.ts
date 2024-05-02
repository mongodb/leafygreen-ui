const Type = {
  Background: 'background',
  Border: 'border',
  Icon: 'icon',
  Text: 'text',
} as const;
type Type = (typeof Type)[keyof typeof Type];

const Variant = {
  Disabled: 'disabled',
  Placeholder: 'placeholder',
  Primary: 'primary',
  Secondary: 'secondary',
  InversePrimary: 'inversePrimary',
  InverseSecondary: 'inverseSecondary',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Success: 'success',
  Link: 'link',
} as const;
type Variant = (typeof Variant)[keyof typeof Variant];

const State = {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
} as const;
type State = (typeof State)[keyof typeof State];

export type VariantColorRecord = Partial<
  Record<Variant, Record<State, string>>
>;
export type ModeColorRecord = Record<Type, VariantColorRecord>;

export { State, Type, Variant };
