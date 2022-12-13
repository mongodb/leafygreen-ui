import React from 'react';
import { render } from '@testing-library/react';

import { SearchInputProps } from '../SearchInput.types';
import { SearchInput } from '..';

export function renderSearchInput(props: Partial<SearchInputProps> = {}) {
  const renderResult = render(
    <SearchInput
      data-testid="search-input"
      aria-label="test-search-input"
      {...props}
    />,
  );

  const containerEl = renderResult.getByTestId('search-input');
  const inputEl = containerEl.getElementsByTagName('input')[0];

  function getMenuElements() {
    const menuContainerEl = renderResult.queryByRole('listbox');

    return {
      menuContainerEl,
    };
  }

  return { ...renderResult, containerEl, inputEl, getMenuElements };
}
