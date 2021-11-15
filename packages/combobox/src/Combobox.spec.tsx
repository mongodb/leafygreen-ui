import React from 'react';
import { render } from '@testing-library/react';
import { Combobox, ComboboxOption } from '.';
import { axe } from 'jest-axe';

function renderBasicCheckbox(props = {}) {
  const utils = render(
    <Combobox data-testid="combobox" label="Some Label" {...props}>
      <ComboboxOption value="Apple" />
      <ComboboxOption value="Banana" />
      <ComboboxOption value="Carrot" />
    </Combobox>,
  );
  const combobox = utils.getByTestId('combobox');
  return { ...utils, combobox };
}

describe('packages/combobox', () => {
  describe('A11y', () => {
    test('does not have basic accessibility violations', async () => {
      const { combobox } = renderBasicCheckbox();
      const results = await axe(combobox);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Rendering', () => {
    const { combobox } = renderBasicCheckbox();

    test.todo('Label is rendered');
    test.todo('Description is rendered');

    describe('on error', () => {
      test.todo('Error message is rendered');
      test.todo('Error Icon is rendered');
    });

    describe('Single select', () => {
      test.todo('Text input renders with initial value');
      test.todo('Menu renders with checkmarks');
    });

    describe('Multi select', () => {
      test.todo('Chips render with initial value');
      test.todo('Menu renders with checkboxes');
    });
  });

  describe('Interaction', () => {
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

    describe('Single select', () => {
      test.todo('Input value changes when a selection is made');
      test.todo('Input value is set to selection value when menu closes');
    });

    describe('Multi select', () => {
      test.todo('Left & Right arrow keys highlight chips');
    });
  });

  describe('Chips', () => {
    test.todo('Chips truncate properly...');
  });
});
