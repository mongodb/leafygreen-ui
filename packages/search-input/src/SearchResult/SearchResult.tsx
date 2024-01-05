import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { InputOption } from '@leafygreen-ui/input-option';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import {
  descriptionClassName,
  descriptionStyle,
  searchResultDisabledStyle,
  searchResultStyles,
  searchResultThemeStyles,
  titleClassName,
} from './SearchResult.styles';
import { SearchResultProps } from './SearchResult.types';

export const SearchResult = InferredPolymorphic<SearchResultProps, 'li'>(
  (
    { children, description, disabled, className, darkMode, as, href, ...rest },
    ref,
  ) => {
    const { Component: renderedAs } = useInferredPolymorphic(
      as,
      { href, ...rest },
      'li',
    );
    const { theme } = useDarkMode(darkMode);
    const textContent = getNodeTextContent(children);
    /**
     * If `rest[aria-label]` exists, use that;
     * if `rest['aria-labelledby']` exists, then we have no label;
     * if neither exist we set the label to `textContent`
     */
    const ariaLabel =
      rest['aria-label'] ?? (rest['aria-labelledby'] ? '' : textContent);

    return (
      // @ts-expect-error Polymorphic-type mismatch
      <InputOption
        {...rest}
        as={renderedAs}
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
        href={href}
      >
        <div className={titleClassName}>{children}</div>
        {description && (
          <div className={cx(descriptionClassName, descriptionStyle)}>
            {description}
          </div>
        )}
      </InputOption>
    );
  },
  'SearchResult',
);

SearchResult.displayName = 'SearchResult';
