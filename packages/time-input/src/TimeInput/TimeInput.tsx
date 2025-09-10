import React from 'react';
import { TimeInputProps } from './TimeInput.types';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { TimeInputContent } from '../TimeInputContent';

export function TimeInput({
  darkMode: darkModeProp,

  ...props
}: TimeInputProps) {
  const { darkMode } = useDarkMode(darkModeProp);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      {/* TODO: Add TimeInputProvider*/}
      <TimeInputContent {...props} />
    </LeafyGreenProvider>
  );
}

TimeInput.displayName = 'TimeInput';
