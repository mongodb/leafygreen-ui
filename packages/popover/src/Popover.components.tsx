import React, { forwardRef, ReactNode } from 'react';

import { contentClassName, hiddenPlaceholderStyle } from './Popover.styles';

export const HiddenPlaceholder = forwardRef<HTMLSpanElement, {}>(
  (_, fwdRef) => {
    /**
     * Using \<span\> as placeholder to prevent validateDOMNesting warnings
     * Warnings will still show up if `usePortal` is false
     */
    return <span ref={fwdRef} className={hiddenPlaceholderStyle} />;
  },
);

HiddenPlaceholder.displayName = 'HiddenPlaceholder';

export const ContentWrapper = forwardRef<
  HTMLDivElement,
  { children: ReactNode }
>(({ children }, fwdRef) => {
  return (
    <div ref={fwdRef} className={contentClassName}>
      {children}
    </div>
  );
});

ContentWrapper.displayName = 'ContentWrapper';
