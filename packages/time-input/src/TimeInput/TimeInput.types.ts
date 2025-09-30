import { ChangeEvent, ComponentPropsWithoutRef } from 'react';
import omit from 'lodash/omit';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DateType, LocaleString } from '@leafygreen-ui/date-utils';
import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

export const TimeInputState = omit(FormFieldState, 'Valid');
export type TimeInputState =
  (typeof TimeInputState)[keyof typeof TimeInputState];

export { Size };

/**
 * Props that are added to the display context
 */
export type BaseTimeInputProps = {
  state?: TimeInputState;
  label?: React.ReactNode;
  description?: string;
  size?: Size;
  disabled?: boolean;
  locale?: LocaleString;
  timeZone?: string;
  min?: Date;
  max?: Date;
  baseFontSize?: BaseFontSize;
  errorMessage?: string;
} & DarkModeProps &
  LgIdProps &
  AriaLabelPropsWithLabel;

/**
 * Props that are added to the component
 */
export interface ComponentTimeInputProps
  extends ComponentPropsWithoutRef<'div'> {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Props that are used to control the value of the time input
 */
export interface ValueTimeInputProps {
  value?: DateType;
  initialValue?: DateType;
  onTimeChange?: (value?: DateType) => void;
  handleValidation?: (value?: DateType) => void;
}

/**
 * All props that are passed to the TimeInput component
 */
export type TimeInputProps = ValueTimeInputProps &
  BaseTimeInputProps &
  ComponentTimeInputProps;
