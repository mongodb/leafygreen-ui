import React from 'react';

import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { useSharedDatePickerContext } from '../../../context';
import { DatePickerState } from '../../../types';
import { CalendarButton } from '../CalendarButton';

import { iconButtonStyles } from './DateFormField.styles';
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
      stateNotification: { state, message: errorMessage },
      disabled,
      isOpen,
      menuId,
      size,
      ariaLabelProp,
      ariaLabelledbyProp,
    } = useSharedDatePickerContext();

    return (
      <FormField
        label={label}
        description={description}
        disabled={disabled}
        state={state}
        errorMessage={errorMessage}
        size={size}
        {...rest}
      >
        <FormFieldInputContainer
          ref={fwdRef}
          role="combobox"
          tabIndex={-1}
          aria-label={!label && ariaLabelProp ? ariaLabelProp : undefined}
          aria-labelledby={
            !label && !ariaLabelProp && ariaLabelledbyProp
              ? ariaLabelledbyProp
              : undefined
          }
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-invalid={state === DatePickerState.Error}
          onClick={onInputClick}
          className={iconButtonStyles}
          contentEnd={
            <CalendarButton
              tabIndex={disabled ? -1 : 0}
              ref={buttonRef}
              onClick={onIconButtonClick}
            />
          }
        >
          {children}
        </FormFieldInputContainer>
      </FormField>
    );
  },
);

DateFormField.displayName = 'DateFormField';
