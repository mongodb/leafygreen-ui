import React from 'react';
import {
  render,
  queryByText,
  queryByAttribute,
  queryAllByAttribute,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, ComboboxOption } from '.';
import { BaseComboboxProps, ComboboxMultiselectProps } from './Combobox.types';
import { OptionObject } from './util';
import { isArray, isNull } from 'lodash';

export type Select = 'single' | 'multiple';
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

/**
 * @param props Combobox props
 * @returns Combobox JSX
 */
export const getComboboxJSX = (props?: renderComboboxProps) => {
  const label = props?.label ?? 'Some label';
  const options = props?.options ?? defaultOptions;
  return (
    <Combobox
      data-testid="combobox-container"
      label={label}
      multiselect={props?.multiselect ?? false}
      {...props}
    >
      {options.map(option => {
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

/**
 * Renders a combobox
 * @param select `'single' | 'multiple'`
 * @param props `renderComboboxProps`
 * @returns Object of combobox elements & utility functions
 */
export function renderCombobox<T extends Select>(
  select: T = 'single' as T,
  props?: renderComboboxProps,
) {
  const multiselect = select === 'multiple';
  const options = props?.options || defaultOptions;
  props = { options, multiselect, ...props };
  const renderResult = render(getComboboxJSX(props));
  const containerEl = renderResult.getByTestId('combobox-container');
  const labelEl = containerEl.getElementsByTagName('label')[0];
  const comboboxEl = renderResult.getByRole('combobox');
  const inputEl = containerEl.getElementsByTagName('input')[0];
  const clearButtonEl = renderResult.queryByLabelText('Clear selection');

  /**
   * Since menu elements won't exist until component is interacted with,
   * call this after opening the menu.
   * @returns Object of menu elements
   */
  function getMenuElements() {
    const menuContainerEl = renderResult.queryByRole('listbox');
    const popoverEl = menuContainerEl?.firstChild;
    const menuEl = menuContainerEl?.getElementsByTagName('ul')[0];
    const optionElements = menuContainerEl?.getElementsByTagName('li');
    const selectedElements = menuEl
      ? select === 'single'
        ? queryByAttribute('aria-selected', menuEl, 'true')
        : queryAllByAttribute('aria-selected', menuEl, 'true')
      : undefined;

    return {
      menuContainerEl,
      popoverEl,
      menuEl,
      optionElements,
      selectedElements: selectedElements as
        | (T extends 'single' ? HTMLElement : Array<HTMLElement>)
        | null,
    };
  }

  /**
   * Opens the menu by simulating a click on the combobox.
   * @returns Object of menu elements
   */
  const openMenu = () => {
    userEvent.click(comboboxEl);
    return getMenuElements();
  };

  /**
   * Rerenders the combobox with new props
   * @param newProps
   * @returns
   */
  const rerenderCombobox = (newProps: renderComboboxProps) =>
    renderResult.rerender(getComboboxJSX({ ...props, ...newProps }));

  /**
   * Get the chip(s) with the provided display name(s)
   * @param names: `string` | `Array<string>`
   * @returns A single HTMLElement or array of HTMLElements
   */
  function queryChipsByName(names: string): HTMLElement | null;
  function queryChipsByName(names: Array<string>): Array<HTMLElement> | null;
  function queryChipsByName(
    names: string | Array<string>,
  ): HTMLElement | Array<HTMLElement> | null {
    if (typeof names === 'string') {
      const span = queryByText(comboboxEl, names);
      return span ? span.parentElement : null;
    } else {
      const spans = names
        .map((name: any) => queryByText(comboboxEl, name))
        .filter(span => !isNull(span))
        .map(span => span?.parentElement);
      return spans.length > 0 ? (spans as Array<HTMLElement>) : null;
    }
  }

  /**
   * @returns all chip elements
   */
  function queryAllChips(): Array<HTMLElement> {
    return queryAllByAttribute(
      'data-leafygreen-ui',
      containerEl,
      'combobox-chip',
    );
  }

  /**
   * Asserts that option(s) with the provided display name(s) are selected
   * @param expectedSelection The option(s) expected to be selected
   * @param exact Is the expected selection the exact selection or just a subset?
   * @returns
   */
  function expectSelection(
    expectedSelection: string | Array<string> | null,
    exact?: boolean,
  ): void {
    switch (select) {
      case 'single':
        {
          if (isArray(expectedSelection)) {
            throw new Error('Selection must be a string for single select');
          }

          if (expectedSelection) {
            expect(inputEl).toHaveValue(expectedSelection);
          } else {
            expect(inputEl).toHaveValue('');
          }
        }
        break;
      case 'multiple':
        {
          if (isArray(expectedSelection)) {
            waitFor(() => {
              const allChips = queryChipsByName(expectedSelection);
              allChips?.forEach(chip => expect(chip).toBeInTheDocument());

              if (exact) {
                expect(queryAllChips()).toHaveLength(expectedSelection.length);
              }
            });
          } else if (!isNull(expectedSelection)) {
            waitFor(() => {
              const selectionChip = queryChipsByName(expectedSelection);
              expect(selectionChip).not.toBeNull();
              expect(selectionChip).toBeInTheDocument();

              if (exact) {
                expect(queryAllChips()).toHaveLength(1);
              }
            });
          } else {
            expect(queryAllChips()).toHaveLength(0);
          }
        }
        break;
    }
  }

  return {
    ...renderResult,
    rerenderCombobox,
    queryChipsByName,
    queryAllChips,
    getMenuElements,
    openMenu,
    expectSelection,
    containerEl,
    labelEl,
    comboboxEl,
    inputEl,
    clearButtonEl,
  };
}

/**
 * Conditionally runs a test
 * @param condition
 * @returns `test`
 */
export const testif = (condition: boolean) => (condition ? test : test.skip);
