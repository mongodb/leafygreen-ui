import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useEventListener } from '@leafygreen-ui/hooks';

interface UsingKeyboardState {
  usingKeyboard?: boolean;
  setUsingKeyboard?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UsingKeyboardContext = createContext<UsingKeyboardState>({
  usingKeyboard: undefined,
  setUsingKeyboard: undefined,
});

export const NavigationKeyCodes = {
  tab: 9,
  leftArrow: 37,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
} as const;

type NavigationKeyCodes = typeof NavigationKeyCodes[keyof typeof NavigationKeyCodes];

interface LeafyGreenProviderProps {
  children: React.ReactNode;
  initialState?: {
    usingKeyboard?: boolean;
  };
}

const LeafyGreenProvider = ({
  children,
  initialState,
}: LeafyGreenProviderProps) => {
  const [usingKeyboard, setUsingKeyboard] = useState(
    (initialState && initialState.usingKeyboard) || false,
  );

  useEventListener('mousedown', () => setUsingKeyboard(false), {
    enabled: usingKeyboard,
  });

  useEventListener(
    'keydown',
    ({ keyCode }) => {
      // Tab, and arrow keys
      // All are used to manage focus in a keyboard navigation context.
      if (Object.values<number>(NavigationKeyCodes).includes(keyCode)) {
        setUsingKeyboard(true);
      }
    },
    { enabled: !usingKeyboard },
  );

  return (
    <UsingKeyboardContext.Provider value={{ usingKeyboard, setUsingKeyboard }}>
      {children}
    </UsingKeyboardContext.Provider>
  );
};

LeafyGreenProvider.displayName = 'LeafyGreenProvider';

LeafyGreenProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.shape({
    usingKeyboard: PropTypes.bool,
  }),
};

export default LeafyGreenProvider;
