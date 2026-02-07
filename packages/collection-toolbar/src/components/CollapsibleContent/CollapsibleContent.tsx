import React from 'react';

import { useCollectionToolbarContext } from '../../Context/CollectionToolbarProvider';

import {
  getCollapsibleContentStyles,
  innerContentWrapperStyles,
} from './CollapsibleContent.styles';
import { CollapsibleContentProps } from './CollapsibleContent.types';

/**
 * @internal
 * Internal CollapsibleContent component
 *
 * @remarks
 * This component is intended to be used within the context of the `CollectionToolbarProvider`
 * created in `CollectionToolbar.tsx`. It relies on the CollectionToolbarContext to access
 * the `isCollapsed` state for styling purposes.
 *
 * Do not use `CollapsibleContent` directly—always use the `CollectionToolbar` component,
 * which ensures the correct context is provided.
 */
export const CollapsibleContent = ({
  searchInput,
  filters,
}: CollapsibleContentProps) => {
  const { isCollapsed, collapsibleContentId, titleId } =
    useCollectionToolbarContext();

  return (
    <div
      role="region"
      id={collapsibleContentId}
      aria-labelledby={titleId}
      className={getCollapsibleContentStyles({ isCollapsed })}
    >
      <div className={innerContentWrapperStyles}>
        {searchInput}
        {filters}
      </div>
    </div>
  );
};

CollapsibleContent.displayName = 'CollapsibleContent';
