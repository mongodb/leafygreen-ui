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
  searchResultStyles,
  searchResultThemeStyles,
  titleClassName,
  descriptionClassName,
  searchResultDisabledStyle,
} from './SearchResult.styles';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

export const SearchResult = Polymorphic<
  InferredPolymorphicProps<SearchResultProps>
>(
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
        {...rest}
      >
        <div className={titleClassName}>{children}</div>
        {description && (
          <span className={descriptionClassName}>{description}</span>
        )}
      </InputOption>
    );
  },
);
