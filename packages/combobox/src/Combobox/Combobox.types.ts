import React, { ReactNode } from 'react';

import { type ChipProps } from '@leafygreen-ui/chip';
import { Either, HTMLElementProps } from '@leafygreen-ui/lib';
import { PortalControlProps } from '@leafygreen-ui/popover';

import {
  ComboboxSize,
  onChangeType,
  Overflow,
  SearchState,
  SelectValueType,
  State,
} from '../types';

/**
 * Combobox Props
 */

export interface ComboboxMultiselectProps<M extends boolean> {
  /**
   * Defines whether a user can select multiple options, or only a single option.
   * When using TypeScript, `multiselect` affects the valid values of `initialValue`, `value`, and `onChange`
   */
  multiselect?: M;
  /**
   * The initial selection.
   * Must be a string (or array of strings) that matches the `value` prop of a `ComboboxOption`.
   * Changing the `initialValue` after initial render will not change the selection.
   */
  initialValue?: SelectValueType<M>;
  /**
   * A callback called when the selection changes.
   * Callback receives a single argument that is the new selection, either string, or string array
   */
  onChange?: onChangeType<M>;
  /**
   * The controlled value of the Combobox.
   * Must be a string (or array of strings) that matches the `value` prop of a `ComboboxOption`.
   * Changing `value` after initial render _will_ affect the selection.
   * `value` will always take precedence over `initialValue` if both are provided.
   */
  value?: SelectValueType<M>;

  /**
   * Defines the overflow behavior of a multiselect combobox.
   *
   * `expand-y`: Combobox has fixed width, and additional selections will cause the element to grow in the block direction.
   *
   * `expand-x`: Combobox has fixed height, and additional selections will cause the element to grow in the inline direction.
   *
   * `scroll-x`: Combobox has fixed height and width, and additional selections will cause the element to be scrollable in the x (horizontal) direction.
   */
  overflow?: M extends true ? Overflow : undefined;
}

type PartialChipProps = Pick<
  ChipProps,
  'chipTruncationLocation' | 'chipCharacterLimit' | 'popoverZIndex'
>;

export type BaseComboboxProps = Omit<HTMLElementProps<'div'>, 'onChange'> &
  PortalControlProps &
  PartialChipProps & {
    /**
     * Defines the Combobox Options by passing children. Must be `ComboboxOption` or `ComboboxGroup`
     */
    children?: ReactNode;

    /**
     * An accessible label for the input, rendered in a <label> to the DOM
     */
    label?: string;

    /**
     * An accessible label for the input, used only for screen-readers
     */
    'aria-label'?: string;

    /**
     * A description for the input
     */
    description?: ReactNode;

    /**
     * A placeholder for the input element. Uses the native `placeholder` attribute.
     */
    placeholder?: string;

    /**
     * Disables all interaction with the component
     */
    disabled?: boolean;

    /**
     * Defines the visual size of the component
     */
    size?: ComboboxSize;

    /**
     * Toggles Dark Mode
     */
    darkMode?: boolean;

    /**
     * The error state of the component. Defines whether the error message is displayed.
     */
    state?: State;

    /**
     * The message shown below the input when state is `error`
     */
    errorMessage?: ReactNode;

    /**
     * The message shown below the input when state is `valid`
     */
    successMessage?: ReactNode;

    /**
     * The state of search results. Toggles search messages within the menu.
     */
    searchState?: SearchState;

    /**
     * A message shown within the menu when there are no options passed in as children, or `filteredOptions` is an empty array
     */
    searchEmptyMessage?: string;

    /**
     * A message shown within the menu when searchState is `error`
     */
    searchErrorMessage?: string;

    /**
     * A message shown within the menu when searchState is `loading`
     */
    searchLoadingMessage?: string;

    /**
     * A callback called when the search input changes.
     * Receives a single argument that is the current input value.
     * Use this callback to set `searchState` and/or `filteredOptions` appropriately
     */
    onFilter?: (value: string) => void;

    /**
     * Defines whether the Clear button appears to the right of the input.
     */
    clearable?: boolean;

    /**
     * A callback fired when the Clear button is pressed.
     * Fired _after_ `onChange`, and _before_ `onFilter`
     */
    onClear?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

    /**
     * An array used to define which options are displayed.
     * Do not remove options from the JSX children, as this will affect the selected options
     */
    filteredOptions?: Array<string>;

    /**
     * A callback fired when the input text changes
     */
    onInputChange?: React.ChangeEventHandler<HTMLInputElement>;

    /**
     * Allows for a controlled text-input value
     */
    inputValue?: string;
  };

export type ComboboxProps<M extends boolean> = Either<
  BaseComboboxProps & ComboboxMultiselectProps<M>,
  'label' | 'aria-label'
>;
