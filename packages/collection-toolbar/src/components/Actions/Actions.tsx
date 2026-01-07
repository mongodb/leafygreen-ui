import React from 'react';

import {
  CompoundSubComponent,
  findChild,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { consoleOnce } from '@leafygreen-ui/lib';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import {
  CollectionToolbarActionsSubComponentProperty,
  CollectionToolbarSubComponentProperty,
  Variant,
} from '../../shared.types';

import { getActionStyles } from './Action.styles';
import { ActionsProps } from './Actions.types';
import { Pagination } from './Pagination';
import { Button } from './Button';
import { Justify, Tooltip } from '@leafygreen-ui/tooltip';

export const Actions = CompoundSubComponent(
  ({ children, className, ...rest }: ActionsProps) => {
    const { lgIds, variant, onToggleCollapsed, isCollapsed } =
      useCollectionToolbarContext();

    const showToggleButton = variant === Variant.Collapsible;

    const Buttons = findChildren(
      children,
      CollectionToolbarActionsSubComponentProperty.Button,
    );

    const pagination = findChild(
      children,
      CollectionToolbarActionsSubComponentProperty.Pagination,
    );

    const showPagination = pagination && variant === Variant.Default;

    if (Buttons.length > 2) {
      consoleOnce.error(
        'CollectionToolbarActions can only have up to 2 buttons',
      );
    }

    const PrimaryButtons = Buttons.slice(0, 2);

    return (
      <div
        data-testid={lgIds.actions}
        className={getActionStyles({ className, variant })}
        {...rest}
      >
        {PrimaryButtons}
        {showPagination && pagination}
        {showToggleButton && (
          <Tooltip
            justify={Justify.Middle}
            trigger={
              <IconButton
                onClick={onToggleCollapsed}
                aria-label="Toggle collapse"
              >
                <Icon glyph="ChevronDown" />
              </IconButton>
            }
          >
            {isCollapsed ? 'Show filters' : 'Hide filters'}
          </Tooltip>
        )}
      </div>
    );
  },
  {
    displayName: 'Actions',
    key: CollectionToolbarSubComponentProperty.Actions,
    Button,
    Pagination,
  },
);
