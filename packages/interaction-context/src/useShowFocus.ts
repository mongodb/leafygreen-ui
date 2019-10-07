import { useContext } from 'react';
import { UsingKeyboardContext } from './InteractionContext';

export default function useShowFocus() {
  const usingKeyboard = useContext(UsingKeyboardContext);

  // If there's no context provider available, we show focus states as usual.
  if (usingKeyboard === null || usingKeyboard === undefined) {
    return true;
  }

  return usingKeyboard;
}
