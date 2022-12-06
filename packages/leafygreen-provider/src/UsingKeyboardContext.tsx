import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import { useEventListener } from '@leafygreen-ui/hooks';

interface UsingKeyboardState {
  usingKeyboard: boolean;
  setUsingKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: UsingKeyboardState = {
  usingKeyboard: true,
  setUsingKeyboard: () => {},
};

export const UsingKeyboardContext =
  createContext<UsingKeyboardState>(initialState);

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
  // Initialize `usingKeyboard` to true
  // Defaulting to true allows autofocus to display a focus state.
  const [usingKeyboard, setUsingKeyboard] = useState(
    initialState.usingKeyboard,
  );

  // When the user uses the mouse, they're not using the keyboard
  useEventListener('mousedown', () => setUsingKeyboard(false), {
    enabled: usingKeyboard,
  });

  // When the user presses a navigation key, they are using the keyboard
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
