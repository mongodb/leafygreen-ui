import React from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import { Icon } from '@leafygreen-ui/icon';
import { IconButton } from '@leafygreen-ui/icon-button';
import { consoleOnce } from '@leafygreen-ui/lib';

import { CollectionToolbarActionsSubComponentProperty } from '../../shared.types';
import { getLgIds } from '../../utils/getLgIds';
import {
  CollectionToolbarSubComponentProperty,
  Variant,
} from '../CollectionToolbar.types';
import { useCollectionToolbarContext } from '../CollectionToolbarContext';

import { getCollectionToolbarActionsStyles } from './CollectionToolbarActions.styles';
import { CollectionToolbarActionsProps } from './CollectionToolbarActions.types';
import { CollectionToolbarActionsButton } from './CollectionToolbarActionsButton';

export const CollectionToolbarActions = CompoundSubComponent(
  ({ children, className }: CollectionToolbarActionsProps) => {
    const lgIds = getLgIds();
    const { onCollapse, variant } = useCollectionToolbarContext();

    const showToggleButton = variant === Variant.Collapsible;

    const Buttons = findChildren(
      children,
      CollectionToolbarActionsSubComponentProperty.Button,
    );

    if (Buttons.length > 2) {
      consoleOnce.error(
        'CollectionToolbarActions can only have up to 2 buttons',
      );
    }

    const PrimaryButtons = Buttons.slice(0, 2);

    return (
      <div
        data-testid={lgIds.actions}
        className={getCollectionToolbarActionsStyles({ className, variant })}
      >
        {PrimaryButtons}
        {showToggleButton && (
          <IconButton
            data-testid={lgIds.toggleButton}
            onClick={onCollapse}
            aria-label="Toggle collapse"
          >
            <Icon glyph="ChevronDown" />
          </IconButton>
        )}
      </div>
    );
  },
  {
    displayName: 'CollectionToolbarActions',
    key: CollectionToolbarSubComponentProperty.Actions,
    Button: CollectionToolbarActionsButton,
  },
);
