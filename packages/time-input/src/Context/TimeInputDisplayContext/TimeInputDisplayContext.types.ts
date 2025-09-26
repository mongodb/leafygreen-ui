import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { BaseTimeInputProps } from '../../TimeInput/TimeInput.types';
import { ReactNode } from 'react';
import { LgIdProps } from '@leafygreen-ui/lib';

type AriaLabelKeys = keyof AriaLabelPropsWithLabel;
type AriaLabelKeysWithoutLabel = Exclude<AriaLabelKeys, 'label'>;
type DataLgIdKeys = keyof LgIdProps;

/**
 * The values in context
 * Omits the aria-label and aria-labelledby props and replaces them with the ariaLabelProp and ariaLabelledbyProp
 * Omits the state prop
 */
export type TimeInputDisplayContextProps = Omit<
  Required<BaseTimeInputProps>,
  AriaLabelKeysWithoutLabel | 'state' | DataLgIdKeys
> & {
  ariaLabelProp: string;
  ariaLabelledbyProp: string;
};

/**
 * The props expected to pass into the provider
 * Ensures that either label, aria-label, or aria-labelledby is included
 */
export type TimeInputDisplayProviderProps = Omit<
  BaseTimeInputProps,
  AriaLabelKeys
> & {
  label?: ReactNode;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};
