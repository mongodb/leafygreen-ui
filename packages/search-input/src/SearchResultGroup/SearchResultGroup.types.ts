import { PropsWithChildren, ReactNode } from 'react';

export type SearchResultGroupProps = PropsWithChildren<{
  /**
   * Title for the group of options
   */
  label: string;

  /**
   * Must be <SearchResult /> or <SearchResultGroup />
   */
  children: ReactNode;
}>;
