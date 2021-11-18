import React from 'react';
import { render, fireEvent, queryByText, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, ComboboxOption } from '.';
import { axe } from 'jest-axe';
import { BaseComboboxProps, ComboboxMultiselectProps } from './Combobox.types';
import { OptionObject } from './util';
import { isNull, isUndefined } from 'lodash';
import { keyMap } from '../../typography/node_modules/@leafygreen-ui/lib/dist';

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

  const getChipsByName = (names: Array<string>): Array<HTMLElement> =>
    names.map(name => queryByText(comboboxEl, name));

  return {
    ...renderResult,
    rerenderCombobox,
    getChipsByName,
    getMenuElements,
    openMenu,
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
      const { inputEl } = renderCombobox(select, { initialValue });
      expect(inputEl.value).toEqual('Apple');
    });

    testMultiSelect('Chips render with initial value', () => {
      const initialValue = ['apple', 'banana'];
      const { getChipsByName } = renderCombobox(select, { initialValue });
      getChipsByName(['Apple', 'Banana']).forEach(chip =>
        expect(chip).toBeInTheDocument(),
      );
    });

    describe('When value is controlled', () => {
      /* eslint-disable jest/no-standalone-expect */
      testSingleSelect('Text input renders with value update', () => {
        let value = 'apple';
        const { inputEl, rerenderCombobox } = renderCombobox(select, {
          value,
        });
        expect(inputEl.value).toEqual('Apple');
        value = 'banana';
        rerenderCombobox({ value });
        expect(inputEl.value).toEqual('Banana');
      });

      testSingleSelect('Invalid option passed as value is not selected', () => {
        const value = 'jellybean';
        const { inputEl } = renderCombobox(select, { value });
        expect(inputEl.value).toEqual('');
      });

      testMultiSelect('Updating `value` updates the chips', () => {
        let value = ['apple', 'banana'];
        const { getChipsByName, rerenderCombobox } = renderCombobox(select, {
          value,
        });
        getChipsByName(['Apple', 'Banana']).forEach(chip =>
          expect(chip).toBeInTheDocument(),
        );
        value = ['banana', 'carrot'];
        rerenderCombobox({ value });
        getChipsByName(['Banana', 'Carrot']).forEach(chip =>
          expect(chip).toBeInTheDocument(),
        );
      });

      testMultiSelect('Invalid options are not selected', () => {
        const value = ['apple', 'jellybean'];
        const { getChipsByName } = renderCombobox(select, {
          value,
        });
        const [appleChip, jellybeanChip] = getChipsByName([
          'Apple',
          'Jellybean',
        ]);
        expect(appleChip).toBeInTheDocument();
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

    test(`Menu renders with correct checkmark for ${select} select`, () => {
      const { openMenu } = renderCombobox(select);
      const { optionElements } = openMenu();
      const checkElementTag = select === 'single' ? 'svg' : 'input';
      const areAllChecksCorrect = Array.from(optionElements).every(
        element => !isNull(element.querySelector(checkElementTag)),
      );
      expect(areAllChecksCorrect).toBeTruthy();
    });

    test('Menu closes on click-away', () => {
      const { containerEl, openMenu, getMenuElements } = renderCombobox(select);
      openMenu();
      userEvent.click(containerEl.parentElement);
      const { menuContainerEl } = getMenuElements();
      expect(menuContainerEl).toBeNull();
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

    test('Up & Down arrow keys highlight menu options', () => {
      const { containerEl, openMenu } = renderCombobox(select);
      const { optionElements, menuContainerEl } = openMenu();
      // userEvent.type(menuContainerEl, '{arrowdown}')
      fireEvent.keyDown(containerEl, {
        keyCode: keyMap.ArrowDown,
        key: 'ArrowDown',
      });
      expect(optionElements[0]).toHaveAttribute('aria-selected', 'false');
      expect(optionElements[1]).toHaveAttribute('aria-selected', 'true');

      // userEvent.type(menuContainerEl, '{arrowup}')
      fireEvent.keyDown(containerEl, {
        keyCode: keyMap.ArrowUp,
        key: 'ArrowUp',
      });
      expect(optionElements[1]).toHaveAttribute('aria-selected', 'false');
      expect(optionElements[0]).toHaveAttribute('aria-selected', 'true');
    });

    test.todo('Escape key closes menu');
    test.todo('Tab key closes menu');
    test.todo('Down arrow key opens menu when its closed');
    test.todo('Enter key selects highlighted option');
    test.todo('Space key selects highlighted option');

    // Filtering
    test.todo('Menu options list narrows when text is entered');

    testSingleSelect('Clicking an option sets selection');
    testMultiSelect('Clicking an option sets selection');

    testSingleSelect('Input value changes when a selection is made');
    testSingleSelect('Input value is set to selection value when menu closes');

    testMultiSelect('Left & Right arrow keys highlight chips');
    testMultiSelect('Removing all options via chip buttons clears selection');
  });

  describe('Chips', () => {
    test.todo('Chips truncate properly...');
  });
});
