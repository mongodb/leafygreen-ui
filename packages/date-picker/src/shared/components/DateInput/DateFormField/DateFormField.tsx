import React from 'react';

import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { useDatePickerContext } from '../../DatePickerContext';
import { CalendarButton } from '../CalendarButton';

import { DateFormFieldProps } from './DateFormField.types';

/**
 * A wrapper around `FormField` that sets the relevant
 * attributes, styling & icon button
 */
export const DateFormField = React.forwardRef<
  HTMLDivElement,
  DateFormFieldProps
>(
  (
    {
      children,
      onInputClick,
      onIconButtonClick,
      buttonRef,
      ...rest
    }: DateFormFieldProps,
    fwdRef,
  ) => {
    const {
      label,
      description,
      state,
      errorMessage,
      disabled,
      isOpen,
      menuId,
      size,
    } = useDatePickerContext();

    return (
      <FormField
        ref={fwdRef}
        label={label}
        description={description}
        disabled={disabled}
        state={state}
        errorMessage={errorMessage}
        size={size}
        {...rest}
      >
        <FormFieldInputContainer
          role="combobox"
          tabIndex={-1}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={onInputClick}
          contentEnd={
            <CalendarButton ref={buttonRef} onClick={onIconButtonClick} />
          }
        >
          {children}
        </FormFieldInputContainer>
      </FormField>
    );
  },
);

DateFormField.displayName = 'DateFormField';
