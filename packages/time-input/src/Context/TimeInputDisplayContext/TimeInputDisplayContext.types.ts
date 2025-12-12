import { ReactNode } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';

import { DisplayTimeInputProps } from '../../TimeInput/TimeInput.types';

type AriaLabelKeys = keyof AriaLabelPropsWithLabel;
type AriaLabelKeysWithoutLabel = Exclude<AriaLabelKeys, 'label'>;
type DarkModeKeys = keyof DarkModeProps;

/**
 * The values in context that can be used in the component
 * Omits the aria-label and aria-labelledby props and replaces them with the ariaLabelProp and ariaLabelledbyProp
 * Omits the state prop
 * Omits the lgId prop
 */
export type TimeInputDisplayContextProps = Omit<
  Required<DisplayTimeInputProps>,
  AriaLabelKeysWithoutLabel | 'state' | DarkModeKeys
> & {
  /**
   *  The aria-label prop
   */
  ariaLabelProp: string;

  /**
   * The aria-labelledby prop
   */
  ariaLabelledbyProp: string;

  /**
   * Whether the input has been interacted with
   */
  isDirty: boolean;

  /**
   * Setter for whether the input has been interacted with
   */
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the time input is in 12-hour format. Helps determine if the AM/PM select should be shown.
   *
   * @default false
   */
  is12HourFormat: boolean;

  /**
   * An array of {@link Intl.DateTimeFormatPart},
   * used to determine the order of segments in the input
   */
  formatParts?: Array<Intl.DateTimeFormatPart>;
};

/**
 * The props expected to pass into the provider
 * Ensures that either label, aria-label, or aria-labelledby is included
 */
export type TimeInputDisplayProviderProps = Omit<
  DisplayTimeInputProps,
  AriaLabelKeys | DarkModeKeys
> & {
  /**
   * The label prop
   */
  label?: ReactNode;

  /**
   * The aria-label prop
   */
  'aria-label'?: string;

  /**
   * The aria-labelledby prop
   */
  'aria-labelledby'?: string;
};
