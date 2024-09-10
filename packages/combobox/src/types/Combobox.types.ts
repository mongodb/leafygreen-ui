import { FormFieldState } from '@leafygreen-ui/form-field';

/**
 * Identifier for individual component elements within the Combobox
 */
export const ComboboxElement = {
  Input: 'Input',
  ClearButton: 'ClearButton',
  FirstChip: 'FirstChip',
  LastChip: 'LastChip',
  MiddleChip: 'MiddleChip',
  Combobox: 'Combobox',
  Menu: 'Menu',
} as const;
export type ComboboxElement =
  (typeof ComboboxElement)[keyof typeof ComboboxElement];

/**
 * The rendered size of the Combobox
 */
export const ComboboxSize = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;
export type ComboboxSize = (typeof ComboboxSize)[keyof typeof ComboboxSize];

/**
 * Defines the behavior of the Combobox when there are more selected chips than will fit in the input
 */
export const Overflow = {
  /**
   * Combobox will be set to a fixed width, and will expand its height based on the number of Chips selected
   */
  expandY: 'expand-y',
  /**
   * Combobox will be set to a fixed height and width (default 100% of container). Chips will be scrollable left-right
   */
  scrollX: 'scroll-x',
  /**
   * @deprecated
   */
  expandX: 'expand-x',
} as const;
export type Overflow = (typeof Overflow)[keyof typeof Overflow];

/** The error/valid state of the Combobox */
export const State = FormFieldState;
export type State = (typeof State)[keyof typeof State];

/** The search state of the Combobox */
export const SearchState = {
  Unset: 'unset',
  Error: 'error',
  Loading: 'loading',
} as const;
export type SearchState = (typeof SearchState)[keyof typeof SearchState];

/**
 * The type expected in the `value` or `initialValue` prop.
 * Also the type passed as an argument to `onChange`.
 *
 * Type varies depending on the value of `multiselect`
 */
export type SelectValueType<M extends boolean> = M extends true
  ? Array<string>
  : string | null;

/** Represents an element that was added or removed from the multiselect value array */
export interface DiffObject {
  diffType: 'insert' | 'delete';
  value: string | Array<string>;
}

/**
 * Callback event fired when the value changes
 *
 * Type varies depending on the value of `multiselect`
 */
// TODO: onChange signature should match the native event handler signature
export type onChangeType<M extends boolean> = M extends true
  ? (value: SelectValueType<true>, diff?: DiffObject) => void
  : (value: SelectValueType<false>) => void;

/**
 * Returns the correct empty state for multiselect / single select
 */
export function getNullSelection<M extends boolean>(
  multiselect: M,
): SelectValueType<M> {
  if (multiselect) {
    return [] as Array<string> as SelectValueType<M>;
  } else {
    return null as SelectValueType<M>;
  }
}
