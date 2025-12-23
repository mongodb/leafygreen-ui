import React from 'react';

import { FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { useTimeInputDisplayContext } from '../../Context';

import { getContainerStyles } from './TimeFormFieldInputContainer.styles';
import { TimeFormFieldInputContainerProps } from './TimeFormFieldInputContainer.types';

/**
 * A wrapper around `FormField` that sets the relevant
 * attributes, and styling
 */
export const TimeFormFieldInputContainer = React.forwardRef<
  HTMLDivElement,
  TimeFormFieldInputContainerProps
>(({ children }: TimeFormFieldInputContainerProps, fwdRef) => {
  const { is12HourFormat } = useTimeInputDisplayContext();

  return (
    <FormFieldInputContainer
      ref={fwdRef}
      className={getContainerStyles({ is12HourFormat })}
    >
      {children}
    </FormFieldInputContainer>
  );
});

TimeFormFieldInputContainer.displayName = 'TimeFormFieldInputContainer';
