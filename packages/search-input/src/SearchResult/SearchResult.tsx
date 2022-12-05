import React from 'react';
import {
  InferredPolymorphicProps,
  Polymorphic,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';
import { InputOption } from '@leafygreen-ui/internal-input-option';
import { cx } from '@leafygreen-ui/emotion';
import { SearchResultProps } from './SearchResult.types';
import {
  searchResultDescriptionStyle,
  searchResultStyles,
  searchResultTitleStyle,
} from './SearchResult.styles';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export const SearchResult = Polymorphic<
  InferredPolymorphicProps<SearchResultProps>
>(
  (
    { as = 'li' as PolymorphicAs, children, description, className, ...rest },
    ref,
  ) => {
    const { theme } = useDarkMode(rest.darkMode);

    return (
      <InputOption
        as={as}
        ref={ref}
        className={cx(searchResultStyles, className)}
        {...rest}
      >
        <div className={searchResultTitleStyle[theme]}>{children}</div>
        {description && (
          <span className={searchResultDescriptionStyle[theme]}>
            {description}
          </span>
        )}
      </InputOption>
    );
  },
);
