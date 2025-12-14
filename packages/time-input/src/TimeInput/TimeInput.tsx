import React, { forwardRef } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';
import { useControlled } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { TimeInputProvider } from '../Context/TimeInputContext/TimeInputContext';
import { TimeInputDisplayProvider } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import {
  DisplayContextPropKeys,
  displayContextPropNames,
} from '../Context/TimeInputDisplayContext/TimePickerDisplayContext.utils';
import { TimeInputContent } from '../TimeInputContent';
import { getLgIds } from '../utils/getLgIds';

import { TimeInputProps } from './TimeInput.types';

export const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(
  (
    {
      value: valueProp,
      onTimeChange: onChangeProp,
      handleValidation,
      initialValue: initialValueProp,
      'data-lgid': dataLgId,
      darkMode: darkModeProp,
      baseFontSize: basefontSizeProp,
      ...props
    }: TimeInputProps,
    forwardedRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(basefontSizeProp);
    const lgIds = getLgIds(dataLgId);

    const { value, updateValue } = useControlled<DateType | undefined>(
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
      <LeafyGreenProvider
        darkMode={darkMode}
        baseFontSize={baseFontSize === BaseFontSize.Body1 ? 14 : baseFontSize}
      >
        <TimeInputDisplayProvider {...displayProps} lgIds={lgIds}>
          <TimeInputProvider
            value={value}
            setValue={updateValue}
            handleValidation={handleValidation}
          >
            <TimeInputContent ref={forwardedRef} {...componentProps} />
          </TimeInputProvider>
        </TimeInputDisplayProvider>
      </LeafyGreenProvider>
    );
  },
);

TimeInput.displayName = 'TimeInput';
