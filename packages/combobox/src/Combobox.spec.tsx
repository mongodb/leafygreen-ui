/* eslint-disable jest/no-disabled-tests */
/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelection"] }] */
import React from 'react';
import {
  waitForElementToBeRemoved,
  render,
  queryByText,
  act,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, ComboboxOption } from '.';
import { axe } from 'jest-axe';
import { BaseComboboxProps, ComboboxMultiselectProps } from './Combobox.types';
import { OptionObject } from './util';
import { isArray, isNull, isUndefined } from 'lodash';

/**
 * Setup
 */

type Select = 'single' | 'multiple';
type renderComboboxProps = {
  options?: Array<string | OptionObject>;
} & BaseComboboxProps &
  ComboboxMultiselectProps<boolean>;

const defaultOptions: Array<OptionObject> = [
  {
    value: 'apple',
    displayName: 'Apple',
  },
  {
    value: 'banana',
    displayName: 'Banana',
  },
  {
    value: 'carrot',
    displayName: 'Carrot',
  },
];

const getComboboxJSX = (props?: renderComboboxProps) => {
  const label = props?.label || 'Some label';
  return (
    <Combobox
      data-testid="combobox-container"
      label={label}
      multiselect={props.multiselect}
      {...props}
    >
      {props?.options.map(option => {
        const value = typeof option === 'string' ? option : option.value;
        const displayName =
          typeof option === 'string' ? undefined : option.displayName;
        return (
          <ComboboxOption key={value} value={value} displayName={displayName} />
        );
      })}
    </Combobox>
  );
};

function renderCombobox(
  select: Select = 'single',
  props?: renderComboboxProps,
) {
  const options = props?.options || defaultOptions;
  const multiselect = select === 'multiple';
  props = { options, multiselect, ...props };
  const renderResult = render(getComboboxJSX(props));
  const containerEl = renderResult.getByTestId('combobox-container');
  const labelEl = containerEl.getElementsByTagName('label')[0];
  const comboboxEl = renderResult.getByRole('combobox');
  const inputEl = containerEl.getElementsByTagName('input')[0];

  // Menu elements won't exist until component is interacted with
  const getMenuElements = () => {
    const menuContainerEl = renderResult.queryByRole('listbox');
    const popoverEl = menuContainerEl?.firstChild;
    const menuEl = menuContainerEl?.getElementsByTagName('ul')[0];
    const optionElements = menuContainerEl?.getElementsByTagName('li');

    return {
      menuContainerEl,
      popoverEl,
      menuEl,
      optionElements,
    };
  };

  const openMenu = () => {
    userEvent.click(comboboxEl);
    return getMenuElements();
  };

  const rerenderCombobox = (newProps: renderComboboxProps) =>
    renderResult.rerender(getComboboxJSX({ ...props, ...newProps }));

  function queryChipsByName(names: string): HTMLElement;
  function queryChipsByName(names: Array<string>): Array<HTMLElement>;
  function queryChipsByName(names) {
    return typeof names === 'string'
      ? queryByText(comboboxEl, names)
      : names.map(name => queryByText(comboboxEl, name));
  }

  /**
   * Asserts that options with the provided display name(s) are selected
   * @param selection
   * @returns
   */
  const expectSelection = (selection: string | Array<string>): void => {
    if (select === 'single') {
      if (isArray(selection)) {
        throw new Error('Selection must be a string for single select');
      }

      return expect(inputEl).toHaveValue(selection);
    } else {
      if (isArray(selection)) {
        const allChips = queryChipsByName(selection);
        allChips.forEach(chip => expect(chip).toBeInTheDocument());
      } else {
        const selectionChip = queryChipsByName(selection);
        return expect(selectionChip).toBeInTheDocument();
      }
    }
  };

  return {
    ...renderResult,
    rerenderCombobox,
    queryChipsByName,
    getMenuElements,
    openMenu,
    expectSelection,
    containerEl,
    labelEl,
    comboboxEl,
    inputEl,
  };
}

const testif = (condition: boolean) => (condition ? test : test.skip);

/**
 * Tests
 */
