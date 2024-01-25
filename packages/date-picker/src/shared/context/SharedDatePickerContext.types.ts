import { ReactNode } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DateType } from '@leafygreen-ui/date-utils';

import { BaseDatePickerProps, DatePickerState } from '../types';
import { ModifiedPopoverProps } from '../types/BaseDatePickerProps.types';

import { ModifiedPopoverPropkeys } from './SharedDatePickerContext.utils';
import { UseDatePickerErrorNotificationsReturnObject } from './useDatePickerErrorNotifications';

export interface StateNotification {
  state: DatePickerState;
  message: string;
}
type AriaLabelKeys = keyof AriaLabelPropsWithLabel;

/** The props expected to pass into the provider */
export type SharedDatePickerProviderProps = Omit<
  BaseDatePickerProps,
  AriaLabelKeys
> & {
  label?: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

type AriaLabelKeysWithoutLabel = Exclude<AriaLabelKeys, 'label'>;

type OptionalModifiedPopoverProps = Partial<ModifiedPopoverProps>;

/**
 * The values in context
 */
export interface SharedDatePickerContextProps
  extends Omit<
      Required<SharedDatePickerProviderProps>,
      'state' | AriaLabelKeysWithoutLabel | ModifiedPopoverPropkeys
    >,
    OptionalModifiedPopoverProps,
    UseDatePickerErrorNotificationsReturnObject {
  /** The earliest date accepted */
  min: Date;

  /** The latest date accepted */
  max: Date;

  /**
   * Returns whether the given date is within the component's min/max dates
   */
  isInRange: (d?: DateType) => boolean;

  /**
   * An array of {@link Intl.DateTimeFormatPart},
   * used to determine the order of segments
   */
  formatParts?: Array<Intl.DateTimeFormatPart>;

  /** a unique id for the menu element */
  menuId: string;

  /** Whether the menu is open */
  isOpen: boolean;

  /**
   * Setter to open or close the menu
   * @internal - Prefer using `open/close/toggleMenu`
   * from single/range component context
   */
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /** Identifies whether the component has been interacted with */
  isDirty: boolean;

  /** Setter for whether the component has been interacted with */
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;

  /** Identifies whether the select menus are open inside the menu */
  isSelectOpen: boolean;

  /** Setter for whether the select menus are open inside the menu */
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;

  /** aria-label */
  ariaLabelProp: string;

  /** aria-labelledby */
  ariaLabelledbyProp: string;
}
