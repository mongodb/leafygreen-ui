import { useContext } from 'react';
import { UsingKeyboardContext } from '@leafygreen-ui/interaction-context';

export default function useInteractionContext() {
  return {
    usingKeyboard: useContext(UsingKeyboardContext),
  };
}
