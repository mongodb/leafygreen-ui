import React from 'react';

export interface TableHeadProps
  extends React.ComponentPropsWithoutRef<'thead'> {
  /**
   * Determines whether the table head will stick as the user scrolls down.
   */
  isSticky?: boolean;
}
