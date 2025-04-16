import React, { useState } from 'react';

import {
  DescendantsProvider,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import { ToolbarContextProvider, ToolbarDescendantsContext } from '../Context';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

import { getBaseStyles } from './Toolbar.styles';
import { type ToolbarProps } from './Toolbar.types';

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  (
    {
      className,
      children,
      darkMode: darkModeProp,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: ToolbarProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { descendants, dispatch } = useInitDescendants<HTMLButtonElement>(
      ToolbarDescendantsContext,
    );
    const [focusedIndex, setFocusedIndex] = useState(0);
    const childrenLength = descendants?.length ?? 0;
    const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

    const lgIds = React.useMemo(() => getLgIds(dataLgId), [dataLgId]);

    // Implements roving tabindex
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      // Note: Arrow keys don't fire a keyPress event — need to use onKeyDownCapture
      // We only handle up and down arrow keys
      switch (e.key) {
        case keyMap.ArrowDown:
          e.stopPropagation();
          e.preventDefault();
          setIsUsingKeyboard(true);
          setFocusedIndex((focusedIndex + 1) % childrenLength);
          break;
        case keyMap.ArrowUp:
          e.stopPropagation();
          e.preventDefault();
          setIsUsingKeyboard(true);
          setFocusedIndex((focusedIndex - 1 + childrenLength) % childrenLength);
          break;
        default:
          break;
      }
    };

    return (
      <ToolbarContextProvider
        darkMode={darkMode}
        focusedIndex={focusedIndex}
        shouldFocus={isUsingKeyboard}
        setFocusedIndex={setFocusedIndex}
        lgids={lgIds}
      >
        <DescendantsProvider
          context={ToolbarDescendantsContext}
          descendants={descendants}
          dispatch={dispatch}
        >
          <div
            role="toolbar"
            ref={forwardedRef}
            className={getBaseStyles({ theme, className })}
            aria-orientation="vertical"
            onKeyDownCapture={handleKeyDown}
            onBlur={() => setIsUsingKeyboard(false)}
            onMouseDown={() => setIsUsingKeyboard(false)}
            data-lgid={lgIds.root}
            data-testid={lgIds.root}
            {...rest}
          >
            {children}
          </div>
        </DescendantsProvider>
      </ToolbarContextProvider>
    );
  },
);

Toolbar.displayName = 'Toolbar';
