/* eslint-disable jest/no-standalone-expect, jest/no-disabled-tests, jest/expect-expect */
import React from 'react';
import { render, queryByText } from '@testing-library/react';
import { Combobox, ComboboxOption } from '.';
import { axe } from 'jest-axe';
import { BaseComboboxProps, ComboboxMultiselectProps } from './Combobox.types';
import { OptionObject } from './util';
import { isUndefined } from 'lodash';

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

  const rerenderCombobox = (newProps: renderComboboxProps) =>
    renderResult.rerender(getComboboxJSX({ ...props, ...newProps }));

  const getChipsByName = (names: Array<string>): Array<HTMLElement> =>
    names.map(name => queryByText(comboboxEl, name));

  return {
    ...renderResult,
    rerenderCombobox,
    getChipsByName,
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
      const { container } = renderCombobox();
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

    // Rendering
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
    testSingleSelect('Menu renders with checkmarks');

    testMultiSelect('Chips render with initial value', () => {
      const initialValue = ['apple', 'banana'];
      const { getChipsByName } = renderCombobox(select, { initialValue });
      getChipsByName(['Apple', 'Banana']).forEach(chip =>
        expect(chip).toBeInTheDocument(),
      );
    });
    testMultiSelect('Menu renders with checkboxes');

    describe('When value is controlled', () => {
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
    });

    // Interaction
    test.todo('Menu appears when box is clicked');
    test.todo('Menu appears when input is focused');
    test.todo('Menu closes on click-away');
    test.todo('Menu does not close on interaction with the menu'); // ensure no close-on-blur
    test.todo('Menu options list narrows when text is entered');
    test.todo('Up & Down arrow keys focus menu options');
    test.todo('Down arrow key opens menu when its closed');
    test.todo('Tab key closes menu');
    test.todo('Escape key closes menu');
    test.todo('Enter key selects focused option');
    test.todo('Space key selects focused option');

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
