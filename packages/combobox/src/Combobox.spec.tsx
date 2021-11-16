import React from 'react';
import { render } from '@testing-library/react';
import { Combobox, ComboboxOption } from '.';
import { axe } from 'jest-axe';
import { ComboboxProps } from './Combobox.types';
import { OptionObject } from './util';

/**
 * Setup
 */

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type renderComboboxProps = {
  label?: string;
  options?: Array<string>; // | Array<OptionObject>
}; // & ComboboxProps<true | false>

function renderCombobox(props: renderComboboxProps) {
  const labelText = props.label || 'Some label';
  const options = props.options || ['apple', 'banana', 'carrot'];

  const renderResult = render(
    <Combobox data-testid="combobox-container" label={labelText} {...props}>
      {options.map(option => (
        <ComboboxOption key={option} value={option} />
      ))}
    </Combobox>,
  );
  const container = renderResult.getByTestId('combobox-container');
  const label = container.getElementsByTagName('label')[0];
  const combobox = renderResult.getByRole('combobox');
  const input = container.getElementsByTagName('input')[0];
  return {
    ...renderResult,
    labelText,
    options,
    container,
    label,
    combobox,
    input,
  };
}

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

  describe.each([['single'], ['multiple']])('%s select', select => {
    // Rendering
    test('Label is rendered', () => {
      const { label } = renderCombobox();
      expect(label).toBeInTheDocument();
    });

    test.todo('Description is rendered');

    describe('on error', () => {
      test.todo('Error message is rendered');
      test.todo('Error Icon is rendered');
    });

    if (select === 'single') {
      test.todo('Text input renders with initial value');
      test.todo('Menu renders with checkmarks');
    }

    if (select === 'multiple') {
      test.todo('Chips render with initial value');
      test.todo('Menu renders with checkboxes');
    }

    describe('When value is controlled', () => {
      test.todo('Invalid options passed as value are not selected');

      if (select === 'multiple') {
        test.todo('Updating `value` updates the chips');

        describe('and invalid options are passed as value', () => {
          test.todo('Invalid options are not selected');
          test.todo('Removing all options via chip buttons clears selection');
        });
      }
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

    test.todo('Clicking an option sets selection');

    if (select === 'single') {
      test.todo('Input value changes when a selection is made');
      test.todo('Input value is set to selection value when menu closes');
    }

    if (select === 'multiple') {
      test.todo('Left & Right arrow keys highlight chips');
    }
  });

  describe('Chips', () => {
    test.todo('Chips truncate properly...');
  });
});
