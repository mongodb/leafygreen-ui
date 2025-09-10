import React, { forwardRef } from 'react';

import LeafygreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { RichLink } from '..';

import { getContainerStyles } from './RichLinksArea.styles';
import { type RichLinksAreaProps } from './RichLinksArea.types';

export const RichLinksArea = forwardRef<HTMLDivElement, RichLinksAreaProps>(
  (
    { className, darkMode: darkModeProp, links, onLinkClick, ...props },
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    return (
      <LeafygreenProvider darkMode={darkMode}>
        <div className={getContainerStyles(className)} ref={fwdRef} {...props}>
          {links.map(richLinkProps => (
            <RichLink
              key={richLinkProps.href}
              onClick={() => onLinkClick?.(richLinkProps)}
              {...richLinkProps}
            />
          ))}
        </div>
      </LeafygreenProvider>
    );
  },
);

RichLinksArea.displayName = 'RichLinksArea';
