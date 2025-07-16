/* eslint-disable jest/no-standalone-expect */
/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelection"] }] */
import {
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import isUndefined from 'lodash/isUndefined';

import { keyMap } from '@leafygreen-ui/lib';

import {
  defaultOptions,
  renderCombobox,
  Select,
  testif,
} from '../utils/ComboboxTestUtils';

/**
 * Tests
 */
describe('packages/combobox', () => {
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

    /**
     * Keyboard navigation
     */
    describe('Keyboard interaction', () => {
      test('First option is highlighted on menu open', () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).not.toBeUndefined();
        expect(
          (optionElements as HTMLCollectionOf<HTMLLIElement>)[0],
        ).toHaveAttribute('aria-selected', 'true');
      });

      describe('Enter key', () => {
        test('opens menu when input is focused', () => {
          const { getMenuElements, inputEl } = renderCombobox(select);
          userEvent.tab();
          userEvent.type(inputEl!, '{enter}');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeNull();
          expect(menuContainerEl).toBeInTheDocument();
        });

        test('does not make a selection when clicking enter on a closed menu', () => {
          const { getMenuElements, inputEl } = renderCombobox(select);
          userEvent.tab();
          userEvent.keyboard('{enter}');
          expect(inputEl).toHaveValue('');
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeNull();
          expect(menuContainerEl).toBeInTheDocument();
          expect(inputEl).toHaveValue('');
        });

        test('selects highlighted option', () => {
          const { inputEl, openMenu, queryChipsByName } =
            renderCombobox(select);
          openMenu();
          userEvent.type(inputEl!, '{arrowdown}{enter}');
          if (select === 'multiple') {
            expect(queryChipsByName('Banana')).toBeInTheDocument();
          } else {
            expect(inputEl).toHaveValue('Banana');
          }
        });

        test('fires onChange handler with payload', () => {
          const onChange = jest.fn();
          const { inputEl, openMenu } = renderCombobox(select, { onChange });
          openMenu();
          userEvent.type(inputEl!, '{arrowdown}{enter}');

          if (select === 'multiple') {
            expect(onChange).toHaveBeenCalledWith(
              ['banana'],
              expect.objectContaining({
                diffType: 'insert',
                value: 'banana',
              }),
            );
          } else {
            expect(onChange).toHaveBeenCalledWith('banana');
          }
        });

        test('does not fire onClear handler', () => {
          const onClear = jest.fn();
          const { inputEl, openMenu } = renderCombobox(select, { onClear });
          openMenu();
          userEvent.type(inputEl!, '{arrowdown}{enter}');
          expect(onClear).not.toHaveBeenCalled();
        });

        testSingleSelect('Re-opens menu after making a selection', async () => {
          const { inputEl, openMenu, getMenuElements } =
            renderCombobox('single');
          const { optionElements, menuContainerEl } = openMenu();
          const firstOption = optionElements![0];
          userEvent.click(firstOption);
          await waitForElementToBeRemoved(menuContainerEl);
          userEvent.type(inputEl, '{emter}');
          await waitFor(() => {
            const { menuContainerEl: newMenuContainerEl } = getMenuElements();
            expect(newMenuContainerEl).not.toBeNull();
            expect(newMenuContainerEl).toBeInTheDocument();
          });
        });

        testMultiSelect('Removes Chip when one is focused', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { comboboxEl, queryAllChips, queryChipsByName } =
            renderCombobox(select, {
              initialValue,
            });
          userEvent.type(comboboxEl, '{arrowleft}');
          const chip = queryChipsByName('Carrot');
          // Calling `userEvent.type` doesn't fire the necessary `keyDown` event
          fireEvent.keyDown(chip!, { key: keyMap.Enter });
          expect(queryAllChips()).toHaveLength(2);
        });
      });

      describe('Space key', () => {
        test('Types a space character', () => {
          const { inputEl, openMenu, queryAllChips } = renderCombobox(select);
          openMenu();
          userEvent.type(inputEl, 'a{space}fruit');
          expect(inputEl).toHaveValue('a fruit');
          if (select === 'multiple') {
            expect(queryAllChips()).toHaveLength(0);
          }
        });

        testMultiSelect('Removes Chip when one is focused', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { comboboxEl, queryAllChips, queryChipsByName } =
            renderCombobox(select, {
              initialValue,
            });
          userEvent.type(comboboxEl, '{arrowleft}');
          const chip = queryChipsByName('Carrot');
          // Calling `userEvent.type` doesn't fire the necessary `keyDown` event
          fireEvent.keyDown(chip!, { key: keyMap.Space });
          waitFor(() => expect(queryAllChips()).toHaveLength(2));
        });
      });

      describe('Escape key', () => {
        test('Closes menu', async () => {
          const { inputEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });
        test('Returns focus to the combobox', async () => {
          const { inputEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(inputEl).toContainFocus();
        });
      });

      describe('Tab key', () => {
        test('Focuses combobox but does not open menu', () => {
          const { getMenuElements, inputEl } = renderCombobox(select);
          userEvent.tab();
          expect(inputEl).toHaveFocus();
          const { menuContainerEl } = getMenuElements();
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('Closes menu when no selection is made', async () => {
          const { openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.tab();
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
        });

        test('Focuses clear button when it exists', async () => {
          const initialValue = select === 'multiple' ? ['apple'] : 'apple';
          const { clearButtonEl, openMenu } = renderCombobox(select, {
            initialValue,
          });
          openMenu();
          userEvent.tab();
          expect(clearButtonEl).toHaveFocus();
        });

        testMultiSelect('Focuses next Chip when a Chip is selected', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryAllChips } = renderCombobox(select, { initialValue });
          const [firstChip, secondChip] = queryAllChips();
          userEvent.click(firstChip);
          userEvent.tab();
          expect(secondChip).toContainFocus();
        });

        testMultiSelect('Focuses input when the last Chip is selected', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { inputEl, queryChipsByIndex } = renderCombobox(select, {
            initialValue,
          });
          const lastChip = queryChipsByIndex('last');
          userEvent.click(lastChip!);
          userEvent.tab();
          expect(inputEl).toHaveFocus();
        });
      });

      describe('Backspace key', () => {
        test('Deletes text when cursor is NOT at beginning of selection', async () => {
          const { inputEl } = renderCombobox(select);
          await userEvent.type(inputEl, 'app{backspace}');
          expect(inputEl).toHaveFocus();
          expect(inputEl).toHaveValue('ap');
        });

        testSingleSelect(
          'Deletes text after making a single selection',
          async () => {
            const { inputEl, openMenu } = renderCombobox('single');
            const { optionElements, menuContainerEl } = openMenu();
            const firstOption = optionElements![0];
            userEvent.click(firstOption);
            await waitForElementToBeRemoved(menuContainerEl);
            userEvent.type(inputEl, '{backspace}');
            expect(inputEl).toHaveFocus();
            expect(inputEl).toHaveValue('Appl');
          },
        );

        testSingleSelect('Re-opens menu after making a selection', async () => {
          const { inputEl, openMenu, getMenuElements } =
            renderCombobox('single');
          const { optionElements, menuContainerEl } = openMenu();
          const firstOption = optionElements![0];
          userEvent.click(firstOption);
          await waitForElementToBeRemoved(menuContainerEl);
          userEvent.type(inputEl, '{backspace}');
          await waitFor(() => {
            const { menuContainerEl: newMenuContainerEl } = getMenuElements();
            expect(newMenuContainerEl).not.toBeNull();
            expect(newMenuContainerEl).toBeInTheDocument();
          });
        });

        testMultiSelect(
          'Focuses last chip when cursor is at beginning of selection',
          () => {
            const initialValue = ['apple'];
            const { inputEl, queryAllChips } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(inputEl, '{backspace}');
            expect(queryAllChips()).toHaveLength(1);
            expect(queryAllChips()[0]).toContainFocus();
          },
        );

        testMultiSelect('Focuses last Chip after making a selection', () => {
          const { inputEl, openMenu, queryAllChips } = renderCombobox(select);
          const { optionElements } = openMenu();
          const firstOption = optionElements![0];
          userEvent.click(firstOption);
          userEvent.type(inputEl, '{backspace}');
          expect(queryAllChips()).toHaveLength(1);
          expect(queryAllChips()[0]).toContainFocus();
        });

        testMultiSelect('Removes Chip when one is focused', async () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { comboboxEl, queryAllChips, queryChipsByIndex } =
            renderCombobox(select, {
              initialValue,
            });
          userEvent.type(comboboxEl, '{arrowleft}');
          const lastChip = queryChipsByIndex(2);
          // Calling `userEvent.type` doesn't fire the necessary `keyDown` event
          fireEvent.keyDown(lastChip!, { key: keyMap.Backspace });
          expect(queryAllChips()).toHaveLength(2);
        });

        testMultiSelect('Focuses input when last chip is removed', () => {
          const initialValue = ['apple', 'banana'];
          const { comboboxEl, inputEl, queryChipsByIndex } = renderCombobox(
            select,
            { initialValue },
          );
          userEvent.type(comboboxEl, '{arrowleft}');
          const lastChip = queryChipsByIndex(1);
          fireEvent.keyDown(lastChip!, { key: keyMap.Backspace });
          expect(inputEl).toHaveFocus();
        });

        testMultiSelect(
          'Focuses next chip when an inner chip is removed',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { comboboxEl, queryChipsByIndex } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(comboboxEl, '{arrowleft}');
            const appleChip = queryChipsByIndex(0);
            const bananaChip = queryChipsByIndex(1);
            fireEvent.keyDown(appleChip!, { key: keyMap.Backspace });
            expect(bananaChip).toContainFocus();
          },
        );
      });

      describe('Up & Down arrow keys', () => {
        test('Down arrow moves highlight down', async () => {
          const { inputEl, openMenu, findByRole } = renderCombobox(select);
          openMenu();
          userEvent.type(inputEl, '{arrowdown}');
          const highlight = await findByRole('option', {
            selected: true,
          });
          expect(highlight).toHaveTextContent('Banana');
        });

        test('Up arrow moves highlight up', async () => {
          const { inputEl, openMenu, findByRole } = renderCombobox(select);
          openMenu();
          userEvent.type(inputEl, '{arrowdown}{arrowdown}{arrowup}');
          const highlight = await findByRole('option', {
            selected: true,
          });
          expect(highlight).toHaveTextContent('Banana');
        });

        test.todo('Down arrow cycles highlight to top');

        test.todo('Up arrow cycles highlight to bottom');

        test('Down arrow key opens menu when its closed', async () => {
          const { inputEl, openMenu, findByRole } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          expect(inputEl).toHaveFocus();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
          userEvent.type(inputEl, '{arrowdown}');
          const reOpenedMenu = await findByRole('listbox');
          expect(reOpenedMenu).toBeInTheDocument();
        });

        test('Pressing Down Arrow when there is a selection shows all menu options', () => {
          // See also: 'Opening the menu when there is a selection should show all options'
          const initialValue = select === 'multiple' ? ['apple'] : 'apple';
          const { inputEl, getMenuElements } = renderCombobox(select, {
            initialValue,
          });
          // First pressing escape to ensure the menu is closed
          userEvent.type(inputEl, '{esc}{arrowdown}');
          const { optionElements } = getMenuElements();
          expect(optionElements).toHaveLength(defaultOptions.length);
          expect(optionElements![0]).toHaveAttribute('aria-selected', 'true');
        });

        test('Pressing Up Arrow when there is a selection shows all menu options', () => {
          // See also: 'Opening the menu when there is a selection should show all options'
          const initialValue = select === 'multiple' ? ['apple'] : 'apple';
          const { inputEl, getMenuElements } = renderCombobox(select, {
            initialValue,
          });
          // First pressing escape to ensure the menu is closed
          userEvent.type(inputEl, '{esc}{arrowup}');
          const { optionElements } = getMenuElements();
          expect(optionElements).toHaveLength(defaultOptions.length);
          expect(optionElements![0]).toHaveAttribute('aria-selected', 'true');
        });
      });

      describe('Left arrow key', () => {
        testMultiSelect(
          'When cursor is at the beginning of input, Left arrow focuses last chip',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByIndex, inputEl } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(inputEl, '{arrowleft}');
            const lastChip = queryChipsByIndex('last');
            expect(lastChip).toContainFocus();
          },
        );
        testSingleSelect(
          'When cursor is at the beginning of input, Left arrow does nothing',
          async () => {
            const { inputEl } = renderCombobox(select);
            userEvent.type(inputEl, '{arrowleft}');
            await waitFor(() => expect(inputEl).toHaveFocus());
          },
        );
        test('If cursor is NOT at the beginning of input, Left arrow key moves cursor', async () => {
          const { inputEl } = renderCombobox(select);
          userEvent.type(inputEl, 'abc{arrowleft}');
          await waitFor(() => expect(inputEl).toHaveFocus());
        });

        test('When focus is on clear button, Left arrow moves focus to input', async () => {
          const initialValue = select === 'multiple' ? ['apple'] : 'apple';
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl!, '{arrowright}{arrowleft}');
          expect(inputEl!).toHaveFocus();
          expect(inputEl!.selectionEnd).toEqual(select === 'multiple' ? 0 : 5);
        });

        testMultiSelect(
          'When focus is on a chip, Left arrow focuses prev chip',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByIndex, inputEl } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(inputEl, '{arrowleft}{arrowleft}');
            const secondChip = queryChipsByIndex(1);
            expect(secondChip).toContainFocus();
          },
        );
        testMultiSelect(
          'When focus is on the first chip, Left arrrow does nothing',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryAllChips, inputEl } = renderCombobox(select, {
              initialValue,
            });
            const [firstChip] = queryAllChips();
            userEvent.type(
              inputEl,
              '{arrowleft}{arrowleft}{arrowleft}{arrowleft}',
            );
            expect(firstChip).toContainFocus();
          },
        );
      });

      describe('Right arrow key', () => {
        test('Does nothing when focus is on clear button', () => {
          const initialValue =
            select === 'multiple' ? ['apple', 'banana', 'carrot'] : 'apple';
          const { inputEl, clearButtonEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, '{arrowright}{arrowright}');
          expect(clearButtonEl).toHaveFocus();
        });

        test('Focuses clear button when cursor is at the end of input', () => {
          const initialValue =
            select === 'multiple' ? ['apple', 'banana', 'carrot'] : 'apple';
          const { inputEl, clearButtonEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, '{arrowright}');
          expect(clearButtonEl).toHaveFocus();
        });

        test('Moves cursor when cursor is NOT at the end of input', () => {
          const initialValue =
            select === 'multiple' ? ['apple', 'banana', 'carrot'] : 'apple';
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, 'abc{arrowleft}{arrowright}');
          expect(inputEl).toHaveFocus();
        });

        // FIXME: act warning
        testMultiSelect('Focuses input when focus is on last chip', () => {
          const initialValue = ['apple', 'banana'];
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(
            inputEl!,
            'abc{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowright}',
          );
          expect(inputEl!).toHaveFocus();
          // This behavior passes in the browser, but not in jest
          // expect(inputEl!.selectionStart).toEqual(0);
        });

        // FIXME: act warning
        testMultiSelect('Focuses input when focus is on only chip', () => {
          const initialValue = ['apple'];
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(
            inputEl!,
            'abc{arrowleft}{arrowleft}{arrowleft}{arrowleft}{arrowright}',
          );
          expect(inputEl!).toHaveFocus();
          // expect(inputEl!.selectionStart).toEqual(0);
        });

        // FIXME: act warning
        testMultiSelect(
          'Focuses next chip when focus is on an inner chip',
          () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { inputEl, queryChipsByIndex } = renderCombobox(select, {
              initialValue,
            });
            userEvent.type(inputEl!, '{arrowleft}{arrowleft}{arrowright}');
            const lastChip = queryChipsByIndex('last');
            expect(lastChip!).toContainFocus();
          },
        );
      });

      describe('Any other key', () => {
        test('Updates the value of the input', () => {
          const { inputEl } = renderCombobox(select);
          userEvent.type(inputEl, 'z');
          expect(inputEl).toHaveValue('z');
        });

        test('Updates the input when options are highlighted', () => {
          const { inputEl, openMenu } = renderCombobox(select);
          openMenu();
          userEvent.type(inputEl, '{arrowdown}z');
          expect(inputEl).toHaveValue('z');
        });

        test("Opens the menu if it's closed", async () => {
          const { inputEl, openMenu, getMenuElements } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, '{esc}');
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
          userEvent.type(inputEl, 'a');
          await waitFor(() => {
            const { menuContainerEl: newMenuContainerEl } = getMenuElements();
            expect(newMenuContainerEl).toBeInTheDocument();
          });
        });

        testSingleSelect(
          'Opens the menu after making a selection',
          async () => {
            const { inputEl, openMenu, getMenuElements } =
              renderCombobox(select);
            const { optionElements, menuContainerEl } = openMenu();
            const firstOption = optionElements![0];
            userEvent.click(firstOption);
            await waitForElementToBeRemoved(menuContainerEl);
            userEvent.type(inputEl, 'a');
            await waitFor(() => {
              const { menuContainerEl: newMenuContainerEl } = getMenuElements();
              expect(newMenuContainerEl).toBeInTheDocument();
            });
          },
        );

        test('Filters the menu options', () => {
          // Using default options
          const { inputEl, getMenuElements } = renderCombobox(select);
          userEvent.type(inputEl, 'c');
          const { optionElements } = getMenuElements();
          expect(optionElements).toHaveLength(1); // carrot
        });
      });
    });
  });
});
