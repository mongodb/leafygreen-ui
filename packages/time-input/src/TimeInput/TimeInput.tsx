import React from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { TimeInputContent } from '../TimeInputContent';

import { TimeInputProps } from './TimeInput.types';
import { TimeInputProvider } from '../TimeInputContext/TimeInputContext';

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
      {/* TODO: need to use the useControlled hook to get the value */}
      <TimeInputProvider
        value={undefined}
        setValue={() => {}}
        handleValidation={handleValidation}
      >
        <TimeInputContent {...props} />
      </TimeInputProvider>
    </LeafyGreenProvider>
  );
};

TimeInput.displayName = 'TimeInput';
