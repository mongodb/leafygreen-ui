import React, { createContext, useContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useEventListener } from '@leafygreen-ui/hooks';

interface UsingKeyboardState {
  usingKeyboard: boolean;
  setUsingKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsingKeyboardContext = createContext<UsingKeyboardState>({
  usingKeyboard: true,
  setUsingKeyboard: () => {},
});

// All keys here are used to manage focus through keyboard interaction.
export const NavigationKeyCodes: { readonly [k: string]: number } = {
  tab: 9,
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
} as const;

export function useUsingKeyboardContext(): UsingKeyboardState {
  return useContext(UsingKeyboardContext);
}

interface UsingKeyboardProviderProps {
  children?: React.ReactNode;
}

function UsingKeyboardProvider({ children }: UsingKeyboardProviderProps) {
  const [usingKeyboard, setUsingKeyboard] = useState(false);

  useEventListener('mousedown', () => setUsingKeyboard(false), {
    enabled: usingKeyboard,
  });

  useEventListener(
    'keydown',
    ({ keyCode }) => {
      if (Object.values(NavigationKeyCodes).includes(keyCode)) {
        setUsingKeyboard(true);
      }
    },
    { enabled: !usingKeyboard },
  );

  const providerValue = useMemo(
    () => ({
      usingKeyboard,
      setUsingKeyboard,
    }),
    [usingKeyboard],
  );

  return (
    <UsingKeyboardContext.Provider value={providerValue}>
      {children}
    </UsingKeyboardContext.Provider>
  );
}

UsingKeyboardProvider.displayName = 'UsingKeyboardProvider';

UsingKeyboardProvider.propTypes = { children: PropTypes.node };

export default UsingKeyboardProvider;
