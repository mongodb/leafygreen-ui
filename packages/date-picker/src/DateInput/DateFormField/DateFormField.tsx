import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import {
  Description,
  Error,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../../DatePickerContext';

import {
  baseWrapperStyles,
  childrenWrapperStyles,
  errorIconStyles,
  iconButtonClassName,
  inputBaseStyles,
  inputDisabledStyles,
  inputFocusStyles,
  inputModeStyles,
  inputSizeStyles,
  inputStateStyles,
  textContainerStyle,
  wrapperFontStyles,
} from './DateFormField.styles';
import { DateFormFieldProps, InputState } from './DateFormField.types';

export const DateFormField = React.forwardRef<
  HTMLDivElement,
  DateFormFieldProps
>(
  (
    {
      label,
      description,
      state = InputState.Unset,
      errorMessage,
      children,
      inputId,
      labelId,
      descriptionId,
      errorId,
      onInputClick,
      onIconButtonClick,
      ...rest
    }: DateFormFieldProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { size, isOpen, menuId, disabled } = useDatePickerContext();
    const baseFontSize = useUpdatedBaseFontSize();

    return (
      <div
        className={cx(baseWrapperStyles, wrapperFontStyles[baseFontSize])}
        ref={fwdRef}
        {...rest}
      >
        <div className={textContainerStyle}>
          {label && (
            <Label htmlFor={inputId} id={labelId} disabled={disabled}>
              {label}
            </Label>
          )}
          {description && (
            <Description id={descriptionId} disabled={disabled}>
              {description}
            </Description>
          )}
        </div>
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
        <div
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-disabled={disabled}
          tabIndex={-1}
          onClick={onInputClick}
          className={cx(
            inputBaseStyles,
            inputModeStyles[theme],
            inputFocusStyles[theme],
            inputSizeStyles[size ?? Size.Default],
            inputStateStyles[state][theme],
            {
              [inputDisabledStyles[theme]]: disabled,
            },
          )}
        >
          <div className={childrenWrapperStyles}>{children}</div>
          {state === InputState.Error && (
            <Icon glyph="Warning" className={errorIconStyles[theme]} />
          )}
          <IconButton
            aria-label="Open calendar menu"
            className={iconButtonClassName}
            onClick={onIconButtonClick}
            type="button"
            disabled={disabled}
          >
            <Icon glyph="Calendar" />
          </IconButton>
        </div>
        {state === InputState.Error && (
          <Error id={errorId}>{errorMessage}</Error>
        )}
      </div>
    );
  },
);

DateFormField.displayName = 'DateFormField';
