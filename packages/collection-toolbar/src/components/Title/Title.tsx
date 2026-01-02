import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { H3 } from '@leafygreen-ui/typography';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';
import { CollectionToolbarSubComponentProperty } from '../../shared.types';

import { TitleProps } from './Title.types';

/**
 * Title is a compound component that renders a title for CollectionToolbar.
 * It will only render if the CollectionToolbar variant is set to Collapsible.
 */
const Title = CompoundSubComponent(
  ({ className, children, as = 'h2', ...rest }: TitleProps) => {
    const { lgIds } = useCollectionToolbarContext();
    return (
      <H3 data-lgid={lgIds.title} className={className} as={as} {...rest}>
        {children}
      </H3>
    );
  },
  {
    displayName: 'Title',
    key: CollectionToolbarSubComponentProperty.Title,
  },
);

export default Title;
