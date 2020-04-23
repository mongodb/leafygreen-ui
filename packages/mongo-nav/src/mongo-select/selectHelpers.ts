import { keyMap } from '@leafygreen-ui/lib';

export const onKeyChange = (e: React.KeyboardEvent, setValue: Function) => {
  // Stops default browser behavior from automatically scrolling the component
  if ([keyMap.ArrowUp, keyMap.ArrowDown].includes(e.keyCode)) {
    e.preventDefault();
  }

  if (keyMap.Space === e.keyCode) {
    e.preventDefault();

    // Because we are not portaling Menu component in order to allow consuming applications to control z-index
    // Pressing the spacebar from inside of the Input closes the Menu
    // The browser is adding a onClick event that we are not able to cancel through stopPropagation()
    // To fix, we have to prevent that browser behavior and then manually add a space to the current value
    // Not necessary on Firefox, because adding the space is not prevented by default on this browser
    if (navigator.userAgent.indexOf('Firefox') === -1) {
      setValue((currentValue: string) => `${currentValue} `);
    }
  }
};
