import { ChangeEvent } from 'react';
import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';
import { DarkModeProps, LgIdProps } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export const TimeInputState = omit(FormFieldState, 'Valid');
export type TimeInputState =
  (typeof TimeInputState)[keyof typeof TimeInputState];

export { Size };

export interface BaseTimeInputProps extends DarkModeProps, LgIdProps {
  state?: TimeInputState;
  label?: React.ReactNode;
  description?: string;
  size?: Size;
  disabled?: boolean;
  className?: string;
}

export type TimeInputProps = {
  value?: string;
  onTimeChange?: (value: string) => void;
  handleValidation?: (value: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
} & BaseTimeInputProps;
