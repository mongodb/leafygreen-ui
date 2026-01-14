import React, { forwardRef } from 'react';

import { Button as LGButton } from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { useCollectionToolbarContext } from '../../../Context/CollectionToolbarProvider';
import { CollectionToolbarActionsSubComponentProperty } from '../../../shared.types';

import { ButtonProps } from './Button.types';

export const Button = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, fwdRef) => {
    const { size } = useCollectionToolbarContext();
    return <LGButton size={size} ref={fwdRef} {...props} />;
  }),
  {
    displayName: 'Button',
    key: CollectionToolbarActionsSubComponentProperty.Button,
  },
);
