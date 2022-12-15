import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import * as _LGTL from '@leafygreen-ui/testing-lib';

import { renderSearchInput } from '../utils/SearchInput.testutils';
import { SearchInput, SearchResult, SizeVariant } from '..';

const onClickHandler = jest.fn();

const defaultProps = {
  className: 'test-text-input-class',
  placeholder: 'This is some placeholder text',
  onChange: jest.fn(),
  onBlur: jest.fn(),
  children: [
    <SearchResult key="a" onClick={onClickHandler}>
      Apple
    </SearchResult>,
    <SearchResult key="b" onClick={onClickHandler}>
      Banana
    </SearchResult>,
    <SearchResult key="c" onClick={onClickHandler}>
      Carrot
    </SearchResult>,
    <SearchResult key="d" onClick={onClickHandler}>
      Dragonfruit
    </SearchResult>,
  ],
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

    test('Clear button is not rendered when there is no text', () => {
      const { queryByRole } = renderSearchInput();
      expect(queryByRole('button')).not.toBeInTheDocument();
    });

    test('Clear button is rendered when there is text', () => {
      const { queryByRole, inputEl } = renderSearchInput();
      userEvent.type(inputEl, 'abc');
      expect(queryByRole('button')).toBeInTheDocument();
    });

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

  describe('Basic Search Results rendering', () => {
    test('No results appear when there are no children', () => {
      const { getMenuElements, openMenu } = renderSearchInput();
      openMenu();
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    test('All children render in the menu', () => {
      const { openMenu } = renderSearchInput({
        ...defaultProps,
      });
      const { resultsElements } = openMenu();
      expect(resultsElements).toHaveLength(4);
    });

    test('Results change dynamically while menu is open', () => {
      const { getMenuElements, openMenu, rerenderWithProps } =
        renderSearchInput({
          children: defaultProps.children,
        });

      openMenu();
      rerenderWithProps({
        children: <SearchResult>Result 1</SearchResult>,
      });
      const { resultsElements } = getMenuElements();
      expect(resultsElements).toHaveLength(1);
    });
  });

  describe('Interaction', () => {
    test('Menu is not initially opened', () => {
      const { getMenuElements } = renderSearchInput({
        ...defaultProps,
      });

      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    describe('Any character key', () => {
      test('Updates the input', () => {
        const { inputEl } = renderSearchInput({
          onChange: defaultProps.onChange,
        });
        expect(inputEl.value).toBe('');
        userEvent.type(inputEl, 'a');
        expect(inputEl.value).toBe('a');
        expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
      });
      test("Opens the menu if it's closed", () => {
        const { getMenuElements, inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.type(inputEl, 'abc');
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });
    });

    test('Clear button clears any input', () => {
      const { queryByRole, inputEl } = renderSearchInput();
      userEvent.type(inputEl, 'abc');
      userEvent.click(queryByRole('button')!);
      expect(inputEl).toHaveValue('');
      expect(inputEl).toHaveFocus();
    });

    describe('Mouse interaction', () => {
      test('Clicking the input sets focus to the input', () => {
        const { inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.click(inputEl);
        expect(inputEl).toHaveFocus();
      });

      test('Clicking the input opens the menu', () => {
        const { getMenuElements, inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.click(inputEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeNull();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('Clicking elsewhere on the searchBox opens the menu', () => {
        const { getMenuElements, searchBoxEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.click(searchBoxEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeNull();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('Menu closes on click-away', async () => {
        const { openMenu, containerEl, inputEl } = renderSearchInput({
          ...defaultProps,
        });
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(menuContainerEl).not.toBeInTheDocument();
        expect(inputEl).toHaveFocus();
      });

      test('Text remains when the menu closes', async () => {
        const { openMenu, containerEl, inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.type(inputEl, 'abc');
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(inputEl).toHaveValue('abc');
      });

      test('Clicking a result fires its onClick handler', () => {
        const { getMenuElements, inputEl } = renderSearchInput({
          ...defaultProps,
        });
        userEvent.click(inputEl);
        const { resultsElements } = getMenuElements();

        userEvent.click(resultsElements![0]);
        expect(onClickHandler).toHaveBeenCalled();
      });
    });

    describe('Keyboard interaction', () => {
      test('First result is highlighted on menu open', () => {
        const { openMenu } = renderSearchInput({ ...defaultProps });
        const { resultsElements } = openMenu();
        expect(resultsElements).not.toBeUndefined();
        expect(resultsElements![0]).toHaveAttribute('aria-selected', 'true');
      });

      describe('Tab key', () => {
        test('Tab focuses the input', () => {
          const { getMenuElements, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.tab();
          expect(inputEl).toHaveFocus();
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('Focuses clear button', () => {
          const { inputEl, queryByRole } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.type(inputEl, 'abc');
          userEvent.tab();
          expect(queryByRole('button')).toHaveFocus();
        });

        test('Moves focus off input if there is no input value', () => {
          const { inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.tab();
          expect(inputEl).toHaveFocus();
          userEvent.tab();
          expect(inputEl).not.toHaveFocus();
        });

        test('Closes menu when tabbing away', async () => {
          const { getMenuElements, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.tab();
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
          userEvent.tab();
          expect(inputEl).not.toHaveFocus();
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });
      });

      describe('Escape key', () => {
        test('Closes the menu', async () => {
          const { inputEl, openMenu } = renderSearchInput({
            ...defaultProps,
          });
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });
        test('Returns focus to the input', () => {
          const { containerEl, openMenu, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          openMenu();
          userEvent.type(containerEl, '{esc}');
          expect(inputEl).toHaveFocus();
        });
      });

      test('Space key types a space character', () => {
        const { inputEl } = renderSearchInput({
          ...defaultProps,
        });
        userEvent.type(inputEl, ' ');
        expect(inputEl).toHaveValue(' ');
      });

      describe('Arrow keys', () => {
        test('Down arrow moves highlight down', () => {
          const { openMenu, inputEl, getByRole } = renderSearchInput({
            ...defaultProps,
          });
          openMenu();
          userEvent.type(inputEl, '{arrowdown}');
          const highlight = getByRole('option', {
            selected: true,
          });
          expect(highlight).toBeInTheDocument();
          expect(highlight).toHaveTextContent('Banana');
        });

        test('Up arrow moves highlight up', () => {
          const { openMenu, inputEl, getByRole } = renderSearchInput({
            ...defaultProps,
          });
          openMenu();
          userEvent.type(inputEl, '{arrowdown}{arrowdown}{arrowup}');
          const highlight = getByRole('option', {
            selected: true,
          });
          expect(highlight).toBeInTheDocument();
          expect(highlight).toHaveTextContent('Banana');
        });

        test('Down arrow key opens menu when its closed', () => {
          const { inputEl, getMenuElements } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.type(inputEl, '{arrowdown}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });
      });

      test('Enter key selects the highlighted result', () => {
        const { inputEl, openMenu } = renderSearchInput({
          ...defaultProps,
        });
        openMenu();
        userEvent.type(inputEl, '{arrowdown}{enter}');
        expect(onClickHandler).toHaveBeenCalled();
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
