import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

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
    ({ children, className, ...rest }, fwdRef) => {
      return (
        <ul ref={fwdRef} className={getListStyles({ className })} {...rest}>
          {children}
        </ul>
      );
    },
  ),
  {
    displayName: 'ResourceList',
    key: MessageFeedSubcomponentProperty.ResourceList,
  },
);
