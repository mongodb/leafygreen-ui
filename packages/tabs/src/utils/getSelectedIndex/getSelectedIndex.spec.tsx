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
    </ol>,
  );

  const allItems = renderUtils.getAllByTestId('list-item');

  return {
    ...renderUtils,
    allItems,
  };
};

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
