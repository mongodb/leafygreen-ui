import { useState } from 'react';
import { useEventListener } from '.';

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
