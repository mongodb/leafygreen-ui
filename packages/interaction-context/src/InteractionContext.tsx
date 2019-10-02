import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useEventListener } from '@leafygreen-ui/hooks';

export const UsingKeyboardContext = createContext(undefined as
  | boolean
  | undefined);

interface InteractionContextProps {
  children: React.ReactNode;
  initialStates: {
    usingKeyboard: boolean;
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
      if (keyCode === 9) {
        setUsingKeyboard(true);
      }
    },
    { enabled: !usingKeyboard },
  );

  return (
    <UsingKeyboardContext.Provider value={usingKeyboard}>
      <div>
        Hello World
        {children}
      </div>
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
