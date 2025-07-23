import React from 'react';
import { render } from '@testing-library/react';

import { getSelectedIndex } from './getSelectedIndex';

const renderList = () => {
  const renderUtils = render(
    <ol>
      <li data-testid="list-item" data-text="First">
        Content 1
      </li>
      <li data-testid="list-item" data-text="Second">
        Content 2
      </li>
      <li data-testid="list-item" data-text="Third">
        Content 3
      </li>
      <li data-testid="list-item" data-text="Third">
        Content 4
      </li>
    </ol>,
  );

  const allItems = renderUtils.getAllByTestId('list-item');

  return {
    ...renderUtils,
    allItems,
  };
};

describe('getSelectedIndex', () => {
  describe('returns the correct index', () => {
    test('when a string is passed', () => {
      const { allItems } = renderList();
      const selectedIndex = getSelectedIndex('Second', allItems);
      expect(selectedIndex).toEqual(1);
    });

    test('when a number is passed', () => {
      const { allItems } = renderList();
      const selectedIndex = getSelectedIndex(2, allItems);
      expect(selectedIndex).toEqual(2);
    });
  });

  test('returns -1 if the string is not found', () => {
    const { allItems } = renderList();
    const selectedIndex = getSelectedIndex('Four', allItems);
    expect(selectedIndex).toEqual(-1);
  });

  test('returns the index of the first element if there are multiple elements with the same name', () => {
    const { allItems } = renderList();
    const selectedIndex = getSelectedIndex('Third', allItems);
    expect(selectedIndex).toEqual(2);
  });
});
