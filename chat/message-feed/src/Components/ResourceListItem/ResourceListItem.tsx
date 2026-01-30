import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { MessageFeedSubcomponentProperty } from '../../shared.types';

import {
  getIconStyles,
  getListItemStyles,
  iconWrapperStyles,
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
      const { theme } = useDarkMode();
      return (
        <li ref={fwdRef} className={getListItemStyles({ className })} {...rest}>
          <div className={iconWrapperStyles}>
            <Icon className={getIconStyles({ theme })} glyph={glyph} />
          </div>
          <Body>{children}</Body>
        </li>
      );
    },
  ),
  {
    displayName: 'ResourceListItem',
    key: MessageFeedSubcomponentProperty.ResourceListItem,
  },
);
