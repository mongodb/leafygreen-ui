import React from 'react';

import { useCollectionToolbarContext } from '../Context/CollectionToolbarProvider';

import { getCollapsibleContentStyles } from './CollectionToolbar.styles';

interface CollapsibleContentProps {
  searchInput: React.ReactNode;
  filters: React.ReactNode;
}

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
const CollapsibleContent = ({
  searchInput,
  filters,
}: CollapsibleContentProps) => {
  const { isCollapsed } = useCollectionToolbarContext();

  return (
    <div className={getCollapsibleContentStyles({ isCollapsed })}>
      {searchInput}
      {filters}
    </div>
  );
};

CollapsibleContent.displayName = 'CollapsibleContent';

export default CollapsibleContent;
