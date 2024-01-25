import { ComponentPropsWithoutRef, ReactElement } from 'react';

import { Either } from '@leafygreen-ui/lib';

/**
 * Combobox Option Props
 */

type ListItemProps = Omit<ComponentPropsWithoutRef<'li'>, 'onClick' | 'value'>;

interface SharedComboboxOptionProps {
  /**
   * The internal value of the option. Used as the identifier in Combobox `initialValue`, value and filteredOptions.
   * When undefined, this is set to `_.kebabCase(displayName)`
   */
  value?: string;

  /**
   * The display value of the option. Used as the rendered string within the menu and chips.
   * When undefined, this is set to `value`
   */
  displayName?: string;

  /**
   * The icon to display to the left of the option in the menu.
   */
  glyph?: ReactElement;

  /**
   * Defines whether the option is disabled.
   * Node: disabled options are still rendered in the menu, but not selectable.
   */
  disabled?: boolean;

  /**
   * Styling Prop
   */
  className?: string;

  /**
   * Optional descriptive text under the displayName.
   */
  description?: string;

  /**
   * Callback fired when an option is clicked.
   */
  onClick?: (
    event: React.SyntheticEvent<HTMLLIElement, Event>,
    value: string,
  ) => void;
}

type RequiredComboboxOptionProps = Required<
  Pick<SharedComboboxOptionProps, 'value' | 'displayName'>
>;

type BaseComboboxOptionProps = ListItemProps & SharedComboboxOptionProps;

export type ComboboxOptionProps = Either<
  BaseComboboxOptionProps,
  'value' | 'displayName'
>;

export interface OptionObject
  extends Pick<SharedComboboxOptionProps, 'description' | 'onClick'>,
    RequiredComboboxOptionProps {
  isDisabled: boolean;
  hasGlyph?: boolean;
}

export interface InternalComboboxOptionProps
  extends ListItemProps,
    Omit<SharedComboboxOptionProps, 'value' | 'displayName'>,
    RequiredComboboxOptionProps {
  isSelected: boolean;
  isFocused: boolean;
  setSelected: () => void;
  index: number;
}
