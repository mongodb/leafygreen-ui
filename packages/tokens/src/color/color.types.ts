const State = {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
} as const;

type State = (typeof State)[keyof typeof State];

const Type = {
  Background: 'background',
  Border: 'border',
  Icon: 'icon',
  Text: 'text',
} as const;

type Type = (typeof Type)[keyof typeof Type];

const Variant = {
  Primary: 'primary',
  Secondary: 'secondary',
  InversePrimary: 'inversePrimary',
  InverseSecondary: 'inverseSecondary',
  Info: 'info',
  Warning: 'warning',
  Error: 'error',
  Success: 'success',
  Disabled: 'disabled',
} as const;

type Variant = (typeof Variant)[keyof typeof Variant];

export { State, Type, Variant };
