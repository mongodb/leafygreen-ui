import React, { useRef, useState } from 'react';

import {
  DescendantsProvider,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';

import { ToolbarContextProvider, ToolbarDescendantsContext } from '../Context';

import { getBaseStyles } from './Toolbar.styles';
import { type ToolbarProps } from './Toolbar.types';

// TODO: needs a label?
export const Toolbar = React.forwardRef<HTMLUListElement, ToolbarProps>(
  (
    {
      children,
      darkMode: darkModeProp,
      ['aria-controls']: ariaControls,
    }: ToolbarProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { descendants, dispatch } = useInitDescendants<HTMLButtonElement>(
      ToolbarDescendantsContext,
    );
    const [focusedIndex, setFocusedIndex] = useState(0);
    const childrenLength = descendants?.length ?? 0;
    const toolbarRef = useRef<HTMLUListElement | null>(null);
    const [isUsingKeyboard, setIsUsingKeyboard] = useState(false);

    // Implements roving tabindex
    const handleKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
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
      >
        <DescendantsProvider
          context={ToolbarDescendantsContext}
          descendants={descendants}
          dispatch={dispatch}
        >
          <ul
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
            role="toolbar"
            ref={useMergeRefs([toolbarRef, forwardedRef])}
            className={getBaseStyles({ theme })}
            aria-controls={ariaControls} //TODO: NEEDS ID
            aria-orientation="vertical"
            onKeyDownCapture={handleKeyDown}
            onBlur={() => setIsUsingKeyboard(false)}
            onMouseDown={() => setIsUsingKeyboard(false)}
          >
            {children}
          </ul>
        </DescendantsProvider>
      </ToolbarContextProvider>
    );
  },
);

Toolbar.displayName = 'Toolbar';
