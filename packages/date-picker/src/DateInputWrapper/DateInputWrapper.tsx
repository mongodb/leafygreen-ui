import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../DatePickerContext';

import {
  baseWrapperStyles,
  childrenWrapperStyles,
  errorIconStyles,
  iconStyles,
  inputBaseStyles,
  inputFocusStyles,
  inputModeStyles,
  inputSizeStyles,
  inputStateStyles,
  textContainerStyle,
  wrapperFontStyles,
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
      state = InputState.Unset,
      errorMessage,
      children,
      inputId,
      descriptionId,
      errorId,
      ...rest
    }: DateInputWrapperProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { size } = useDatePickerContext();
    const baseFontSize = useUpdatedBaseFontSize();

    return (
      <div
        className={cx(baseWrapperStyles, wrapperFontStyles[baseFontSize])}
        ref={fwdRef}
        {...rest}
      >
        <div className={textContainerStyle}>
          {label && <Label htmlFor={inputId}>{label}</Label>}
          {description && (
            <Description id={descriptionId}>{description}</Description>
          )}
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
          <div className={childrenWrapperStyles}>{children}</div>
          {state === InputState.Error && (
            <Icon glyph="Warning" className={errorIconStyles[theme]} />
          )}
          <Icon glyph="Calendar" className={iconStyles} />
        </div>
        {state === InputState.Error && (
          <Error id={errorId}>{errorMessage}</Error>
        )}
      </div>
    );
  },
);

DateInputWrapper.displayName = 'DateInputWrapper';
