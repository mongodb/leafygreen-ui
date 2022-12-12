import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { InputOption } from '@leafygreen-ui/internal-input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicProps,
  Polymorphic,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import {
  descriptionClassName,
  searchResultDisabledStyle,
  searchResultStyles,
  searchResultThemeStyles,
  titleClassName,
} from './SearchResult.styles';
import { SearchResultProps } from './SearchResult.types';

const SearchResult = Polymorphic<InferredPolymorphicProps<SearchResultProps>>(
  (
    {
      as = 'li' as PolymorphicAs,
      children,
      description,
      disabled,
      className,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useDarkMode(rest.darkMode);
    const textContent = getNodeTextContent(children);
    const ariaLabel =
      rest['aria-label'] ?? rest['aria-labelledby'] ? '' : textContent;
    return (
      <InputOption
        as={as}
        ref={ref}
        className={cx(
          searchResultStyles,
          searchResultThemeStyles[theme],
          {
            [searchResultDisabledStyle[theme]]: disabled,
          },
          className,
        )}
        disabled={disabled}
        aria-labelledby={rest['aria-labelledby']}
        aria-label={ariaLabel}
        {...rest}
      >
        <div className={titleClassName}>{children}</div>
        {description && (
          <span className={descriptionClassName}>{description}</span>
        )}
      </InputOption>
    );
  },
  'SearchResult',
);

SearchResult.displayName = 'SearchResult';

export { SearchResult };
