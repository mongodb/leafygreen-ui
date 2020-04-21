import { useState } from 'react';
import { useEventListener } from '@leafygreen-ui/hooks';

/**
 * Hook that accepts a keyCode and returns a boolean based on whether or not that key is being pressed.
 * @param targetKeyCode Represents the keyCode of the key to listen for.
 */
export default function useKeyPress(targetKeyCode: number) {
  const [keyPressed, setKeyPressed] = useState(false);

  function onKeyDown(e: KeyboardEvent) {
    if (e.keyCode === targetKeyCode) {
      setKeyPressed(true);
    }
  }

  function onKeyUp(e: KeyboardEvent) {
    if (e.keyCode === targetKeyCode) {
      setKeyPressed(false);
    }
  }

  useEventListener('keydown', onKeyDown);
  useEventListener('keyup', onKeyUp);

  return keyPressed;
}
