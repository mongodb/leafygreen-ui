import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useEventListener } from '@leafygreen-ui/hooks';

export const UsingKeyboardContext = createContext(undefined as
  | boolean
  | undefined);

interface InteractionContextProps {
  children: React.ReactNode;
  initialStates?: {
    usingKeyboard?: boolean;
  };
}

const InteractionContext = ({
  children,
  initialStates,
}: InteractionContextProps) => {
  const [usingKeyboard, setUsingKeyboard] = useState(
    (initialStates && initialStates.usingKeyboard) || false,
  );

  useEventListener('mousedown', () => setUsingKeyboard(false), {
    enabled: usingKeyboard,
  });

  useEventListener(
    'keydown',
    ({ keyCode }) => {
      // Tab, and arrow keys
      // All are used to manage focus in a keyboard navigation context.
      if ([9, 37, 38, 39, 40].includes(keyCode)) {
        setUsingKeyboard(true);
      }
    },
    { enabled: !usingKeyboard },
  );

  return (
    <UsingKeyboardContext.Provider value={usingKeyboard}>
      {children}
    </UsingKeyboardContext.Provider>
  );
};

InteractionContext.propTypes = {
  children: PropTypes.node,
  initialStates: PropTypes.shape({
    usingKeyboard: PropTypes.bool,
  }),
};

export default InteractionContext;