describe('packages/combobox', () => {
  describe('A11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container, inputEl } = renderCombobox();
      act(() => inputEl.focus()); // we focus the input to ensure the listbox gets rendered
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  const tests = [['single'], ['multiple']] as Array<Array<Select>>;
  describe.each(tests)('%s select', select => {
    /** Run tests for single select only */
    const testSingleSelect = (name: string, fn?: jest.ProvidesCallback) =>
      isUndefined(fn) ? test.todo(name) : testif(select === 'single')(name, fn);

    /** Run tests for multi-select only */
    const testMultiSelect = (name: string, fn?: jest.ProvidesCallback) =>
      isUndefined(fn)
        ? test.todo(name)
        : testif(select === 'multiple')(name, fn);

    // Basic Rendering
    test('Label is rendered', () => {
      const { labelEl } = renderCombobox(select);
      expect(labelEl).toBeInTheDocument();
    });

    test('Description is rendered', () => {
      const description = 'Lorem ipsum';
      const { getByText } = renderCombobox(select, { description });
      const descriptionEl = getByText(description);
      expect(descriptionEl).toBeInTheDocument();
    });

    describe('on error', () => {
      test.todo('Error message is rendered');
      test.todo('Error Icon is rendered');
    });

    testSingleSelect('Text input renders with initial value', () => {
      const initialValue = 'apple';
      const { expectSelection } = renderCombobox(select, { initialValue });
      expectSelection('Apple');
    });

    testMultiSelect('Chips render with initial value', () => {
      const initialValue = ['apple', 'banana'];
      const { expectSelection } = renderCombobox(select, { initialValue });
      expectSelection(['Apple', 'Banana']);
    });

    describe('When value is controlled', () => {
      /* eslint-disable jest/no-standalone-expect */
      testSingleSelect('Text input renders with value update', () => {
        let value = 'apple';
        const { expectSelection, rerenderCombobox } = renderCombobox(select, {
          value,
        });
        expectSelection('Apple');
        value = 'banana';
        rerenderCombobox({ value });
        expectSelection('Banana');
      });

      testSingleSelect('Invalid option passed as value is not selected', () => {
        const value = 'jellybean';
        const { expectSelection } = renderCombobox(select, { value });
        expectSelection('');
      });

      testMultiSelect('Updating `value` updates the chips', () => {
        let value = ['apple', 'banana'];
        const { expectSelection, rerenderCombobox } = renderCombobox(select, {
          value,
        });
        expectSelection(['Apple', 'Banana']);
        value = ['banana', 'carrot'];
        rerenderCombobox({ value });
        expectSelection(['Banana', 'Carrot']);
      });

      testMultiSelect('Invalid options are not selected', () => {
        const value = ['apple', 'jellybean'];
        const { queryChipsByName, expectSelection } = renderCombobox(select, {
          value,
        });
        expectSelection(['Apple']);
        const jellybeanChip = queryChipsByName('Jellybean');
        expect(jellybeanChip).not.toBeInTheDocument();
      });
      /*  eslint-enable jest/no-standalone-expect */
    });

    /**
     * Mouse interaction
     */
    test('Clicking the combobox sets focus to the input', () => {
      const { comboboxEl, inputEl } = renderCombobox(select);
      userEvent.click(comboboxEl);
      expect(inputEl).toHaveFocus();
    });

    test('Menu appears when input is focused', () => {
      const { inputEl, getMenuElements } = renderCombobox(select);
      act(() => inputEl.focus());
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).toBeInTheDocument();
    });

    test('Menu appears when box is clicked', () => {
      const { comboboxEl, getMenuElements } = renderCombobox(select);
      userEvent.click(comboboxEl);
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).not.toBeNull();
      expect(menuContainerEl).toBeInTheDocument();
    });

    test('Menu closes on click-away', async () => {
      const { containerEl, openMenu } = renderCombobox(select);
      const { menuContainerEl } = openMenu();
      userEvent.click(containerEl.parentElement);
      await waitForElementToBeRemoved(menuContainerEl);
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    test('Menu does not close on interaction with the menu', () => {
      const { getMenuElements, openMenu } = renderCombobox(select);
      const { optionElements } = openMenu();
      userEvent.click(optionElements[1]);
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).toBeInTheDocument();
    });

    /**
     * Keyboard navigation
     */
    test('First option is highlighted on menu open', () => {
      const { openMenu } = renderCombobox(select);
      const { optionElements } = openMenu();
      expect(optionElements[0]).toHaveAttribute('aria-selected', 'true');
    });

    test.skip('Down arrow moves highlight down', async () => {
      const { containerEl, openMenu, findByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(containerEl, '{arrowdown}');

      const selectedOption = await findByRole('option', {
        selected: true,
      });
      expect(selectedOption).toHaveTextContent('Banana');
    });

    test.skip('Up arrow moves highlight up', async () => {
      const { containerEl, openMenu, findByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(containerEl, '{arrowdown}');
      userEvent.type(containerEl, '{arrowdown}');
      userEvent.type(containerEl, '{arrowup}');

      const selectedOption = await findByRole('option', {
        selected: true,
      });
      expect(selectedOption).toHaveTextContent('Banana');
    });

    test('Escape key closes menu', async () => {
      const { containerEl, openMenu } = renderCombobox(select);
      const { menuContainerEl } = openMenu();
      userEvent.type(containerEl, '{esc}');
      await waitForElementToBeRemoved(menuContainerEl);
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    test('Tab key closes menu', async () => {
      const { containerEl, openMenu } = renderCombobox(select);
      const { menuContainerEl } = openMenu();
      userEvent.type(containerEl, '{tab}');
      await waitForElementToBeRemoved(menuContainerEl);
      expect(menuContainerEl).not.toBeInTheDocument();
    });

    test.skip('Down arrow key opens menu when its closed', async () => {
      const { containerEl, openMenu, findByRole } = renderCombobox(select);
      const { menuContainerEl } = openMenu();
      userEvent.type(containerEl, '{esc}');
      await waitForElementToBeRemoved(menuContainerEl);
      expect(menuContainerEl).not.toBeInTheDocument();
      userEvent.type(containerEl, '{arrowdown}');
      const reOpenedMenu = await findByRole('listbox');
      expect(reOpenedMenu).toBeInTheDocument();
    });

    test.todo('Enter key selects highlighted option');
    test.todo('Space key selects highlighted option');

    // Filtering
    test('Menu options list narrows when text is entered', async () => {
      const { inputEl, openMenu, findAllByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(inputEl, 'c');
      const optionElements = await findAllByRole('option');
      expect(optionElements.length).toEqual(1);
    });

    test('Clicking an option sets selection', () => {
      const { openMenu, expectSelection } = renderCombobox(select);
      const { optionElements } = openMenu();
      userEvent.click(optionElements[2]);
      expectSelection('Carrot');
    });

    testSingleSelect('Input value changes when a selection is made');
    testSingleSelect('Input value is set to selection value when menu closes');

    testMultiSelect('Left & Right arrow keys highlight chips');
    testMultiSelect('Removing all options via chip buttons clears selection');
  });

  describe('Chips', () => {
    test.todo('Chips truncate properly...');
  });
});
