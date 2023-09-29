import React from 'react';

import { FormField } from '@leafygreen-ui/form-field';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import { iconButtonStyles } from './DateFormField.styles';
import { DateFormFieldProps } from './DateFormField.types';

/** A wrapper around `FormField` that sets the icon */
export const DateFormField = React.forwardRef<
  HTMLDivElement,
  DateFormFieldProps
>(
  (
    {
      children,
      onIconButtonClick,
      inputWrapperProps,
      ...rest
    }: DateFormFieldProps,
    fwdRef,
  ) => {
    return (
      <FormField
        ref={fwdRef}
        icon={
          <IconButton
            aria-label="Open calendar menu"
            className={iconButtonStyles}
            onClick={onIconButtonClick}
            type="button"
            disabled={rest.disabled}
          >
            <Icon glyph="Calendar" />
          </IconButton>
        }
        inputWrapperProps={{
          ...inputWrapperProps,
          role: 'combobox',
          tabIndex: -1,
        }}
        {...rest}
      >
        {children}
      </FormField>
    );
  },
);

DateFormField.displayName = 'DateFormField';
