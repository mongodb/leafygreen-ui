import useEventListener, { UseEventOptions } from './useEventListener';

const escapeKeyCode = 27;

const handleEscape = (e: KeyboardEvent, callback: () => void) => {
  if (e.keyCode === escapeKeyCode) {
    e.stopImmediatePropagation();
    callback();
  }
};

/**
 * Hook to subscribe to an escape-key-press.
 * @param callback Callback function to be executed when Escape key is pressed.
 * @param options Object to refine when callback is invoked.
 * @param options.options Parameter to specify options passed to the eventListener.
 * @param options.enabled Determines whether or not the useEffect hook should run.
 * @param options.dependencies Array to be passed to useEffect hook, such that the hook will only run if the array's values have changed.
 * @param options.element Value to be passed as target of event handler, will default to document.
 */
const useEscapeKey = (callback: () => void, options?: UseEventOptions) => {
  return useEventListener('keydown', e => handleEscape(e, callback), options);
};

export default useEscapeKey;
