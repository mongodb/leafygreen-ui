import React from 'react';
import {
  render,
  queryByText,
  queryByAttribute,
  queryAllByAttribute,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Combobox, ComboboxGroup, ComboboxOption } from '.';
import { BaseComboboxProps, ComboboxMultiselectProps } from './Combobox.types';
import { OptionObject } from './util';
import { isNull } from 'lodash';

export interface NestedObject {
  label: string;
  children: Array<string | OptionObject>;
}

export type Select = 'single' | 'multiple';
type renderComboboxProps = {
  options?: Array<string | OptionObject | NestedObject>;
} & BaseComboboxProps &
  ComboboxMultiselectProps<boolean>;

export const defaultOptions: Array<OptionObject> = [
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

export const groupedOptions: Array<NestedObject> = [
  {
    label: 'Fruit',
    children: [
      {
        value: 'apple',
        displayName: 'Apple',
      },
      {
        value: 'banana',
        displayName: 'Banana',
      },
    ],
  },
  {
    label: 'Vegetables',
    children: [
      {
        value: 'carrot',
        displayName: 'Carrot',
      },
      {
        value: 'eggplant',
        displayName: 'Eggplant',
      },
    ],
  },
];

/**
 * @param props Combobox props
 * @returns Combobox JSX
 */
export const getComboboxJSX = (props?: renderComboboxProps) => {
  const isNested = (object: any): object is NestedObject =>
    object.label && object.children;

  const renderOption = (option: NestedObject | OptionObject | string) => {
    if (isNested(option)) {
      return (
        <ComboboxGroup key={option.label} label={option.label}>
          {option.children.map(renderOption)}
        </ComboboxGroup>
      );
    } else {
      const value = typeof option === 'string' ? option : option.value;
      const displayName =
        typeof option === 'string' ? undefined : option.displayName;

      return (
        <ComboboxOption key={value} value={value} displayName={displayName} />
      );
    }
  };

  const label = props?.label ?? 'Some label';
  const options = props?.options ?? defaultOptions;
  return (
    <Combobox
      data-testid="combobox-container"
      label={label}
      multiselect={props?.multiselect ?? false}
      {...props}
    >
      {options.map(renderOption)}
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

  return {
    ...renderResult,
    rerenderCombobox,
    queryChipsByName,
    queryAllChips,
    getMenuElements,
    openMenu,
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
