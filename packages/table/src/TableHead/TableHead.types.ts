import React from 'react';

export interface TableHeadProps extends React.ComponentPropsWithRef<'thead'> {
  /**
   * Determines whether the table head will stick as the user scrolls down.
   */
  isSticky?: boolean;
}
