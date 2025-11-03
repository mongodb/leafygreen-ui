/* eslint-disable jest/no-standalone-expect */
/* eslint jest/expect-expect: ["error", { "assertFunctionNames": ["expect", "expectSelection"] }] */
import { createRef } from 'react';
import {
  act,
  queryByText,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import flatten from 'lodash/flatten';
import isUndefined from 'lodash/isUndefined';

import { RenderMode } from '@leafygreen-ui/popover';
import { eventContainingTargetValue } from '@leafygreen-ui/testing-lib';

import { OptionObject } from '../ComboboxOption/ComboboxOption.types';
import { DropdownWidthBasis } from '../types';
import {
  defaultOptions,
  groupedOptions,
  NestedObject,
  renderCombobox,
  Select,
  testif,
} from '../utils/ComboboxTestUtils';

/**
 * Tests
 */
describe('packages/combobox', () => {
  describe('A11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { container, openMenu } = renderCombobox('single', {
        renderMode: 'portal',
      });
      const { menuContainerEl } = openMenu();
      await waitFor(async () => {
        expect(menuContainerEl).toBeVisible();
        const results = await axe(container);
        expect(results).toHaveNoViolations();
      });
    });
  });

  // DarkMode prop
  test.todo('Darkmode prop applies the correct styles');

  // size prop
  test.todo('Size prop applies the correct styles');

  /**
   * Overflow prop
   */
  test.todo('expand-y');
  test.todo('scroll-x');

  /**
   * dropdownWidthBasis prop
   */
  describe('dropdownWidthBasis', () => {
    test('applies max-content width when set to "option"', () => {
      const { openMenu } = renderCombobox('single', {
        dropdownWidthBasis: DropdownWidthBasis.Option,
      });
      const { menuContainerEl } = openMenu();

      expect(menuContainerEl).toBeInTheDocument();
      // The Popover wrapper should have the autoWidthStyles applied
      const popoverWrapper = menuContainerEl?.parentElement?.parentElement;
      expect(popoverWrapper).toHaveStyle({
        width: 'max-content',
      });
    });

    test('renders without max-content width when set to "trigger"', () => {
      const { openMenu } = renderCombobox('single', {
        dropdownWidthBasis: DropdownWidthBasis.Trigger,
      });
      const { menuContainerEl } = openMenu();

      expect(menuContainerEl).toBeInTheDocument();
      // The Popover wrapper should not have max-content width
      const popoverWrapper = menuContainerEl?.parentElement?.parentElement;
      const computedStyle = window.getComputedStyle(popoverWrapper!);
      expect(computedStyle.width).not.toBe('max-content');
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

    test('accepts a portalRef', () => {
      const portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);
      const portalRef = createRef<HTMLElement>();
      const { openMenu } = renderCombobox(select, {
        renderMode: RenderMode.Portal,
        portalContainer,
        portalRef,
      });
      openMenu();
      expect(portalRef.current).toBeDefined();
      expect(portalRef.current).toBe(portalContainer);
    });

    describe('Basic rendering', () => {
      // Label prop
      test('Label is rendered', () => {
        const { labelEl } = renderCombobox(select, { label: 'Some label' });
        expect(labelEl).toBeInTheDocument();
      });

      // Description prop
      test('Description is rendered', () => {
        const description = 'Lorem ipsum';
        const { queryByText } = renderCombobox(select, { description });
        const descriptionEl = queryByText(description);
        expect(descriptionEl).not.toBeNull();
        expect(descriptionEl).toBeInTheDocument();
      });

      // Placeholder prop
      test('Placeholder is rendered', () => {
        const placeholder = 'Placeholder text';
        const { inputEl } = renderCombobox(select, { placeholder });
        expect(inputEl.placeholder).toEqual(placeholder);
      });

      // errorMessage & state prop
      test('Error message is rendered when state == `error`', () => {
        const errorMessage = 'Some error message';
        const { queryByText } = renderCombobox(select, {
          errorMessage,
          state: 'error',
        });
        const errorEl = queryByText(errorMessage);
        expect(errorEl).not.toBeNull();
        expect(errorEl).toBeInTheDocument();
      });

      test('Error message is not rendered when state !== `error`', () => {
        const errorMessage = 'Some error message';
        const { queryByText } = renderCombobox(select, {
          errorMessage,
        });
        const errorEl = queryByText(errorMessage);
        expect(errorEl).not.toBeInTheDocument();
      });

      // Clear button
      test('Clear button is rendered when selection is set', () => {
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          initialValue,
        });
        expect(clearButtonEl).toBeInTheDocument();
      });

      test('Clear button is not rendered when there is no selection', () => {
        const { clearButtonEl } = renderCombobox(select);
        expect(clearButtonEl).not.toBeInTheDocument();
      });

      test('Clear button is not rendered when clearable == `false`', () => {
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          initialValue,
          clearable: false,
        });
        expect(clearButtonEl).not.toBeInTheDocument();
      });

      test('`inputValue` prop is rendered in the textbox', () => {
        const { inputEl } = renderCombobox(select, {
          inputValue: 'abc',
        });
        expect(inputEl).toHaveValue('abc');
      });
    });

    /**
     * Option Rendering
     */
    describe('Option rendering', () => {
      test('All options render in the menu', () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements).toHaveLength(defaultOptions.length);
      });

      test('option accepts data attribute', () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements?.[0].getAttribute('data-testid')).toBe(
          defaultOptions[0].value,
        );
      });

      test('option renders description', () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        expect(optionElements?.[0]).toHaveTextContent(
          defaultOptions[0].description as string,
        );
      });

      test('option fires onClick callback', () => {
        const onClick = jest.fn();

        const options: Array<OptionObject> = [
          {
            value: 'paragraph',
            displayName: 'display name',
            isDisabled: false,
            onClick,
          },
        ];

        const { openMenu } = renderCombobox(select, { options });
        const { optionElements } = openMenu();
        const [optionEl] = Array.from(optionElements!);
        userEvent.click(optionEl as Element);
        expect(onClick).toHaveBeenCalledTimes(1);
      });

      test('option onClick callback is called with the click event and option value', () => {
        const onClick = jest.fn();

        const options: Array<OptionObject> = [
          {
            value: 'paragraph',
            displayName: 'display name',
            isDisabled: false,
            onClick,
          },
        ];

        const { openMenu } = renderCombobox(select, { options });
        const { optionElements } = openMenu();
        const [optionEl] = Array.from(optionElements!);
        userEvent.click(optionEl as Element);
        expect(onClick).toHaveBeenCalledWith(
          expect.objectContaining({ type: 'click' }),
          options[0].value,
        );
      });

      test('Options render with provided displayName', async () => {
        const { openMenu } = renderCombobox(select);
        const { optionElements } = openMenu();
        // Note on `foo!` operator https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
        Array.from(optionElements!).forEach((optionEl, index) => {
          expect(optionEl).toHaveTextContent(defaultOptions[index].displayName);
        });
      });

      test('Option is rendered with provided value when no displayName is provided', () => {
        const options = [{ value: 'abc-def' }];
        /// @ts-expect-error `options` will not match the expected type
        const { openMenu } = renderCombobox(select, { options });
        const { optionElements } = openMenu();
        const [optionEl] = Array.from(optionElements!);
        expect(optionEl).toHaveTextContent('abc-def');
      });

      test('Options with long names are rendered with the full text', () => {
        const displayName = `Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.`;
        const options: Array<OptionObject> = [
          {
            value: 'paragraph',
            displayName,
            isDisabled: false,
          },
        ];

        const { openMenu } = renderCombobox(select, { options });
        const { optionElements } = openMenu();
        const [optionEl] = Array.from(optionElements!);
        expect(optionEl).toHaveTextContent(displayName);
      });

      test('Disabled options are still rendered in the menu', () => {
        const options: Array<OptionObject> = [
          ...defaultOptions,
          {
            value: 'disabled',
            displayName: 'Disabled',
            isDisabled: true,
          },
        ];
        const { openMenu } = renderCombobox(select, { options });
        const { optionElements } = openMenu();
        expect(optionElements).toHaveLength(defaultOptions.length + 1);
      });

      test('Disabled option is not selectable with the mouse', () => {
        const options: Array<OptionObject> = [
          {
            value: 'disabled',
            displayName: 'Disabled',
            isDisabled: true,
          },
          ...defaultOptions,
        ];
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { openMenu, inputEl, queryChipsByName } = renderCombobox(select, {
          options,
          initialValue,
        });
        const { optionElements } = openMenu();
        const disabledOption = optionElements?.[0];
        userEvent.click(disabledOption as HTMLLIElement);
        if (select === 'multiple') {
          expect(queryChipsByName('Apple')).toBeInTheDocument();
          expect(queryChipsByName('Disabled')).not.toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Apple');
        }
      });

      test('Disabled option is not selectable with the keyboard', () => {
        const options: Array<OptionObject> = [
          {
            value: 'disabled',
            displayName: 'Disabled',
            isDisabled: true,
          },
          ...defaultOptions,
        ];
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { openMenu, inputEl, queryChipsByName } = renderCombobox(select, {
          options,
          initialValue,
        });
        const { optionElements } = openMenu();
        const disabledOption = optionElements![0];
        userEvent.type(disabledOption, `{enter}`);
        if (select === 'multiple') {
          expect(queryChipsByName('Apple')).toBeInTheDocument();
          expect(queryChipsByName('Disabled')).not.toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Apple');
        }
      });

      // Grouped Options
      describe('Grouped Options', () => {
        test('Grouped items should render', () => {
          const { openMenu } = renderCombobox(select, {
            options: groupedOptions,
          });
          const { menuContainerEl } = openMenu();

          flatten(
            groupedOptions.map(({ children }: NestedObject) => children),
          ).forEach((option: OptionObject | string) => {
            const displayName =
              typeof option === 'string' ? option : option.displayName;
            const optionEl = queryByText(menuContainerEl!, displayName);
            expect(optionEl).toBeInTheDocument();
          });
        });

        test('Grouped item labels should render', () => {
          const { openMenu } = renderCombobox(select, {
            options: groupedOptions,
          });
          const { menuContainerEl } = openMenu();

          const [fruitLabel, veggieLabel] = [
            queryByText(menuContainerEl!, 'Fruit'),
            queryByText(menuContainerEl!, 'Vegetables'),
          ];
          expect(fruitLabel).toBeInTheDocument();
          expect(veggieLabel).toBeInTheDocument();
        });
      });
    });

    describe('When disabled', () => {
      test(`Input element renders with aria-disabled and readonly attributes but not disabled attribute when disabled prop is set`, () => {
        const { inputEl } = renderCombobox(select, {
          disabled: true,
        });
        expect(inputEl.getAttribute('aria-disabled')).toBeTruthy();
        expect(inputEl.hasAttribute('readonly')).toBeTruthy();
        expect(inputEl.getAttribute('disabled')).toBeFalsy();
      });

      // disabled prop
      test('Combobox is not clickable when `disabled`', () => {
        const { comboboxEl, getMenuElements } = renderCombobox(select, {
          disabled: true,
        });

        userEvent.click(comboboxEl);
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });

      // TODO: Fix this test. Combobox SHOULD be focusable
      test('Combobox is not focusable when `disabled`', () => {
        renderCombobox(select, { disabled: true });
        userEvent.type(document.body, '{tab}');
        expect(document.body).toHaveFocus();
      });
    });

    /**
     * Initial Value
     */
    describe('#initialValue prop', () => {
      testSingleSelect('Initial value prop renders text input value', () => {
        const initialValue = 'apple';
        const { inputEl } = renderCombobox(select, { initialValue });
        expect(inputEl).toHaveValue('Apple');
      });

      testSingleSelect(
        'Initial value prop renders truncated long text input value',
        () => {
          const displayName = `Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.`;
          const options: Array<OptionObject> = [
            {
              value: 'paragraph',
              displayName,
              isDisabled: false,
            },
            ...defaultOptions,
          ];
          const initialValue = 'paragraph';
          const { inputEl } = renderCombobox(select, { initialValue, options });
          expect(inputEl).toHaveValue(displayName);
          expect(inputEl.scrollWidth).toBeGreaterThanOrEqual(
            inputEl.clientWidth,
          );
        },
      );

      testMultiSelect('Initial value prop renders chips', () => {
        const initialValue = ['apple', 'banana'];
        const { queryChipsByName, queryAllChips } = renderCombobox(select, {
          initialValue,
        });
        waitFor(() => {
          const allChips = queryChipsByName(['Apple', 'Banana']);
          allChips?.forEach((chip: HTMLElement) =>
            expect(chip).toBeInTheDocument(),
          );
          expect(queryAllChips()).toHaveLength(2);
        });
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
            selectedElements?.every((element: HTMLElement) =>
              element?.querySelector('input'),
            ),
          ).toBeTruthy();
        },
      );
    });

    /**
     * Input element
     */
    describe('Typing (Input interaction)', () => {
      test('Typing any character updates the input', () => {
        const { inputEl } = renderCombobox(select);
        userEvent.type(inputEl, 'zy');
        expect(inputEl).toHaveValue('zy');
      });

      test('Initial value prop renders truncated long text input value', () => {
        const displayName = `Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur.`;
        const { inputEl } = renderCombobox(select);
        userEvent.type(inputEl, displayName);
        expect(inputEl).toHaveValue(displayName);
        expect(inputEl.scrollWidth).toBeGreaterThanOrEqual(inputEl.clientWidth);
      });

      test('Typing does not fire onChange callback', () => {
        const onChange = jest.fn();
        const { inputEl } = renderCombobox(select, { onChange });
        userEvent.type(inputEl, 'Apple');
        expect(onChange).not.toHaveBeenCalled();
      });

      test('Typing fires onInputChange callback', () => {
        const onInputChange = jest.fn();
        const { inputEl } = renderCombobox(select, { onInputChange });
        userEvent.type(inputEl, 'abc');
        expect(onInputChange).toHaveBeenCalledWith(
          eventContainingTargetValue('abc'),
        );
      });

      test('Blurring the input after typing a valid value fires onChange', async () => {
        const onChange = jest.fn();
        const { inputEl, openMenu } = renderCombobox(select, { onChange });
        const { menuContainerEl } = openMenu();
        userEvent.type(inputEl, 'Apple');
        userEvent.tab();
        await waitForElementToBeRemoved(menuContainerEl);
        if (select === 'multiple') {
          expect(onChange).toHaveBeenCalledWith(['apple'], expect.anything());
        } else {
          expect(onChange).toHaveBeenCalledWith('apple');
        }
      });

      /**
       * Controlled
       * (i.e. `value` prop is set)
       */
      describe('When value is controlled', () => {
        test('Typing any character updates the input', () => {
          const value = select === 'multiple' ? [] : '';
          const { inputEl } = renderCombobox(select, {
            value,
          });
          expect(inputEl).toHaveValue('');
          userEvent.type(inputEl, 'z');
          expect(inputEl).toHaveValue('z');
        });

        testSingleSelect('Text input renders with value update', () => {
          let value = 'apple';
          const { inputEl, rerenderCombobox } = renderCombobox(select, {
            value,
          });
          expect(inputEl).toHaveValue('Apple');
          value = 'banana';
          rerenderCombobox({ value });
          expect(inputEl).toHaveValue('Banana');
        });

        testSingleSelect(
          'Invalid option passed as value is not selected',
          () => {
            const value = 'jellybean';
            const { inputEl } = renderCombobox(select, { value });
            expect(inputEl).toHaveValue('');
          },
        );

        testMultiSelect('Updating `value` updates the chips', () => {
          let value = ['apple', 'banana'];
          const { queryChipsByName, queryAllChips, rerenderCombobox } =
            renderCombobox(select, {
              value,
            });
          waitFor(() => {
            const allChips = queryChipsByName(['Apple', 'Banana']);
            allChips?.forEach((chip: HTMLElement) =>
              expect(chip).toBeInTheDocument(),
            );
            expect(queryAllChips()).toHaveLength(2);
            value = ['banana', 'carrot'];
            rerenderCombobox({ value });
            waitFor(() => {
              const allChips = queryChipsByName(['Carrot', 'Banana']);
              allChips?.forEach((chip: HTMLElement) =>
                expect(chip).toBeInTheDocument(),
              );
              expect(queryAllChips()).toHaveLength(2);
            });
          });
        });

        testMultiSelect('Invalid options are not selected', () => {
          const value = ['apple', 'jellybean'];
          const { queryChipsByName, queryAllChips } = renderCombobox(select, {
            value,
          });
          waitFor(() => {
            const allChips = queryChipsByName(['Apple']);
            allChips?.forEach((chip: HTMLElement) =>
              expect(chip).toBeInTheDocument(),
            );
            expect(queryChipsByName('Jellybean')).not.toBeInTheDocument();
            expect(queryAllChips()).toHaveLength(1);
          });
        });
      });
    });

    describe('Programmatic interaction', () => {
      test('Menu does not open when input is focused programmatically', () => {
        const { inputEl, getMenuElements } = renderCombobox(select);
        act(() => inputEl.focus());
        const { menuContainerEl } = getMenuElements();
        expect(menuContainerEl).not.toBeInTheDocument();
      });
    });

    /**
     * Filtered options
     */
    test('Providing filteredOptions limits the rendered options', () => {
      const { openMenu } = renderCombobox(select, {
        filteredOptions: ['apple'],
      });
      const { optionElements } = openMenu();
      expect(optionElements!.length).toEqual(1);
    });

    /**
     * onClear
     */
    describe('onClear', () => {
      test('Clear button calls onClear callback', () => {
        const initialValue =
          select === 'multiple' ? ['apple', 'banana'] : 'apple';
        const onClear = jest.fn();
        const { clearButtonEl } = renderCombobox(select, {
          initialValue,
          onClear,
        });
        userEvent.click(clearButtonEl!);
        expect(onClear).toHaveBeenCalled();
      });

      test('Clear button does not force the menu to reopen', () => {
        const initialValue =
          select === 'multiple' ? ['apple', 'banana'] : 'apple';
        const onClear = jest.fn();
        const { clearButtonEl, queryByRole } = renderCombobox(select, {
          initialValue,
          onClear,
        });
        expect(queryByRole('listbox')).not.toBeInTheDocument();
        userEvent.click(clearButtonEl!);
        expect(queryByRole('listbox')).not.toBeInTheDocument();
      });

      test('Clear button clears the value of the input', async () => {
        const initialValue =
          select === 'multiple' ? ['apple', 'banana'] : 'apple';
        const { inputEl, clearButtonEl, queryChipsByName } = renderCombobox(
          select,
          {
            initialValue,
          },
        );

        if (select === 'multiple') {
          expect(queryChipsByName('Apple')).toBeInTheDocument();
        } else {
          expect(inputEl).toHaveValue('Apple');
        }

        userEvent.click(clearButtonEl!);
        await waitFor(() => {
          expect(inputEl).toHaveValue('');
        });
      });

      test('Clear button calls onChange callback', () => {
        const onChange = jest.fn();
        const initialValue =
          select === 'multiple' ? ['apple', 'banana'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          initialValue,
          onChange,
        });

        userEvent.click(clearButtonEl!);

        if (select === 'multiple') {
          expect(onChange).toHaveBeenCalledWith(
            [],
            expect.objectContaining({
              diffType: 'delete',
              value: ['apple', 'banana'],
            }),
          );
        } else {
          expect(onChange).toHaveBeenCalledWith(null);
        }
      });

      test('Focus returns to input element after clear button is clicked', async () => {
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { inputEl, clearButtonEl } = renderCombobox(select, {
          initialValue,
        });
        userEvent.click(clearButtonEl!);

        await waitFor(() => {
          expect(inputEl).toHaveFocus();
        });
      });
    });

    /**
     * onChange
     */
    describe('onChange', () => {
      test('Selecting an option calls onChange callback', async () => {
        const onChange = jest.fn();
        const { openMenu } = renderCombobox(select, { onChange });
        const { optionElements } = openMenu();
        userEvent.click(optionElements![0]);
        await waitFor(() => {
          expect(onChange).toHaveBeenCalled();
        });
      });

      test('Clearing selection calls onChange callback', () => {
        const onChange = jest.fn();
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          onChange,
          initialValue,
        });
        userEvent.click(clearButtonEl!);
        expect(onChange).toHaveBeenCalled();
      });

      test('Closing the menu without making a selection does not call onChange callback', async () => {
        const onChange = jest.fn();
        const { containerEl, openMenu } = renderCombobox(select, { onChange });
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(onChange).not.toHaveBeenCalled();
      });
    });

    /**
     * onFilter
     */
    describe('onFilter', () => {
      test('Typing calls onFilter callback on each keystroke', () => {
        const onFilter = jest.fn();
        const { inputEl } = renderCombobox(select, { onFilter });
        userEvent.type(inputEl, 'app');
        expect(onFilter).toHaveBeenCalledTimes(3);
      });
      test('Clearing selection calls onFilter callback once', () => {
        const onFilter = jest.fn();
        const initialValue = select === 'multiple' ? ['apple'] : 'apple';
        const { clearButtonEl } = renderCombobox(select, {
          onFilter,
          initialValue,
        });
        userEvent.click(clearButtonEl!);
        expect(onFilter).toHaveBeenCalledTimes(1);
      });
      test('Selecting an option does not call onFilter callback', () => {
        const onFilter = jest.fn();
        const { openMenu } = renderCombobox(select, { onFilter });
        const { optionElements } = openMenu();
        userEvent.click((optionElements as HTMLCollectionOf<HTMLLIElement>)[0]);
        expect(onFilter).not.toHaveBeenCalled();
      });
      test('Closing the menu does not call onFilter callback', async () => {
        const onFilter = jest.fn();
        const { containerEl, openMenu } = renderCombobox(select, { onFilter });
        const { menuContainerEl } = openMenu();
        userEvent.click(containerEl.parentElement!);
        await waitForElementToBeRemoved(menuContainerEl);
        expect(onFilter).not.toHaveBeenCalled();
      });
    });

    /**
     * Search State messages & filteredOptions
     */
    describe('Search states', () => {
      test('Menu renders empty state message when there are no options provided', () => {
        const searchEmptyMessage = 'Empty state message';
        const { openMenu } = renderCombobox(select, {
          searchEmptyMessage,
          options: [],
        });
        const { menuContainerEl } = openMenu();
        const emptyStateTextEl = queryByText(
          menuContainerEl!,
          searchEmptyMessage,
        );
        expect(emptyStateTextEl).toBeInTheDocument();
      });

      // Unsure if this is the desired behavior
      // eslint-disable-next-line jest/no-disabled-tests
      test.skip('Menu renders empty state message when filtered options is empty', () => {
        const searchEmptyMessage = 'Empty state message';
        const { openMenu } = renderCombobox(select, {
          searchEmptyMessage,
          filteredOptions: [],
        });
        const { menuContainerEl } = openMenu();
        const emptyStateTextEl = queryByText(
          menuContainerEl!,
          searchEmptyMessage,
        );
        expect(emptyStateTextEl).toBeInTheDocument();
      });

      test('Menu renders loading state message `searchState` == `loading`', () => {
        const searchLoadingMessage = 'Loading state message';
        const { openMenu } = renderCombobox(select, {
          searchLoadingMessage,
          searchState: 'loading',
        });
        const { menuContainerEl } = openMenu();
        const loadingStateTextEl = queryByText(
          menuContainerEl!,
          searchLoadingMessage,
        );
        expect(loadingStateTextEl).toBeInTheDocument();
      });

      test('Menu renders error state message `searchState` == `error`', () => {
        const searchErrorMessage = 'Error state message';
        const { openMenu } = renderCombobox(select, {
          searchErrorMessage,
          searchState: 'error',
        });
        const { menuContainerEl } = openMenu();
        const errorStateTextEl = queryByText(
          menuContainerEl!,
          searchErrorMessage,
        );
        expect(errorStateTextEl).toBeInTheDocument();
      });
    });
  });
});
