import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchInput from '.';
import { axe } from 'jest-axe';
import { SizeVariant } from './types';

const defaultProps = {
  className: 'test-text-input-class',
  placeholder: 'This is some placeholder text',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

function renderSearchInput(props = {}) {
  const utils = render(
    <SearchInput
      data-testid="search-input"
      aria-label="test-search-input"
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

  test(`renders ${defaultProps.placeholder} as placeholder text`, () => {
    const { getByPlaceholderText } = renderSearchInput(defaultProps);
    expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
  });

  test(`renders ${defaultProps.className} in the classList`, () => {
    const { container } = renderSearchInput(defaultProps);
    expect(
      (container?.firstChild as HTMLElement)?.classList.contains(
        defaultProps.className,
      ),
    ).toBe(true);
  });

  test('key presses are reflected in component and onChange function is called when value changes', () => {
    const { searchInput } = renderSearchInput(defaultProps);
    expect((searchInput as HTMLInputElement).value).toBe('');

    fireEvent.change(searchInput, {
      target: { value: 'a' },
    });

    expect((searchInput as HTMLInputElement).value).toBe('a');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  describe('when the "sizeVariant" is not "large"', () => {
    // TODO: This type of check should be done with a visual regression test
    // As written this test does not pass even if the font-size is inherited correctly
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('check if font-size is 13px', () => {
      const { searchInput } = renderSearchInput({
        value: 'test',
      });

      expect(searchInput).toHaveStyle({
        fontSize: '13px',
      });
    });
  });

  describe('when the "sizeVariant" is "large"', () => {
    // TODO: This type of check should be done with a visual regression test
    // As written this test does not pass even if the font-size is inherited correctly
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('check if font-size is 18px', () => {
      const { searchInput } = renderSearchInput({
        value: 'test',
        sizeVariant: SizeVariant.Large,
      });

      expect(searchInput).toHaveStyle({
        fontSize: '18px',
      });
    });
  });

  describe('Search Results', () => {});

  /* eslint-disable jest/expect-expect, jest/no-disabled-tests */
  describe.skip('types behave as expected', () => {
    test('SearchInput throws error when no `aria-label` or `aria-labelledby` is supplied', () => {
      // @ts-expect-error
      <SearchInput />;
      <SearchInput aria-label="some label" />;
      <SearchInput aria-labelledby="some-id" />;
    });
  });
  /* eslint-enable jest/expect-expect, jest/no-disabled-tests */
});
