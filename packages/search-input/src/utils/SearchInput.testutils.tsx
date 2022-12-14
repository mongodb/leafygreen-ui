import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { SearchInput, type SearchInputProps } from '..';

export function getSearchInputJSX(props?: Partial<SearchInputProps>) {
  return (
    <SearchInput
      data-testid="search-input"
      aria-label="test-search-input"
      {...props}
    />
  );
}

export function renderSearchInput(props: Partial<SearchInputProps> = {}) {
  const renderResult = render(getSearchInputJSX(props));

  function rerenderWithProps(newProps?: Partial<SearchInputProps>) {
    renderResult.rerender(getSearchInputJSX(newProps));
  }

  const containerEl = renderResult.getByTestId('search-input');
  const inputEl = containerEl.getElementsByTagName('input')[0];
  const clearButton = renderResult.queryByRole('button');

  /**
   * Opens the menu by simulating a click on the combobox.
   * @returns Object of menu elements
   */
  const openMenu = () => {
    userEvent.click(inputEl);
    return getMenuElements();
  };

  function getMenuElements() {
    const menuContainerEl = renderResult.queryByRole('listbox');
    const resultsElements = menuContainerEl?.getElementsByTagName('li');

    return {
      menuContainerEl,
      resultsElements,
    };
  }

  return {
    ...renderResult,
    rerenderWithProps,
    containerEl,
    inputEl,
    clearButton,
    openMenu,
    getMenuElements,
  };
}
