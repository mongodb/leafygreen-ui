import React from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { TimeInputContent } from '../TimeInputContent';

import { TimeInputProps } from './TimeInput.types';

/**
 * @internal
 */
export const TimeInput = ({
  darkMode: darkModeProp,
  ...props
}: TimeInputProps) => {
  const { darkMode } = useDarkMode(darkModeProp);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      {/* TODO: Add Providers*/}
      <TimeInputContent {...props} />
    </LeafyGreenProvider>
  );
};

TimeInput.displayName = 'TimeInput';
