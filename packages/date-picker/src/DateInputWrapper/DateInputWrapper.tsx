import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { Description, Error, Label } from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../DatePickerContext';

import {
  baseStyles,
  errorIconStyles,
  iconStyles,
  inputBaseStyles,
  inputFocusStyles,
  inputModeStyles,
  inputSizeStyles,
  inputStateStyles,
  textContainerStyle,
} from './DateInputWrapper.styles';
import { DateInputWrapperProps, InputState } from './DateInputWrapper.types';

export const DateInputWrapper = React.forwardRef<
  HTMLDivElement,
  DateInputWrapperProps
>(
  (
    {
      label,
      description,
      state,
      errorMessage,
      children,
      inputId,
      ...rest
    }: DateInputWrapperProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { size } = useDatePickerContext();

    return (
      <div className={cx(baseStyles)} ref={fwdRef} {...rest}>
        <div className={textContainerStyle}>
          <Label htmlFor={inputId}>{label}</Label>
          <Description>{description}</Description>
        </div>
        <div
          className={cx(
            inputBaseStyles,
            inputModeStyles[theme],
            inputFocusStyles[theme],
            inputSizeStyles[size ?? Size.Default],
            inputStateStyles[state][theme],
          )}
        >
          {children}
          {state === InputState.Error && (
            <Icon glyph="Warning" className={errorIconStyles[theme]} />
          )}
          <Icon glyph="Calendar" className={iconStyles} />
        </div>
        {state === InputState.Error && <Error>{errorMessage}</Error>}
      </div>
    );
  },
);

DateInputWrapper.displayName = 'DateInputWrapper';
