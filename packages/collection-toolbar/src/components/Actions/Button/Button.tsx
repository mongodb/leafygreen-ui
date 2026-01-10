import React from 'react';

import { Button as BaseButton } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';

import { ButtonProps } from './Button.types';

export const Button = CompoundSubComponent(
  ({ ...props }: ButtonProps) => {
    const { size } = useCollectionToolbarContext();
    return <BaseButton size={size} {...props} />;
  },
  {
    displayName: 'Button',
    key: CollectionToolbarActionsSubComponentProperty.Button,
  },
);
