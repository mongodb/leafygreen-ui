import React, { ReactNode } from 'react';

export interface SearchResultGroupProps extends React.ComponentProps<'div'> {
  /**
   * Title for the group of options
   */
  label: string;

  /**
   * Must be <SearchResult /> or <SearchResultGroup />
   */
  children: ReactNode;
}
