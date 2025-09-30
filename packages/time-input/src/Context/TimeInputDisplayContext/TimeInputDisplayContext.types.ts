import { ReactNode } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { Theme } from '@leafygreen-ui/lib';

import { DisplayTimeInputProps } from '../../TimeInput/TimeInput.types';

type AriaLabelKeys = keyof AriaLabelPropsWithLabel;
type AriaLabelKeysWithoutLabel = Exclude<AriaLabelKeys, 'label'>;

/**
 * The values in context that can be used in the component
 * Omits the aria-label and aria-labelledby props and replaces them with the ariaLabelProp and ariaLabelledbyProp
 * Omits the state prop
 * Omits the lgId prop
 */
export type TimeInputDisplayContextProps = Omit<
  Required<DisplayTimeInputProps>,
  AriaLabelKeysWithoutLabel | 'state'
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
   * The theme of the input
   */
  theme: Theme;
};

/**
 * The props expected to pass into the provider
 * Ensures that either label, aria-label, or aria-labelledby is included
 */
export type TimeInputDisplayProviderProps = Omit<
  DisplayTimeInputProps,
  AriaLabelKeys
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
