import React from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { H3 } from '@leafygreen-ui/typography';

import { CollectionToolbarSubComponentProperty } from '../../shared.types';
import { getLgIds } from '../../utils';

import { TitleProps } from './Title.types';

/**
 * Title is a compound component that renders a title for CollectionToolbar.
 * It will only render if the CollectionToolbar variant is set to Collapsible.
 */
const Title = CompoundSubComponent(
  ({ className, children, ...rest }: TitleProps) => {
    const lgIds = getLgIds();
    return (
      <H3 data-lgid={lgIds.title} className={className} {...rest}>
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
