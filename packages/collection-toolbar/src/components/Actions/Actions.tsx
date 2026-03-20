import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChild,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { consoleOnce } from '@leafygreen-ui/lib';
import { Justify, Tooltip } from '@leafygreen-ui/tooltip';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import {
  CollectionToolbarActionsSubComponentProperty,
  CollectionToolbarSubComponentProperty,
  Variant,
} from '../../shared.types';

import { getActionStyles, getIconStyles } from './Action.styles';
import { ActionsProps } from './Actions.types';
import { Button } from './Button';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { Pagination } from './Pagination';

export const Actions = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ActionsProps>(
    (
      {
        ariaControls,
        children,
        className,
        showToggleButton: showToggleButtonProp = false,
        ...rest
      },
      fwdRef,
    ) => {
      const { lgIds, variant, onToggleCollapsed, isCollapsed } =
        useCollectionToolbarContext();

      const showToggleButton =
        showToggleButtonProp && variant === Variant.Collapsible;

      const Buttons = findChildren(
        children,
        CollectionToolbarActionsSubComponentProperty.Button,
      );

      const pagination = findChild(
        children,
        CollectionToolbarActionsSubComponentProperty.Pagination,
      );

      const menu = findChild(
        children,
        CollectionToolbarActionsSubComponentProperty.Menu,
      );

      const showPagination = pagination && variant === Variant.Default;
      const showMenu = menu && variant !== Variant.Collapsible;

      if (Buttons.length > 2) {
        consoleOnce.error(
          'CollectionToolbarActions can only have up to 2 buttons',
        );
      }

      const PrimaryButtons = Buttons.slice(0, 2);

      return (
        <div
          className={getActionStyles({ className, variant })}
          ref={fwdRef}
          {...rest}
          data-lgid={lgIds.actions}
        >
          {PrimaryButtons}
          {showPagination && pagination}
          {showMenu && menu}
          {showToggleButton && (
            <Tooltip
              justify={Justify.Middle}
              trigger={
                <IconButton
                  onClick={onToggleCollapsed}
                  aria-label="Toggle collapse"
                  aria-expanded={!isCollapsed}
                  aria-controls={ariaControls}
                >
                  <Icon
                    glyph="ChevronDown"
                    role="presentation"
                    className={getIconStyles({ isExpanded: !isCollapsed })}
                  />
                </IconButton>
              }
            >
              {isCollapsed ? 'Show filters' : 'Hide filters'}
            </Tooltip>
          )}
        </div>
      );
    },
  ),
  {
    displayName: 'Actions',
    key: CollectionToolbarSubComponentProperty.Actions,
    Button,
    Pagination,
    Menu,
    MenuItem,
  },
);
