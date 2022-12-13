import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { renderSearchInput } from '../utils/SearchInput.testutils';
import { SearchInput, SizeVariant } from '..';

const defaultProps = {
  className: 'test-text-input-class',
  placeholder: 'This is some placeholder text',
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

describe('packages/search-input', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSearchInput();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Basic rendering', () => {
    test('renders type as "search"', () => {
      const { inputEl } = renderSearchInput();
      expect(inputEl.getAttribute('type')).toBe('search');
    });

    test(`renders provided placeholder text`, () => {
      const { getByPlaceholderText } = renderSearchInput(defaultProps);
      expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
    });

    test(`Passes className to root element`, () => {
      const { containerEl } = renderSearchInput(defaultProps);
      expect(
        containerEl.classList.contains(defaultProps.className),
      ).toBeTruthy();
    });

    test.todo('Clear button is rendered when there is text');
    test.todo('Clear button is not rendered when there is no text');

    describe('when the "sizeVariant" is not "large"', () => {
      // TODO: This type of check should be done with a visual regression test
      // As written this test does not pass even if the font-size is inherited correctly
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('check if font-size is 13px', () => {
        const { containerEl } = renderSearchInput({
          value: 'test',
        });

        expect(containerEl).toHaveStyle({
          fontSize: '13px',
        });
      });
    });

    describe('when the "sizeVariant" is "large"', () => {
      // TODO: This type of check should be done with a visual regression test
      // As written this test does not pass even if the font-size is inherited correctly
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('check if font-size is 18px', () => {
        const { containerEl } = renderSearchInput({
          value: 'test',
          sizeVariant: SizeVariant.Large,
        });

        expect(containerEl).toHaveStyle({
          fontSize: '18px',
        });
      });
    });
  });

  describe('Search Results', () => {
    test('No results appear when there are no children', () => {
      const { getMenuElements } = renderSearchInput();
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeInTheDocument();
    });
    test.todo('Results menu opens on focus');
    test.todo('All children Results render in the menu');

    test.todo('Results change dynamically while menu is open');
  });

  describe('Interaction', () => {
    test.todo('Typing any character updates the input');
    test.todo('Clear button clears any input');

    test('key presses are reflected in component, and onChange function is called when value changes', () => {
      const { inputEl } = renderSearchInput({ ...defaultProps });
      expect(inputEl.value).toBe('');
      userEvent.type(inputEl, 'a');
      expect(inputEl.value).toBe('a');
      expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
    });

    describe('Mouse interaction', () => {
      test.todo('Menu is not initially opened');
      test.todo('Clicking the input sets focus to the input');
      test.todo('Results menu opens on click');
      test.todo('Menu closes on click-away');
      test.todo('Text remains when the menu closes');
      test.todo('Clicking a result fires its onClick handler');
    });

    describe('Keyboard interaction', () => {
      test.todo('Menu is not initially opened');
      test.todo('First result is highlighted on menu open');
      test.todo('Results menu opens on focus');

      describe('Tab key', () => {
        test.todo('Tab focuses the input');
        test.todo('Focuses clear button');
        test.todo('Moves focus off input if no input & closes menu');
      });

      describe('Escape key', () => {
        test.todo('Closes the menu');
        test.todo('Returns focus to the input');
      });
      test.todo('Space key types a space character');

      test.todo('Enter key selects the highlighted result');

      describe('Arrow keys', () => {
        test.todo('Down arrow moves highlight down');
        test.todo('Up arrow moves highlight up');
        test.todo('Down arrow key opens menu when its closed');
      });

      describe('Any other key', () => {
        test.todo('Updates the value of the input');
        test.todo("Opens the menu if it's closed");
      });
    });

    test.todo(
      'Highlight moves to first result if the previously highlighted result no longer exists',
    );
  });

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
