import React from 'react';

import { Button } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../CollectionToolbarContext';
import { CollectionToolbarActionsSubComponentProperty } from '../CollectionToolbarActions.types';

import { CollectionToolbarActionsButtonProps } from './CollectionToolbarActionsButton.types';

export const CollectionToolbarActionsButton = CompoundSubComponent(
  ({ ...props }: CollectionToolbarActionsButtonProps) => {
    const { size } = useCollectionToolbarContext();
    return <Button size={size} {...props} />;
  },
  {
    displayName: 'CollectionToolbarActionsButton',
    key: CollectionToolbarActionsSubComponentProperty.Button,
  },
);
