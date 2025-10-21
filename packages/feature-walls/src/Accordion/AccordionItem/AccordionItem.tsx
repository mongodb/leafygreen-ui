import React, { forwardRef } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  AccordionDescendantsContext,
  AccordionItemContext,
  useAccordionContext,
} from '../context';

import { getStyles } from './AccordionItem.styles';
import { AccordionItemProps } from './AccordionItem.types';

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...rest }, fwdRef) => {
    const { theme } = useDarkMode();

    const { id, index, ref } = useDescendant(
      AccordionDescendantsContext,
      fwdRef,
    );

    const { id: accordionId, selectedIndex } = useAccordionContext();

    const itemId = `${accordionId}-${id}`;
    const buttonId = `${itemId}-button`;
    const panelId = `${itemId}-panel`;

    const isExpanded = index === selectedIndex;

    const contextValue = {
      buttonId,
      isExpanded,
      index,
      itemId,
      panelId,
    } as const;

    return (
      <AccordionItemContext.Provider value={contextValue}>
        <div
          {...rest}
          className={getStyles(theme, isExpanded, className)}
          ref={ref}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);

AccordionItem.displayName = 'AccordionItem';
