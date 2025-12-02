import React from 'react';

import { FormFieldInputContainer } from '@leafygreen-ui/form-field';

import { useTimeInputDisplayContext } from '../../Context/TimeInputDisplayContext';

import { getContainerStyles } from './TimeFormFieldInputContainer.styles';
import { TimeFormFieldInputContainerProps } from './TimeFormFieldInputContainer.types';

/**
 * A wrapper around `FormField` that sets the relevant
 * attributes, and styling
 */
export const TimeFormFieldInputContainer = React.forwardRef<
  HTMLDivElement,
  TimeFormFieldInputContainerProps
>(({ children, onInputClick }: TimeFormFieldInputContainerProps, fwdRef) => {
  const { label, ariaLabelProp, ariaLabelledbyProp, shouldShowSelect } =
    useTimeInputDisplayContext();

  return (
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
      onClick={onInputClick}
      className={getContainerStyles(shouldShowSelect)}
    >
      {children}
    </FormFieldInputContainer>
  );
});

TimeFormFieldInputContainer.displayName = 'TimeFormFieldInputContainer';
