import React from 'react';

import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { validateChildren } from '@leafygreen-ui/lib';
import { Overline } from '@leafygreen-ui/typography';

import {
  searchResultLabelStyle,
  searchResultLabelWrapperStyle,
} from './SearchResultGroup.styles';
import { SearchResultGroupProps } from './SearchResultGroup.types';

export const SearchResultGroup = ({
  children,
  label,
  ...rest
}: SearchResultGroupProps) => {
  const validatedChildren = validateChildren(children, [
    'SearchResult',
    'SearchResultGroup',
  ]);

  const { theme } = useDarkMode();

  return (
    <div>
      <InputOption
        aria-label={label}
        isInteractive={false}
        className={searchResultLabelWrapperStyle}
        {...rest}
      >
        <Overline className={searchResultLabelStyle[theme]}>{label}</Overline>
      </InputOption>
      {validatedChildren}
    </div>
  );
};

SearchResultGroup.displayName = 'SearchResultGroup';
