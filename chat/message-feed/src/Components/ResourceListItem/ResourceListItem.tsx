import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';

import { MessageFeedSubcomponentProperty } from '../../shared.types';

import {
  contentStyles,
  getListItemStyles,
  glyphStyles,
} from './ResourceListItem.styles';
import { type ResourceListItemProps } from './ResourceListItem.types';

/**
 * Renders a resource list item in the message feed.
 *
 * @returns The rendered resource list item component.
 */
export const ResourceListItem = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLLIElement, ResourceListItemProps>(
    ({ className, children, glyph, ...rest }, fwdRef) => {
      return (
        <li ref={fwdRef} className={getListItemStyles({ className })} {...rest}>
          <div className={glyphStyles}>
            <Icon glyph={glyph} />
          </div>
          <div className={contentStyles}>{children}</div>
        </li>
      );
    },
  ),
  {
    displayName: 'ResourceListItem',
    key: MessageFeedSubcomponentProperty.ResourceListItem,
  },
);
