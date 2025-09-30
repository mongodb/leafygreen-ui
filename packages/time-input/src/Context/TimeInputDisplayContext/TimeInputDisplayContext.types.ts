import { ReactNode } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { LgIdProps } from '@leafygreen-ui/lib';

import { BaseTimeInputProps } from '../../TimeInput/TimeInput.types';

type AriaLabelKeys = keyof AriaLabelPropsWithLabel;
type AriaLabelKeysWithoutLabel = Exclude<AriaLabelKeys, 'label'>;
type DataLgIdKeys = keyof LgIdProps;

/**
 * The values in context that can be used in the component
 * Omits the aria-label and aria-labelledby props and replaces them with the ariaLabelProp and ariaLabelledbyProp
 * Omits the state prop
 * Omits the lgId prop
 */
export type TimeInputDisplayContextProps = Omit<
  Required<BaseTimeInputProps>,
  AriaLabelKeysWithoutLabel | 'state' | DataLgIdKeys
> & {
  ariaLabelProp: string;
  ariaLabelledbyProp: string;
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
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
