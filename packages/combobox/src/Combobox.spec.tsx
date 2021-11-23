/* eslint-disable jest/no-disabled-tests */
/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelection"] }] */
import { waitForElementToBeRemoved, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { isUndefined } from 'lodash';
import { renderCombobox, Select, testif } from './ComboboxTestUtils';

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

    describe('Clear button', () => {
      /* eslint-disable jest/no-standalone-expect */
      testSingleSelect(
        'Clear button is rendered when selection is provided',
        () => {
          const { clearButtonEl } = renderCombobox(select, {
            initialValue: 'apple',
          });
          expect(clearButtonEl).toBeInTheDocument();
        },
      );

      testMultiSelect(
        'Clear button is rendered when selection is provided',
        () => {
          const { clearButtonEl } = renderCombobox(select, {
            initialValue: ['apple'],
          });
          expect(clearButtonEl).toBeInTheDocument();
        },
      );

      test('Clear button is not rendered when there is no selection', () => {
        const { clearButtonEl } = renderCombobox(select);
        expect(clearButtonEl).not.toBeInTheDocument();
      });
      /* eslint-enable jest/no-standalone-expect */
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

    testSingleSelect(
      'Selected single select option renders with a checkmark icon',
      () => {
        const initialValue = 'apple';
        const { openMenu } = renderCombobox('single', { initialValue });
        const { selectedElements } = openMenu();
        expect(selectedElements?.querySelector('svg')).not.toBeNull();
      },
    );

    testMultiSelect(
      'Each multiple select option renders with a checkbox input',
      () => {
        const initialValue = ['apple', 'banana'];
        const { openMenu } = renderCombobox('multiple', { initialValue });
        const { selectedElements } = openMenu();
        expect(
          selectedElements?.every(element => element?.querySelector('input')),
        ).toBeTruthy();
      },
    );

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
        expect(queryChipsByName('Jellybean')).not.toBeInTheDocument();
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
      userEvent.click(containerEl.parentElement!);
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

    test('Clicking an option sets selection', () => {
      const { openMenu, expectSelection } = renderCombobox(select);
      const { optionElements } = openMenu();
      userEvent.click(optionElements[2]);
      expectSelection('Carrot');
    });

    testSingleSelect(
      'Input value is set to selection value when menu closes',
      () => {
        const initialValue = 'apple';
        const { expectSelection, inputEl } = renderCombobox(select, {
          initialValue,
        });
        userEvent.type(inputEl, '{backspace}{backspace}{esc}');
        expectSelection('Apple');
      },
    );

    testMultiSelect('Clicking chip button removes option', () => {
      const initialValue = ['apple', 'banana', 'carrot'];
      const { queryChipsByName, expectSelection } = renderCombobox(select, {
        initialValue,
      });
      const appleChip = queryChipsByName('Apple');
      userEvent.click(appleChip.querySelector('button'));
      expectSelection(['banana', 'carrot'], true);
    });

    test('Clicking clear all button clears selection', () => {
      const initialValue =
        select === 'single' ? 'apple' : ['apple', 'banana', 'carrot'];
      const { expectSelection, clearButtonEl } = renderCombobox(select, {
        initialValue,
      });
      userEvent.click(clearButtonEl);
      expectSelection(null);
    });

    /**
     * Keyboard navigation
     */
    test('First option is highlighted on menu open', () => {
      const { openMenu } = renderCombobox(select);
      const { optionElements } = openMenu();
      expect(optionElements[0]).toHaveAttribute('aria-selected', 'true');
    });

    test('Down arrow moves highlight down', async () => {
      const { comboboxEl, openMenu, findByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(comboboxEl, '{arrowdown}');
      const highlight = await findByRole('option', {
        selected: true,
      });
      expect(highlight).toHaveTextContent('Banana');
    });

    test('Up arrow moves highlight up', async () => {
      const { comboboxEl, openMenu, findByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(comboboxEl, '{arrowdown}{arrowdown}{arrowup}');
      const highlight = await findByRole('option', {
        selected: true,
      });
      expect(highlight).toHaveTextContent('Banana');
    });

    test('Enter key selects highlighted option', () => {
      const { comboboxEl, openMenu, expectSelection } = renderCombobox(select);
      const { menuContainerEl } = openMenu();
      userEvent.type(comboboxEl, '{arrowdown}');
      userEvent.type(menuContainerEl, '{enter}');
      expectSelection('Banana');
    });

    test('Space key selects highlighted option', () => {
      const { comboboxEl, openMenu, expectSelection } = renderCombobox(select);
      const { menuContainerEl } = openMenu();
      userEvent.type(comboboxEl, '{arrowdown}');
      userEvent.type(menuContainerEl, '{space}');
      expectSelection('Banana');
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

    describe('Left & Right arrow keys', () => {
      /* eslint-disable jest/no-standalone-expect */
      testMultiSelect(
        'Left arrow focuses last chip when input has focus',
        () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryChipsByName, comboboxEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(comboboxEl, '{arrowleft}');
          const carrotChip = queryChipsByName('Carrot');
          expect(carrotChip.contains(document.activeElement)).toBeTruthy();
        },
      );

      testMultiSelect(
        'Right arrow focuses clear button when input has focus',
        () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { comboboxEl, clearButtonEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(comboboxEl, '{arrowright}');
          expect(clearButtonEl).toHaveFocus();
        },
      );
      /* eslint-enable jest/no-standalone-expect */
    });

    describe('Remove chips with keyboard', () => {
      /* eslint-disable jest/no-standalone-expect */
      let comboboxEl: HTMLElement,
        expectSelection: (
          expectedSelection: string | Array<string>,
          exact?: boolean,
        ) => void,
        chipButton: HTMLElement;

      beforeEach(() => {
        const initialValue = ['apple', 'banana', 'carrot'];
        const combobox = renderCombobox(select, {
          initialValue,
        });
        comboboxEl = combobox.comboboxEl;
        expectSelection = combobox.expectSelection;
        userEvent.type(comboboxEl, '{arrowleft}');
        const chip = combobox.queryChipsByName('Carrot');
        chipButton = chip.querySelector('button');
      });

      testMultiSelect('Enter key', () => {
        userEvent.type(chipButton, '{enter}');
        expectSelection(['apple', 'banana'], true);
      });
      testMultiSelect('Delete key', () => {
        userEvent.type(chipButton, '{backspace}');
        expectSelection(['apple', 'banana'], true);
      });
      testMultiSelect('Space key', () => {
        userEvent.type(chipButton, '{space}');
        expectSelection(['apple', 'banana'], true);
      });
      /* eslint-enable jest/no-standalone-expect */
    });

    // Filtering
    test('Menu options list narrows when text is entered', async () => {
      const { inputEl, openMenu, findAllByRole } = renderCombobox(select);
      openMenu();
      userEvent.type(inputEl, 'c');
      const optionElements = await findAllByRole('option');
      expect(optionElements.length).toEqual(1);
    });
  });

  describe('Chips', () => {
    test.todo('Chips truncate properly...');
  });
});
