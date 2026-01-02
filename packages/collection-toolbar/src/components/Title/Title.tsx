import React, { forwardRef } from 'react';

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
<<<<<<< HEAD
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLHeadingElement, TitleProps>(
    ({ className, children, ...rest }, fwdRef) => {
      const { lgIds } = useCollectionToolbarContext();
      return (
        <H3
          data-lgid={lgIds.title}
          className={className}
          {...rest}
          ref={fwdRef}
        >
          {children}
        </H3>
      );
    },
  ),
=======
  ({ className, children, ...rest }: TitleProps) => {
    const { lgIds } = useCollectionToolbarContext();
    return (
      <H3 data-lgid={lgIds.title} className={className} {...rest}>
        {children}
      </H3>
    );
  },
>>>>>>> 9e650eabb (added context provider)
  {
    displayName: 'Title',
    key: CollectionToolbarSubComponentProperty.Title,
  },
);

export default Title;
