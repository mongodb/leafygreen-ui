import { keyMap } from '@leafygreen-ui/lib';

export const onKeyDown = (e: React.KeyboardEvent) => {
  // Stops default browser behavior from automatically scrolling the component
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }
};
