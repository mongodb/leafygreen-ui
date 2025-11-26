import React from 'react';

import { CanvasHeader, CanvasHeaderProps } from '@leafygreen-ui/canvas-header';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { LgIdProps } from '@leafygreen-ui/lib';

import { DeleteWizardSubComponentKeys } from './compoundComponentProperties';
import { useDeleteWizardContext } from './DeleteWizardContext';

/**
 * A wrapper around the {@link CanvasHeader} component for embedding into a DeleteWizard
 */
export const DeleteWizardHeader = CompoundSubComponent(
  (props: CanvasHeaderProps & LgIdProps) => {
    const { lgIds } = useDeleteWizardContext();
    return <CanvasHeader data-lgid={lgIds.header} {...props} />;
  },
  {
    displayName: 'DeleteWizardHeader',
    key: DeleteWizardSubComponentKeys.Header,
  },
);
