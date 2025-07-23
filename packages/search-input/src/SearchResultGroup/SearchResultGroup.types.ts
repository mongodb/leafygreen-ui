import { ReactNode } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface SearchResultGroupProps extends HTMLElementProps<'div'> {
  /**
   * Title for the group of options
   */
  label: string;

  /**
   * Must be <SearchResult /> or <SearchResultGroup />
   */
  children: ReactNode;
}
