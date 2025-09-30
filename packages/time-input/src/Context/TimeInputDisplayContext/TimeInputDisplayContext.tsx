import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import defaults from 'lodash/defaults';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  TimeInputDisplayContextProps,
  TimeInputDisplayProviderProps,
} from './TimeInputDisplayContext.types';
import { defaultTimeInputDisplayContext } from './TimePickerDisplayContext.utils';

export const TimeInputDisplayContext =
  createContext<TimeInputDisplayContextProps>(defaultTimeInputDisplayContext);

/**
 * This provider is used for the display context of the TimeInput component
 */
export const TimeInputDisplayProvider = ({
  children,
  label = '',
  'aria-label': ariaLabelProp = '',
  'aria-labelledby': ariaLabelledbyProp = '',
  darkMode: darkModeProp,
  baseFontSize: basefontSizeProp,
  ...rest
}: PropsWithChildren<TimeInputDisplayProviderProps>) => {
  const { darkMode } = useDarkMode(darkModeProp);
  const baseFontSize = useUpdatedBaseFontSize(basefontSizeProp);

  /**
   * Whether the input has been interacted with
   */
  const [isDirty, setIsDirty] = useState(false);

  /**
   * If props are undefined, use the default values
   */
  const providerValue: TimeInputDisplayContextProps = {
    ...defaults(rest, defaultTimeInputDisplayContext),
  };

  // TODO: min, max helpers

  return (
    <LeafyGreenProvider
      darkMode={darkMode}
      baseFontSize={baseFontSize === BaseFontSize.Body1 ? 14 : baseFontSize}
    >
      <TimeInputDisplayContext.Provider
        value={{
          ...providerValue,
          label,
          ariaLabelProp,
          ariaLabelledbyProp,
          isDirty,
          setIsDirty,
        }}
      >
        {children}
      </TimeInputDisplayContext.Provider>
    </LeafyGreenProvider>
  );
};

export const useTimeInputDisplayContext = () => {
  return useContext(TimeInputDisplayContext);
};
