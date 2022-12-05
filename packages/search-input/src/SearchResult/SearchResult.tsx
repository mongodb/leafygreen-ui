import React from 'react';
import {
  InferredPolymorphicProps,
  Polymorphic,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';
import { InputOption } from '@leafygreen-ui/internal-input-option';
import { SearchResultProps } from './SearchResult.types';

export const SearchResult = Polymorphic<
  InferredPolymorphicProps<SearchResultProps>
>(
  (
    { as = 'li' as PolymorphicAs, children, description, className, ...rest },
    ref,
  ) => {
    return (
      <InputOption as={as} ref={ref} className={className} {...rest}>
        <span>{children}</span>
        {description && <span>{description}</span>}
      </InputOption>
    );
  },
);
