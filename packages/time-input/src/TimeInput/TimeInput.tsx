import React, { forwardRef } from 'react';

import { useControlled } from '@leafygreen-ui/hooks';
import { pickAndOmit } from '@leafygreen-ui/lib';

import { TimeInputProvider } from '../Context/TimeInputContext/TimeInputContext';
import { TimeInputDisplayProvider } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import {
  DisplayContextPropKeys,
  displayContextPropNames,
} from '../Context/TimeInputDisplayContext/TimePickerDisplayContext.utils';
import { TimeInputContent } from '../TimeInputContent';

import { TimeInputProps } from './TimeInput.types';

export const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(
  (
    {
      value: valueProp,
      onTimeChange: onChangeProp,
      handleValidation,
      initialValue: initialValueProp,
      'data-lgid': _dataLgId,
      ...props
    }: TimeInputProps,
    forwardedRef,
  ) => {
    const { value, updateValue } = useControlled(
      valueProp,
      onChangeProp,
      initialValueProp,
    );

    /**
     * Separate the props that are added to the display context and the props that are added to the component
     */
    const [displayProps, componentProps] = pickAndOmit<
      TimeInputProps,
      DisplayContextPropKeys
    >({ ...props }, displayContextPropNames);

    return (
      <TimeInputDisplayProvider {...displayProps}>
        <TimeInputProvider
          value={value}
          setValue={updateValue}
          handleValidation={handleValidation}
        >
          <TimeInputContent ref={forwardedRef} {...componentProps} />
        </TimeInputProvider>
      </TimeInputDisplayProvider>
    );
  },
);

TimeInput.displayName = 'TimeInput';
