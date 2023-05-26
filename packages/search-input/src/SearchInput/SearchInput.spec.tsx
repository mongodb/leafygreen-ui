import React from 'react';
import {
  createEvent,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { renderSearchInput } from '../utils/SearchInput.testutils';
import { SearchInput, SearchResult } from '..';

import { State } from './SearchInput.types';

const resultClickHandler = jest.fn();

const defaultProps = {
  className: 'test-text-input-class',
  placeholder: 'This is some placeholder text',
  children: [
    <SearchResult key="a" onClick={resultClickHandler}>
      Apple
    </SearchResult>,
    <SearchResult key="b" onClick={resultClickHandler}>
      Banana
    </SearchResult>,
    <SearchResult key="c" onClick={resultClickHandler}>
      Carrot
    </SearchResult>,
    <SearchResult key="d" onClick={resultClickHandler}>
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

    test(`passes className to root element`, () => {
      const { containerEl } = renderSearchInput(defaultProps);
      expect(
        containerEl.classList.contains(defaultProps.className),
      ).toBeTruthy();
    });

    test('clear button is not rendered when there is no text', () => {
      const { queryByRole } = renderSearchInput();
      expect(queryByRole('button')).not.toBeInTheDocument();
    });

    test('clear button is rendered when there is text', () => {
      const { queryByRole, inputEl } = renderSearchInput();
      userEvent.type(inputEl, 'abc');
      expect(queryByRole('button')).toBeInTheDocument();
    });
  });

  describe('Basic Search Results rendering', () => {
    test('no results appear when there are no children', () => {
      const { getMenuElements, openMenu } = renderSearchInput();
      openMenu();
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    test('all children render in the menu', () => {
      const { openMenu } = renderSearchInput({
        ...defaultProps,
      });
      const { resultsElements } = openMenu();
      expect(resultsElements).toHaveLength(4);
    });

    test('results change dynamically while menu is open', () => {
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
    test('menu is not initially opened', () => {
      const { getMenuElements } = renderSearchInput({
        ...defaultProps,
      });

      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    describe('When disabled', () => {
      test('searchbox is focusable when `disabled`', () => {
        const { inputEl } = renderSearchInput({
          disabled: true,
          ...defaultProps,
        });
        userEvent.tab();
        expect(inputEl).toHaveFocus();
      });

      test('searchbox is NOT clickable when `disabled`', () => {
        const { searchBoxEl } = renderSearchInput({
          disabled: true,
          ...defaultProps,
        });
        userEvent.click(searchBoxEl);
        expect(document.body).toHaveFocus();
      });

      test('clear button is not clickable', () => {
        const changeHandler = jest.fn();
        const { inputEl, queryByRole } = renderSearchInput({
          ...defaultProps,
          disabled: true,
          value: 'abc',
          onChange: changeHandler,
        });

        userEvent.click(queryByRole('button')!);
        expect(inputEl).toHaveValue('abc');
        expect(changeHandler).not.toHaveBeenCalled();
      });

      test('clear button does not focus on {tab}', () => {
        const { queryByRole } = renderSearchInput({
          ...defaultProps,
          disabled: true,
          value: 'abc',
        });
        const button = queryByRole('button');
        userEvent.tab(); // could focus on input (but shouldn't)
        expect(button).not.toHaveFocus();
        userEvent.tab(); // check again in case input got focused
        expect(button).not.toHaveFocus();
      });
    });

    describe('Any character key', () => {
      test('updates the input', () => {
        const changeHandler = jest.fn();
        const { inputEl } = renderSearchInput({
          onChange: changeHandler,
        });
        expect(inputEl.value).toBe('');
        userEvent.type(inputEl, 'a');
        expect(inputEl.value).toBe('a');
        expect(changeHandler).toHaveBeenCalledTimes(1);
      });
      test("opens the menu if it's closed", () => {
        const { getMenuElements, inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.type(inputEl, 'abc');
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).toBeInTheDocument();
      });
    });

    describe('Enter key', () => {
      test('keydown event is called', () => {
        const keyDownHandler = jest.fn();
        const { inputEl } = renderSearchInput({
          onKeyDown: keyDownHandler,
        });
        userEvent.type(inputEl, '{enter}');
        expect(keyDownHandler).toHaveBeenCalledTimes(1);
      });

      // https://jira.mongodb.org/browse/LG-3195
      // https://github.com/silx-kit/h5web/pull/814
      // This can be done after testing-library's version is bumped to at least 13.5.0
      test.todo('test multiple keys being pressed at once');
    });

    describe('Clear button', () => {
      test('clears any input', () => {
        const { queryByRole, inputEl } = renderSearchInput({
          ...defaultProps,
        });
        userEvent.type(inputEl, 'abc');
        userEvent.click(queryByRole('button')!);
        expect(inputEl).toHaveValue('');
      });

      test('fires `onChange`', () => {
        const changeHandler = jest.fn();
        const { queryByRole, inputEl } = renderSearchInput({
          ...defaultProps,
          onChange: changeHandler,
        });
        userEvent.type(inputEl, 'abc');
        userEvent.click(queryByRole('button')!);
        expect(changeHandler).toHaveBeenCalled();
      });

      test('focuses input, but does not open the menu', () => {
        const { queryByRole, inputEl, getMenuElements } = renderSearchInput({
          ...defaultProps,
          value: 'abc',
        });
        userEvent.click(queryByRole('button')!);
        const { menuContainerEl } = getMenuElements();
        expect(inputEl).toHaveFocus();
        expect(menuContainerEl).not.toBeInTheDocument();
      });
    });

    describe('Mouse interaction', () => {
      test('clicking the input sets focus to the input', () => {
        const { inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.click(inputEl);
        expect(inputEl).toHaveFocus();
      });

      test('clicking the input opens the menu', () => {
        const { getMenuElements, inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.click(inputEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeNull();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('clicking anywhere on the searchBox opens the menu & sets focus', () => {
        const { getMenuElements, searchBoxEl, inputEl } = renderSearchInput({
          ...defaultProps,
        });

        userEvent.click(searchBoxEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeNull();
        expect(menuContainerEl).toBeInTheDocument();
        expect(inputEl).toHaveFocus();
      });

      describe('Click-away', () => {
        test('Basic (without menu): click-away un-focuses the input', async () => {
          const { containerEl, inputEl } = renderSearchInput({
            ...defaultProps,
            children: undefined,
          });

          userEvent.click(inputEl);
          userEvent.click(containerEl.parentElement!);

          await waitFor(() => {
            expect(inputEl).not.toHaveFocus();
          });
        });

        test('With menu: click-away keeps focus on the input', () => {
          const { containerEl, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.click(inputEl);
          userEvent.click(containerEl.parentElement!);
          expect(inputEl).toHaveFocus();
        });

        test('menu closes on click-away', async () => {
          const { openMenu, containerEl } = renderSearchInput({
            ...defaultProps,
          });
          const { menuContainerEl } = openMenu();
          userEvent.click(containerEl.parentElement!);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('text remains when the menu closes', async () => {
          const { openMenu, containerEl, inputEl } = renderSearchInput({
            ...defaultProps,
          });

          userEvent.type(inputEl, 'abc');
          const { menuContainerEl } = openMenu();
          userEvent.click(containerEl.parentElement!);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(inputEl).toHaveValue('abc');
        });
      });

      describe('clicking a result', () => {
        test('fires its onClick handler', () => {
          const { getMenuElements, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.click(inputEl);
          const { resultsElements } = getMenuElements();

          userEvent.click(resultsElements![0]);
          expect(resultClickHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'click',
            }),
          );
        });

        test('fires the onSubmit handler', () => {
          const submitHandler = jest.fn();

          const { getMenuElements, inputEl, containerEl } = renderSearchInput({
            ...defaultProps,
            onSubmit: submitHandler,
          });
          userEvent.click(inputEl);
          const { resultsElements } = getMenuElements();

          userEvent.click(resultsElements![0]);
          expect(submitHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'submit',
            }),
          );
          const submitEvent = submitHandler.mock.calls[0][0]; // the first parameter of the first call
          expect(submitEvent.target).toBe(containerEl);
        });

        test('fires the change handler', () => {
          const changeHandler = jest.fn();
          const { getMenuElements, inputEl } = renderSearchInput({
            ...defaultProps,
            onChange: changeHandler,
          });
          userEvent.click(inputEl);
          const { resultsElements } = getMenuElements();
          userEvent.click(resultsElements![0]);
          expect(changeHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'change',
            }),
          );
        });

        test('does not populate the input with the result text', () => {
          // https://mongodb.slack.com/archives/G01500NFVPS/p1676059715272479
          const { getMenuElements, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.click(inputEl);
          const { resultsElements } = getMenuElements();
          userEvent.click(resultsElements![0]);
          expect(inputEl.value).toBe('');
        });
      });
    });

    describe('Keyboard interaction', () => {
      test('first result is highlighted on menu open', () => {
        const { openMenu } = renderSearchInput({ ...defaultProps });
        const { resultsElements } = openMenu();
        expect(resultsElements).not.toBeUndefined();
        expect(resultsElements![0]).toHaveAttribute('aria-selected', 'true');
      });

      describe('Tab key', () => {
        test('tab focuses the input', () => {
          const { inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.tab();
          expect(inputEl).toHaveFocus();
        });

        test('menu does NOT open on first focus', () => {
          const { getMenuElements } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.tab();
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('focuses clear button', () => {
          const { inputEl, queryByRole } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.type(inputEl, 'abc');
          userEvent.tab();
          expect(queryByRole('button')).toHaveFocus();
        });

        test('moves focus off input if there is no input value', () => {
          const { inputEl } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.tab();
          expect(inputEl).toHaveFocus();
          userEvent.tab();
          expect(inputEl).not.toHaveFocus();
        });

        // Can't get jest to verify the menu closes. Can verify in browser
        // eslint-disable-next-line jest/no-disabled-tests
        test.skip('Closes menu when tabbing away', async () => {
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
        test('closes the menu', async () => {
          const { inputEl, openMenu } = renderSearchInput({
            ...defaultProps,
          });
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });
        test('returns focus to the input', () => {
          const { containerEl, openMenu, inputEl } = renderSearchInput({
            ...defaultProps,
          });
          openMenu();
          userEvent.type(containerEl, '{esc}');
          expect(inputEl).toHaveFocus();
        });
      });

      test('space key types a space character', () => {
        const { inputEl } = renderSearchInput({
          ...defaultProps,
        });
        userEvent.type(inputEl, ' ');
        expect(inputEl).toHaveValue(' ');
      });

      describe('Arrow keys', () => {
        test('down arrow opens menu', () => {
          const { inputEl, getMenuElements } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.type(inputEl, '{arrowdown}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('down arrow moves highlight down', () => {
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

        test('up arrow moves highlight up', () => {
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

        test('up arrow cycles highlight to bottom', () => {
          const { openMenu, inputEl, getByRole } = renderSearchInput({
            ...defaultProps,
          });
          openMenu();
          userEvent.type(inputEl, '{arrowup}');
          const highlight = getByRole('option', {
            selected: true,
          });
          expect(highlight).toBeInTheDocument();
          expect(highlight).toHaveTextContent('Dragonfruit');
        });

        test('down arrow cycles highlight to top', () => {
          const { openMenu, inputEl, getByRole } = renderSearchInput({
            ...defaultProps,
          });
          openMenu();
          userEvent.type(inputEl, '{arrowup}{arrowdown}');
          const highlight = getByRole('option', {
            selected: true,
          });
          expect(highlight).toBeInTheDocument();
          expect(highlight).toHaveTextContent('Apple');
        });

        test('down arrow key opens menu when its closed', () => {
          const { inputEl, getMenuElements } = renderSearchInput({
            ...defaultProps,
          });
          userEvent.type(inputEl, '{arrowdown}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).toBeInTheDocument();
        });
      });

      describe('Enter key', () => {
        test('submit event prevents default with typeahead', () => {
          const { containerEl } = renderSearchInput({
            ...defaultProps,
          });
          const submitEvent = createEvent.submit(containerEl);
          fireEvent(containerEl, submitEvent);
          expect(submitEvent.defaultPrevented).toBeTruthy();
        });

        test('submit event prevents default without typeahead', () => {
          const { containerEl } = renderSearchInput({
            ...defaultProps,
            children: undefined,
          });
          const submitEvent = createEvent.submit(containerEl);
          fireEvent(containerEl, submitEvent);
          expect(submitEvent.defaultPrevented).toBeTruthy();
        });

        test('fires onSubmit without typeahead', () => {
          const submitHandler = jest.fn();
          const { inputEl, containerEl } = renderSearchInput({
            ...defaultProps,
            children: undefined,
            onSubmit: submitHandler,
          });
          userEvent.type(inputEl, 'abc{enter}');

          expect(submitHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'submit',
            }),
          );
          const submitEvent = submitHandler.mock.calls[0][0]; // the first parameter of the first call
          expect(submitEvent.target).toBe(containerEl);
          // TODO: test that the event has the correct value
          // expect(submitEvent.target.elements[0].value).toBe('Banana');
        });

        test('selects the highlighted result and fires onSubmit with typeahead', async () => {
          const submitHandler = jest.fn();

          const { inputEl, containerEl, openMenu } = renderSearchInput({
            ...defaultProps,
            onSubmit: submitHandler,
          });
          openMenu();
          userEvent.type(inputEl, '{arrowdown}{enter}');
          expect(resultClickHandler).toHaveBeenCalled();
          expect(submitHandler).toHaveBeenCalledWith(
            expect.objectContaining({
              type: 'submit',
            }),
          );
          const submitEvent = submitHandler.mock.calls[0][0]; // the first parameter of the first call
          expect(submitEvent.target).toBe(containerEl);
        });
      });
    });

    test.todo(
      'highlight moves to first result if the previously highlighted result no longer exists',
    );
  });

  describe('`state` prop', () => {
    test('shows a loading menu when the input is focused', () => {
      const { getMenuElements, inputEl, getByTestId } = renderSearchInput({
        ...defaultProps,
        state: State.Loading,
      });

      const { menuContainerEl: initialMenu } = getMenuElements();
      expect(initialMenu).not.toBeInTheDocument();

      userEvent.click(inputEl);
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeNull();
      expect(menuContainerEl).toBeInTheDocument();

      const loadingOption = getByTestId('lg-search-input-loading-option');
      expect(loadingOption).toBeInTheDocument();
    });

    test('has no effect when there are no children', () => {
      const { inputEl, getMenuElements } = renderSearchInput({
        state: State.Loading,
      });

      userEvent.click(inputEl);
      const { menuContainerEl } = getMenuElements();

      expect(menuContainerEl).not.toBeInTheDocument();
    });
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
