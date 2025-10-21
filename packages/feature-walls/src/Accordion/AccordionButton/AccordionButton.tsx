import React, { forwardRef } from 'react';

import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useAccordionContext, useAccordionItemContext } from '../context';

import { getStyles } from './AccordionButton.styles';
import { AccordionButtonProps } from './AccordionButton.types';

export const AccordionButton = forwardRef<
  HTMLButtonElement,
  AccordionButtonProps
>(({ children, className, onClick, onExpand, onKeyDown, ...rest }, fwdRef) => {
  const { theme } = useDarkMode();

  const { onSelectPanel } = useAccordionContext();
  const { buttonId, isExpanded, index, panelId } = useAccordionItemContext();

  const buttonRef = useForwardedRef(fwdRef, null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!isExpanded) {
      onExpand?.();
    }

    onSelectPanel(index);
    onClick?.(e);
  };

  return (
    <button
      {...rest}
      type="button"
      ref={buttonRef}
      aria-controls={panelId}
      aria-expanded={isExpanded}
      className={getStyles(theme, isExpanded, className)}
      id={buttonId}
      onClick={handleClick}
      tabIndex={0}
    >
      {children}
    </button>
  );
});

AccordionButton.displayName = 'AccordionButton';
