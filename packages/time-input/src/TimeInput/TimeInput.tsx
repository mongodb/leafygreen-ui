import React from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { TimeInputContent } from '../TimeInputContent';

import { TimeInputProps } from './TimeInput.types';
import { TimeInputProvider } from '../TimeInputContext/TimeInputContext';
import { useControlledValue } from '@leafygreen-ui/hooks';

/**
 * @internal
 */
export const TimeInput = ({
  darkMode: darkModeProp,
  value: valueProp,
  onTimeChange: onChangeProp,
  handleValidation,
  initialValue,
  ...props
}: TimeInputProps) => {
  const { darkMode } = useDarkMode(darkModeProp);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      {/* TODO: need to use the useControlledValue hook to get the value */}
      <TimeInputProvider
        value={''}
        setValue={() => {}}
        handleValidation={handleValidation}
      >
        <TimeInputContent {...props} />
      </TimeInputProvider>
    </LeafyGreenProvider>
  );
};

TimeInput.displayName = 'TimeInput';
