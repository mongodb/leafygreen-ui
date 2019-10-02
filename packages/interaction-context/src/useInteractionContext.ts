import { useContext } from 'react';
import { UsingKeyboardContext } from './InteractionContext';

export default function useInteractionContext() {
  const usingKeyboard = useContext(UsingKeyboardContext)

  return { usingKeyboard };
}
