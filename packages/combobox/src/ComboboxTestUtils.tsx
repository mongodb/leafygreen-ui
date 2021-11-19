import React from 'react';
import {
  render,
  queryByText,
  queryByAttribute,
  queryAllByAttribute,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, ComboboxOption } from '.';
import { BaseComboboxProps, ComboboxMultiselectProps } from './Combobox.types';
import { OptionObject } from './util';
import { isArray } from 'lodash';

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

  /**
   * Since menu elements won't exist until component is interacted with,
   * call this after opening the menu.
   * @returns Object of menu elements
   */
  function getMenuElements() {
    const menuContainerEl = renderResult.getByRole('listbox');
    const popoverEl = menuContainerEl?.firstChild;
    const menuEl = menuContainerEl?.getElementsByTagName('ul')[0];
    const optionElements = menuContainerEl?.getElementsByTagName('li');
    const selectedElements =
      select === 'single'
        ? queryByAttribute('aria-selected', menuEl, 'true')
        : queryAllByAttribute('aria-selected', menuEl, 'true');

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
  function queryChipsByName(names: string): HTMLElement;
  function queryChipsByName(names: Array<string>): Array<HTMLElement>;
  function queryChipsByName(names: any): any {
    return typeof names === 'string'
      ? queryByText(comboboxEl, names)
      : names.map((name: any) => queryByText(comboboxEl, name));
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

/**
 * Conditionally runs a test
 * @param condition
 * @returns `test`
 */
export const testif = (condition: boolean) => (condition ? test : test.skip);
