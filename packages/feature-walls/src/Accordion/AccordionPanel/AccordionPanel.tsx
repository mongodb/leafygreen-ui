import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import { Transition } from 'react-transition-group';

import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { transitionDurations } from '../Accordion.styles';
import { useAccordionItemContext } from '../context';

import { getStyles } from './AccordionPanel.styles';
import { AccordionPanelProps } from './AccordionPanel.types';

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ children, className, ...rest }, fwdRef) => {
    const { theme } = useDarkMode();

    const { buttonId, isExpanded, panelId } = useAccordionItemContext();

    const panelRef = useForwardedRef(fwdRef, null);

    const [height, setHeight] = useState(0);

    const updateHeight = useCallback(() => {
      if (!panelRef || !panelRef.current) {
        return;
      }

      setHeight(panelRef.current.scrollHeight);
    }, [panelRef]);

    useEffect(() => {
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }, [isExpanded, updateHeight]);

    return (
      <Transition
        in={isExpanded}
        timeout={transitionDurations.expand}
        nodeRef={panelRef}
        onEntered={updateHeight}
      >
        {state => {
          const isEnterState = state === 'entering' || state === 'entered';
          return (
            <div
              role="region"
              {...rest}
              aria-labelledby={buttonId}
              className={getStyles(theme, isEnterState, height, className)}
              id={panelId}
              ref={panelRef}
              // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
              inert={state === 'exited'}
              aria-hidden={state === 'exited'}
            >
              {children}
            </div>
          );
        }}
      </Transition>
    );
  },
);

AccordionPanel.displayName = 'AccordionPanel';
