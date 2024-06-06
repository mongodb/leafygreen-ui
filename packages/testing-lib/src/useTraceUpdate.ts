/* eslint-disable no-console */
import { useEffect, useRef } from 'react';

/**
 * Used to log & debug what props caused a component to re-render
 */
export function useTraceUpdate(
  props: Record<string, any>,
  options?: {
    updateMessage?: string;
    debugger?: boolean;
  },
) {
  const prev = useRef(props);
  useEffect(() => {
    const changedProps = Object.entries(props).reduce((_props, [key, val]) => {
      if (prev.current[key] !== val) {
        _props[key] = { current: val, prev: prev.current[key] };
      }

      return _props;
    }, {} as Record<string, { current: any; prev: any }>);

    if (Object.keys(changedProps).length > 0) {
      options?.updateMessage && console.log(options.updateMessage);
      console.log('Changed props:', changedProps);

      if (options?.debugger) {
        // eslint-disable-next-line no-debugger
        debugger;
      }
    }
    prev.current = props;
  });
}
