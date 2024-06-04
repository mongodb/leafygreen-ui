import React, { createRef } from 'react';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Size, State } from './NumberInput.types';
import { NumberInput } from '.';

const label = 'This is the label text';
const description = 'This is the description text';
const arrowTestId = {
  up: 'lg-number_input-increment_button',
  down: 'lg-number_input-decrement_button',
};

const defaultProps = {
  className: 'number-input-class',
  placeholder: 'This is some placeholder text',
};

const unitProps = {
  label,
  unit: 'day',
};

const selectProps = {
  ...defaultProps,
  ...unitProps,
  onSelectChange: jest.fn(),
  unit: 'day',
  unitOptions: [
    {
      displayName: 'day',
      value: 'day',
    },
    {
      displayName: 'month',
      value: 'month',
    },
    {
      displayName: 'year',
      value: 'year',
    },
  ],
};

function renderNumberInput(props = {}) {
  const utils = render(
    // @ts-expect-error - data-testid gives an error but passes in types checks test below
    <NumberInput data-testid="number-input" {...props} />,
  );
  const numberInput = utils.getByTestId('number-input');
  const labelElement = utils.container.querySelector('label');
  return {
    ...utils,
    numberInput,
    labelElement,
  };
}

describe('packages/number-input', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderNumberInput({ label, ...defaultProps });
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('unitless number input with default props', () => {
    test('render input type as "number"', async () => {
      const { numberInput } = renderNumberInput({ label, ...defaultProps });
      expect(numberInput.getAttribute('type')).toBe('number');
    });

    test('renders label container with correct text', () => {
      const { labelElement } = renderNumberInput({ label, ...defaultProps });
      expect(labelElement?.innerHTML).toContain(label);
    });

    test("doesn't render label container when label is not supplied", () => {
      const { queryByRole } = renderNumberInput({
        ['aria-label']: label,
        ...defaultProps,
      });
      expect(queryByRole('label')).not.toBeInTheDocument();
    });

    test('renders description with correct text', () => {
      const { queryByText } = renderNumberInput({
        description,
        ...defaultProps,
      });
      const descriptionEl = queryByText(description);
      expect(descriptionEl).not.toBeNull();
      expect(descriptionEl).toBeInTheDocument();
    });

    test("doesn't render description container when description is not supplied", () => {
      const { queryByText } = renderNumberInput({ ...defaultProps });
      expect(queryByText(description)).not.toBeInTheDocument();
    });

    test(`renders placeholder text`, () => {
      const { getByPlaceholderText } = renderNumberInput({
        label,
        ...defaultProps,
      });
      expect(getByPlaceholderText(defaultProps.placeholder)).toBeVisible();
    });

    test('value change triggers onChange callback', () => {
      const onChange = jest.fn();
      const { numberInput } = renderNumberInput({
        label,
        onChange,
        ...defaultProps,
      });

      expect((numberInput as HTMLInputElement).value).toBe('');

      fireEvent.change(numberInput, {
        target: { value: '1' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('1');
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('correct value is returned when using "e"', () => {
      const { numberInput } = renderNumberInput({
        label,
        ...defaultProps,
      });

      expect((numberInput as HTMLInputElement).value).toBe('');

      fireEvent.change(numberInput, {
        target: { value: '1' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('1');

      fireEvent.change(numberInput, {
        target: { value: '1e' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('');

      fireEvent.change(numberInput, {
        target: { value: '1e3' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('1e3');
    });

    test('correct value is returned when using only numbers', () => {
      const { numberInput } = renderNumberInput({
        label,
        ...defaultProps,
      });

      expect((numberInput as HTMLInputElement).value).toBe('');

      fireEvent.change(numberInput, {
        target: { value: '1' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('1');

      fireEvent.change(numberInput, {
        target: { value: '11' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('11');

      fireEvent.change(numberInput, {
        target: { value: '111' },
      });

      expect((numberInput as HTMLInputElement).value).toBe('111');
    });

    test('value changes when "up" arrow is clicked', () => {
      const { getByTestId, numberInput } = renderNumberInput({
        label,
        ...defaultProps,
      });

      const upArrow = getByTestId(arrowTestId.up);

      userEvent.click(upArrow);
      expect((numberInput as HTMLInputElement).value).toBe('1');
    });

    test('value changes when "down" arrow is clicked', () => {
      const { getByTestId, numberInput } = renderNumberInput({
        label,
        ...defaultProps,
      });

      const downArrow = getByTestId(arrowTestId.down);

      userEvent.click(downArrow);
      expect((numberInput as HTMLInputElement).value).toBe('-1');
    });

    describe('onBlur', () => {
      test('callback triggers when focus leaves number input', () => {
        const onBlur = jest.fn();
        const { numberInput } = renderNumberInput({
          label,
          onBlur,
          ...defaultProps,
        });

        userEvent.tab(); // focus
        expect(numberInput).toHaveFocus();
        userEvent.tab(); // blur

        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      test('callback triggers when focus leaves arrow buttons', () => {
        const onBlur = jest.fn();
        const { getByTestId } = renderNumberInput({
          label,
          onBlur,
          ...defaultProps,
        });

        const upArrow = getByTestId(arrowTestId.up);

        userEvent.click(upArrow); // focus
        expect(upArrow).toHaveFocus();

        userEvent.tab(); // blur
        expect(onBlur).toHaveBeenCalledTimes(1);
      });

      test('callback does not trigger when focus changes to adjacent elements within number input', () => {
        const onBlur = jest.fn();
        const { getByTestId, numberInput } = renderNumberInput({
          label,
          onBlur,
          ...defaultProps,
        });

        const upArrow = getByTestId(arrowTestId.up);
        const downArrow = getByTestId(arrowTestId.down);

        userEvent.tab(); // focus
        expect(numberInput).toHaveFocus();

        userEvent.click(upArrow); // focus on up arrow
        expect(upArrow).toHaveFocus();

        userEvent.click(downArrow); // focus on down arrow
        expect(downArrow).toHaveFocus();

        userEvent.tab(); //blur
        expect(onBlur).toHaveBeenCalledTimes(1);
      });
    });

    test(`is disabled when disabled is passed`, () => {
      const { numberInput } = renderNumberInput({
        label,
        ...defaultProps,
        disabled: true,
      });
      expect(numberInput.hasAttribute('readonly')).toBeTruthy();
      expect(numberInput.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('number input with single unit', () => {
    test('render input type as "number"', () => {
      const { numberInput } = renderNumberInput({
        ...defaultProps,
        ...unitProps,
      });
      expect(numberInput.getAttribute('type')).toBe('number');
    });

    test('renders unit', () => {
      const { queryByText } = renderNumberInput({
        ...defaultProps,
        ...unitProps,
      });
      expect(queryByText(unitProps.unit)).toBeInTheDocument();
    });
  });

  describe('number input with select options', () => {
    test('render input type as "number"', () => {
      const { numberInput } = renderNumberInput({
        ...selectProps,
      });
      expect(numberInput.getAttribute('type')).toBe('number');
    });

    test('a collapsed select is rendered, with an active state based on the language prop', () => {
      const { getByRole } = renderNumberInput({ ...selectProps });
      expect(getByRole('button', { name: unitProps.unit })).toBeInTheDocument();
    });

    test('clicking the collapsed select menu button opens a select', () => {
      const { getByRole } = renderNumberInput({ ...selectProps });
      const trigger = getByRole('button', { name: unitProps.unit });
      fireEvent.click(trigger);
      expect(getByRole('listbox')).toBeInTheDocument();
    });

    test('options displayed in select are based on the unitOptions prop', () => {
      const { getByRole } = renderNumberInput({ ...selectProps });
      const trigger = getByRole('button', { name: unitProps.unit });
      fireEvent.click(trigger);

      selectProps.unitOptions.forEach(lang => {
        expect(
          getByRole('option', { name: lang.displayName }),
        ).toBeInTheDocument();
      });
    });

    test('onSelectChange prop gets called when new unit is selected', () => {
      const { getByRole } = renderNumberInput({ ...selectProps });

      const trigger = getByRole('button', { name: unitProps.unit });
      fireEvent.click(trigger);

      fireEvent.click(
        getByRole('option', { name: selectProps.unitOptions[1].displayName }),
      );
      expect(selectProps.onSelectChange).toHaveBeenCalled();
    });

    test('onSelectChange prop is called with an object that represents the newly selected unit when called', () => {
      const { getByRole } = renderNumberInput({ ...selectProps });

      const trigger = getByRole('button', { name: unitProps.unit });
      fireEvent.click(trigger);

      fireEvent.click(
        getByRole('option', { name: selectProps.unitOptions[1].displayName }),
      );

      expect(selectProps.onSelectChange).toHaveBeenCalledWith({
        displayName: selectProps.unitOptions[1].displayName,
        value: selectProps.unitOptions[1].value,
      });
    });

    test('accepts a portalRef', () => {
      const portalContainer = document.createElement('div');
      document.body.appendChild(portalContainer);
      const portalRef = createRef<HTMLElement>();
      const { getByRole } = renderNumberInput({
        ...selectProps,
        portalContainer,
        portalRef,
      });
      const trigger = getByRole('button', { name: unitProps.unit });
      fireEvent.click(trigger);
      expect(portalRef.current).toBeDefined();
      expect(portalRef.current).toBe(portalContainer);
    });
  });

  /* eslint-disable jest/no-disabled-tests */
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - Missing props */}
      <NumberInput />
      <NumberInput data-testid="test" label={label} />

      {/* @ts-expect-error - needs label/aria-label/aria-labelledby */}
      <NumberInput unit={unitProps.unit} />
      <NumberInput unit={unitProps.unit} label={label} />
      <NumberInput unit={unitProps.unit} aria-label={label} />
      <NumberInput unit={unitProps.unit} aria-labelledby="some-id" />

      {/* @ts-expect-error - missing onSelectChange */}
      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        label={label}
      />
      {/* @ts-expect-error - missing unitOptions */}
      <NumberInput
        unit={unitProps.unit}
        onSelectChange={() => {}}
        label={label}
      />
      {/* @ts-expect-error - missing unit */}
      <NumberInput
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
      />
      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
      />

      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
        state={State.None}
        value="1"
        onChange={() => {}}
        darkMode={true}
        id="1"
        size={Size.Default}
      />

      {/* @ts-expect-error - portalClassName should be undefined */}
      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
        usePortal={false}
        portalClassName="classname"
      />

      {/* @ts-expect-error - scrollContainer should be undefined */}
      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
        usePortal={false}
        scrollContainer={{} as HTMLElement}
      />

      {/* @ts-expect-error - portalContainer should be undefined */}
      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
        usePortal={false}
        portalContainer={{} as HTMLElement}
      />

      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
        usePortal={false}
      />

      <NumberInput
        unit={unitProps.unit}
        unitOptions={selectProps.unitOptions}
        onSelectChange={() => {}}
        label={label}
        portalContainer={{} as HTMLElement}
        scrollContainer={{} as HTMLElement}
        portalClassName="classname"
      />
    </>;
  });
});
