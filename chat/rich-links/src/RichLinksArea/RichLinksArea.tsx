import React, { forwardRef } from 'react';

import LeafygreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { RichLink } from '..';

import { containerStyles } from './RichLinksArea.styles';
import { type RichLinksAreaProps } from './RichLinksArea.types';

export const RichLinksArea = forwardRef<HTMLDivElement, RichLinksAreaProps>(
  ({ links, darkMode: darkModeProp, onLinkClick, ...props }, fwdRef) => {
    const { darkMode } = useDarkMode(darkModeProp);
    return (
      <LeafygreenProvider darkMode={darkMode}>
        <div className={containerStyles} ref={fwdRef} {...props}>
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
