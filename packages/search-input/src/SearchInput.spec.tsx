import React from 'react';
import { render } from '@testing-library/react';
import SearchInput from '.';
import { axe } from 'jest-axe';
import { SizeVariant } from './types';

function renderSearchInput(props = {}) {
  const utils = render(
    <SearchInput
      data-testid="search-input"
      aria-labelledby="test-search-input"
      {...props}
    />,
  );
  const searchInput = utils.getByTestId('search-input');
  return { ...utils, searchInput };
}

describe('packages/search-input', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSearchInput();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('renders type as "search" by default', () => {
    const { searchInput } = renderSearchInput();
    expect(searchInput.getAttribute('type')).toBe('search');
  });

  describe('when the "sizeVariant" is "large"', () => {
    // TODO: This type of check should be done with a visual regression test
    // As written this test does not pass even if the font-size is inherited correctly
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('check if font-size is 18px', () => {
      const { searchInput } = renderSearchInput({
        value: 'test',
        sizeVariant: SizeVariant.Large,
        optional: true,
      });

      expect(searchInput).toHaveStyle({
        fontSize: '18px',
      });
    });
  });

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('SearchInput throws error when aria-labelledby is not supplied', () => {
      // @ts-expect-error
      <SearchInput />;
    });
  });
});
