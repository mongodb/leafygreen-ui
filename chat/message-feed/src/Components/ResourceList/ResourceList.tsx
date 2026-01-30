import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { MessageFeedSubcomponentProperty } from '../../shared.types';

import { getListStyles } from './ResourceList.styles';
import { type ResourceListProps } from './ResourceList.types';

/**
 * Renders a resource list in the message feed.
 *
 * @returns The rendered resource list component.
 */
export const ResourceList = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLUListElement, ResourceListProps>(
    ({ children, className, darkMode: darkModeProp, ...rest }, fwdRef) => {
      const { darkMode } = useDarkMode(darkModeProp);
      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <ul ref={fwdRef} className={getListStyles({ className })} {...rest}>
            {children}
          </ul>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'ResourceList',
    key: MessageFeedSubcomponentProperty.ResourceList,
  },
);
