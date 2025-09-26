import { ChangeEvent } from 'react';
import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';
import { DateType, LocaleString } from '@leafygreen-ui/date-utils';
import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';

export const TimeInputState = omit(FormFieldState, 'Valid');
export type TimeInputState =
  (typeof TimeInputState)[keyof typeof TimeInputState];

export { Size };

export type BaseTimeInputProps = {
  state?: TimeInputState;
  label?: React.ReactNode;
  description?: string;
  size?: Size;
  disabled?: boolean;
  className?: string;
  locale?: LocaleString;
  timeZone?: string;
  min?: Date;
  max?: Date;
  baseFontSize?: BaseFontSize;
  errorMessage?: string;
} & DarkModeProps &
  LgIdProps &
  AriaLabelPropsWithLabel;

export type TimeInputProps = {
  value?: DateType;
  initialValue?: DateType;
  onTimeChange?: (value?: DateType) => void;
  handleValidation?: (value?: DateType) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & BaseTimeInputProps;
