/* eslint-disable jest/no-standalone-expect */
/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelection"] }] */
import React from 'react';
import {
  act,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import isUndefined from 'lodash/isUndefined';

import { Button } from '@leafygreen-ui/button';

import {
  defaultOptions,
  getComboboxJSX,
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
     * Mouse interaction
     */
    describe('Mouse interaction', () => {
      test('Menu is not initially opened', () => {
        const { getMenuElements } = renderCombobox(select);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      test('Clicking the combobox sets focus to the input', () => {
        const { comboboxEl, inputEl } = renderCombobox(select);
        userEvent.click(comboboxEl);
        expect(inputEl).toHaveFocus();
      });

      test('Menu appears when box is clicked', () => {
        const { comboboxEl, getMenuElements } = renderCombobox(select);
        userEvent.click(comboboxEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeNull();
        expect(menuContainerEl).toBeInTheDocument();
      });

      test('Clicking an option sets selection', () => {
        const { openMenu, queryChipsByName, inputEl } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).not.toBeUndefined();
        const option3 = (optionElements as HTMLCollectionOf<HTMLLIElement>)[2];
        act(() => {
          userEvent.click(option3);
        });
        if (select === 'multiple') {
          expect(queryChipsByName('Carrot')).toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Carrot');
        }
      });

      test('Clicking an option fires onChange', () => {
        const onChange = jest.fn();
        const { openMenu } = renderCombobox(select, {
          onChange,
        });
        const { optionElements } = openMenu();
        expect(optionElements).not.toBeUndefined();
        const option3 = (optionElements as HTMLCollectionOf<HTMLLIElement>)[2];
        act(() => {
          userEvent.click(option3);
        });

        if (select === 'multiple') {
          expect(onChange).toHaveBeenCalledWith(
            expect.arrayContaining(['carrot']),
            expect.objectContaining({
              diffType: 'insert',
              value: 'carrot',
            }),
          );
        } else {
          expect(onChange).toHaveBeenCalledWith('carrot');
        }
      });

      testSingleSelect('Clicking selected option closes menu', async () => {
        const { openMenu } = renderCombobox(select, {
          initialValue: 'apple',
        });
        const { optionElements, menuContainerEl } = openMenu();
        expect(optionElements).not.toBeUndefined();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[0]);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      testMultiSelect(
        'Clicking selected option toggles selection & does NOT close menu',
        async () => {
          const { openMenu, queryChipsByName } = renderCombobox(select, {
            initialValue: ['apple'],
          });
          const selectedChip = queryChipsByName('Apple');
          expect(selectedChip).toBeInTheDocument();
          const { optionElements, menuContainerEl } = openMenu();
          expect(optionElements).not.toBeUndefined();

          userEvent.click(
            (optionElements as HTMLCollectionOf<HTMLLIElement>)[0],
          );

          await waitFor(() => {
            expect(selectedChip).not.toBeInTheDocument();
            expect(menuContainerEl).toBeInTheDocument();
          });
        },
      );

      testSingleSelect('Clicking any option closes menu', async () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements, menuContainerEl } = openMenu();
        expect(optionElements).not.toBeUndefined();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[1]);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      testMultiSelect(
        'Clicking any option toggles selection & does NOT close menu',
        async () => {
          const { openMenu, queryChipsByName } = renderCombobox(select);
          const { optionElements, menuContainerEl } = openMenu();
          expect(optionElements).not.toBeUndefined();

          userEvent.click(
            (optionElements as HTMLCollectionOf<HTMLLIElement>)[0],
          );

          await waitFor(() => {
            const selectedChip = queryChipsByName('Apple');
            expect(selectedChip).toBeInTheDocument();
            expect(menuContainerEl).toBeInTheDocument();
          });
        },
      );

      testSingleSelect(
        'Input returned to previous valid selection when menu closes',
        () => {
          const initialValue = 'apple';
          const { inputEl } = renderCombobox(select, {
            initialValue,
          });
          userEvent.type(inputEl, '{backspace}{backspace}{esc}');
          expect(inputEl).toHaveValue('Apple');
        },
      );

      testSingleSelect(
        'Clicking after making a selection should re-open the menu',
        async () => {
          const { comboboxEl, inputEl, openMenu, getMenuElements } =
            renderCombobox(select);
          const { optionElements, menuContainerEl } = openMenu();
          const firstOption = optionElements![0];
          userEvent.click(firstOption);
          await waitForElementToBeRemoved(menuContainerEl);
          userEvent.click(comboboxEl);
          waitFor(() => {
            const { menuContainerEl: newMenuContainerEl } = getMenuElements();
            expect(newMenuContainerEl).not.toBeNull();
            expect(newMenuContainerEl).toBeInTheDocument();
            expect(inputEl).toHaveFocus();
          });
        },
      );

      test('Opening the menu when there is a selection should show all options', () => {
        // See also: 'Pressing Down Arrow when there is a selection shows all menu options'
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { comboboxEl, getMenuElements } = renderCombobox(select, {
          initialValue,
        });
        userEvent.click(comboboxEl);
        const { optionElements } = getMenuElements();
        expect(optionElements).toHaveLength(defaultOptions.length);
      });

      test('First item is highlighted when re-opened after selection is made', async () => {
        const initialValue = 'banana'; // Select an option that is not the first one
        const { comboboxEl, getMenuElements } = renderCombobox('single', {
          initialValue,
        });

        // Open the combobox
        userEvent.click(comboboxEl);
        let { optionElements } = getMenuElements();
        expect(optionElements).toHaveLength(defaultOptions.length);

        // Verify that the first item is highlighted
        expect(
          (optionElements as HTMLCollectionOf<HTMLLIElement>)[0],
        ).toHaveAttribute('aria-selected', 'true');

        // Click the same option again to close the menu
        userEvent.click(
          (optionElements as HTMLCollectionOf<HTMLLIElement>)[1], // Click the second option
        );

        // Open the combobox again
        userEvent.click(comboboxEl);
        optionElements = getMenuElements().optionElements;

        // Verify that the first item is highlighted again
        expect(
          (optionElements as HTMLCollectionOf<HTMLLIElement>)[0],
        ).toHaveAttribute('aria-selected', 'true');
      });

      describe('Clickaway', () => {
        test('Menu closes on click-away', async () => {
          const { containerEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.click(containerEl.parentElement!);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(menuContainerEl).not.toBeInTheDocument();
          expect(containerEl).toContainFocus();
        });

        test("Other click handlers don't fire on click-away", async () => {
          const buttonClickHandler = jest.fn();
          const comboboxJSX = getComboboxJSX({
            multiselect: select === 'multiple',
          });
          const renderResult = render(
            <>
              {comboboxJSX}
              <Button onClick={buttonClickHandler}></Button>
            </>,
          );

          const comboboxEl = renderResult.getByRole('combobox');
          const buttonEl = renderResult.getByRole('button');
          userEvent.click(comboboxEl); // Open menu
          const menuContainerEl = renderResult.queryByRole('listbox');
          userEvent.click(buttonEl); // Click button to close menu
          await waitForElementToBeRemoved(menuContainerEl); // wait for menu to close
          expect(buttonClickHandler).not.toHaveBeenCalled();
        });

        testSingleSelect(
          'Clicking away should keep text if input is a valid value',
          async () => {
            const { inputEl, openMenu } = renderCombobox(select);
            const { menuContainerEl } = openMenu();
            userEvent.type(inputEl, 'Apple');
            userEvent.click(document.body);
            await waitForElementToBeRemoved(menuContainerEl);
            expect(inputEl).toHaveValue('Apple');
          },
        );

        testSingleSelect(
          'Clicking away should NOT keep text if input is not a valid value',
          async () => {
            const { inputEl, openMenu } = renderCombobox(select);
            const { menuContainerEl } = openMenu();
            userEvent.type(inputEl, 'abc');
            userEvent.click(document.body);
            await waitForElementToBeRemoved(menuContainerEl);
            expect(inputEl).toHaveValue('');
          },
        );

        testMultiSelect('Clicking away should keep text as typed', async () => {
          const { inputEl, openMenu } = renderCombobox(select);
          const { menuContainerEl } = openMenu();
          userEvent.type(inputEl, 'abc');
          userEvent.click(document.body);
          await waitForElementToBeRemoved(menuContainerEl);
          expect(inputEl).toHaveValue('abc');
        });
      });

      describe('Click clear button', () => {
        test('Clicking clear all button clears selection', async () => {
          const initialValue =
            select === 'single' ? 'apple' : ['apple', 'banana', 'carrot'];
          const { inputEl, clearButtonEl, queryAllChips } = renderCombobox(
            select,
            {
              initialValue,
            },
          );
          expect(clearButtonEl).not.toBeNull();
          act(() => {
            userEvent.click(clearButtonEl!);
          });
          if (select === 'multiple') {
            expect(queryAllChips()).toHaveLength(0);
          } else {
            await waitFor(() => expect(inputEl).toHaveValue(''));
          }
        });
      });

      describe('Clicking chips', () => {
        testMultiSelect('Clicking chip X button removes option', async () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryChipsByName, queryAllChips } = renderCombobox(select, {
            initialValue,
          });
          const appleChip = queryChipsByName('Apple');
          expect(appleChip).not.toBeNull();
          const appleChipButton = appleChip!.querySelector('button')!;
          userEvent.click(appleChipButton);
          await waitFor(() => {
            expect(appleChip).not.toBeInTheDocument();
            const allChips = queryChipsByName(['Banana', 'Carrot']);
            allChips?.forEach((chip: HTMLElement) =>
              expect(chip).toBeInTheDocument(),
            );
            expect(queryAllChips()).toHaveLength(2);
          });
        });

        testMultiSelect(
          'Clicking chip X button fires onChange with diff',
          async () => {
            const onChange = jest.fn();
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByName } = renderCombobox(select, {
              onChange,
              initialValue,
            });
            const appleChip = queryChipsByName('Apple');
            expect(appleChip).not.toBeNull();
            const appleChipButton = appleChip!.querySelector('button')!;
            userEvent.click(appleChipButton);
            await waitFor(() => {
              expect(appleChip).not.toBeInTheDocument();
              expect(onChange).toHaveBeenCalledWith(
                expect.arrayContaining(['banana', 'carrot']),
                expect.objectContaining({
                  diffType: 'delete',
                  value: 'apple',
                }),
              );
            });
          },
        );

        testMultiSelect('Clicking chip text focuses the chip', () => {
          const initialValue = ['apple', 'banana', 'carrot'];
          const { queryChipsByName, queryAllChips } = renderCombobox(select, {
            initialValue,
          });
          const appleChip = queryChipsByName('Apple');
          userEvent.click(appleChip!);
          expect(appleChip!).toContainFocus();
          expect(queryAllChips()).toHaveLength(3);
        });

        testMultiSelect(
          'Clicking chip X button does nothing when disabled',
          async () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByName, queryAllChips } = renderCombobox(select, {
              initialValue,
              disabled: true,
            });
            const carrotChip = queryChipsByName('Carrot');
            const carrotChipButton = carrotChip!.querySelector('button');
            expect(() => userEvent.click(carrotChipButton!)).toThrow();
            await waitFor(() => {
              expect(queryAllChips()).toHaveLength(3);
            });
          },
        );

        testMultiSelect(
          'Removing a chip sets focus to the next chip',
          async () => {
            const initialValue = ['apple', 'banana', 'carrot'];
            const { queryChipsByName } = renderCombobox(select, {
              initialValue,
            });
            const appleChip = queryChipsByName('Apple');
            const bananaChip = queryChipsByName('Banana');
            const appleChipButton = appleChip!.querySelector('button');
            const bananaChipButton = bananaChip!.querySelector('button');
            userEvent.click(appleChipButton!);
            await waitFor(() => {
              expect(appleChip).not.toBeInTheDocument();
              expect(bananaChipButton!).toHaveFocus();
            });
          },
        );
      });

      test.todo(
        'Clicking in the middle of the input text should set the cursor there',
      );
    });
  });
});
