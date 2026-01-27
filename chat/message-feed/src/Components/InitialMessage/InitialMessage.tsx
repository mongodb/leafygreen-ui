import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

// import { MessageFeedSubcomponentProperty } from '../../../shared.types';
import { type InitialMessageProps } from './InitialMessage.types';

/**
 * Renders promotional content with an award icon and "Learn More" link.
 *
 * @returns The rendered promotional message component.
 */
export const InitialMessage = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, InitialMessageProps>(
    ({ darkMode: darkModeProp, className, children, ...rest }, fwdRef) => {
      const { darkMode } = useDarkMode(darkModeProp);
      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <div ref={fwdRef} className={cx(className)} {...rest}>
            {children}
          </div>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'InitialMessage',
    key: 'isLGMessageFeedInitialMessage',
  },
);
