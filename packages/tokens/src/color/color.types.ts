/**
 * The element property a color token applies to
 */
const Property = {
  Background: 'background',
  Border: 'border',
  Icon: 'icon',
  Text: 'text',
} as const;
type Property = (typeof Property)[keyof typeof Property];

/**
 * The context variant in which a color token should be applied
 */
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

/**
 * The interaction state in which a color token should be applied
 */
const InteractionState = {
  Default: 'default',
  Hover: 'hover',
  Focus: 'focus',
} as const;
type InteractionState =
  (typeof InteractionState)[keyof typeof InteractionState];

/**
 * A partial Record,
 * mapping a subset of {@link Variant} keys
 * to a Record of {@link InteractionState} color tokens
 */
export type VariantColorRecord = Partial<
  Record<Variant, Record<InteractionState, string>>
>;

/**
 * A Record mapping {@link Property} keys to {@link VariantColorRecord}
 */
export type PropertyColorRecord = Record<Property, VariantColorRecord>;

export { InteractionState, Property, Variant };
