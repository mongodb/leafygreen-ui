import React, { forwardRef } from 'react';

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
      value: _valueProp,
      onTimeChange: _onChangeProp,
      handleValidation,
      initialValue: _initialValueProp,
      ...props
    }: TimeInputProps,
    forwardedRef,
  ) => {
    /**
     * Separate the props that are added to the display context and the props that are added to the component
     */
    const [displayProps, componentProps] = pickAndOmit<
      TimeInputProps,
      DisplayContextPropKeys
    >({ ...props }, displayContextPropNames);

    return (
      <TimeInputDisplayProvider {...displayProps}>
        {/* TODO: need to use the useControlled hook to get the value */}
        <TimeInputProvider
          value={undefined}
          setValue={() => {}}
          handleValidation={handleValidation}
        >
          <TimeInputContent ref={forwardedRef} {...componentProps} />
        </TimeInputProvider>
      </TimeInputDisplayProvider>
    );
  },
);

TimeInput.displayName = 'TimeInput';
