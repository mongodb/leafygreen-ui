import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { H3 } from '@leafygreen-ui/typography';

import { CollectionToolbarSubComponentProperty } from '../CollectionToolbar.types';

import { CollectionToolbarTitleProps } from './CollectionToolbarTitle.types';

/**
 * CollectionToolbarTitle is a compound component that renders a title for a collection toolbar.
 * It will only render if the CollectionToolbar variant is set to Collapsible.
 */
const CollectionToolbarTitle = CompoundSubComponent(
  ({ className, children, ...rest }: CollectionToolbarTitleProps) => (
    <H3 className={className} {...rest}>
      {children}
    </H3>
  ),
  {
    displayName: 'CollectionToolbarTitle',
    key: CollectionToolbarSubComponentProperty.Title,
  },
);

CollectionToolbarTitle.displayName = 'CollectionToolbarTitle';

export default CollectionToolbarTitle;
