import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useAccordionItemContext } from '../context';

import {
  getContentWrapperStyles,
  getGridStyles,
} from './AccordionPanel.styles';
import { AccordionPanelProps } from './AccordionPanel.types';

export const AccordionPanel = forwardRef<HTMLDivElement, AccordionPanelProps>(
  ({ children, className, ...rest }, fwdRef) => {
    const { theme } = useDarkMode();

    const { buttonId, isExpanded, panelId } = useAccordionItemContext();

    return (
      <div
        role="region"
        {...rest}
        aria-labelledby={buttonId}
        className={getGridStyles({ className, isExpanded })}
        id={panelId}
        ref={fwdRef}
        // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
        inert={!isExpanded ? '' : undefined}
        aria-hidden={!isExpanded}
      >
        <div className={getContentWrapperStyles(theme)}>{children}</div>
      </div>
    );
  },
);

AccordionPanel.displayName = 'AccordionPanel';
