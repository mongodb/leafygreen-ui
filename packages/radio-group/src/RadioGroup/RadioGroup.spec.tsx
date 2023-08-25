import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Radio, RadioGroup, RadioGroupProps, RadioProps } from '..';

function WrappedRadio({ checked }: { checked: string }) {
  return (
    <RadioGroup>
      <Radio
        value="input-1"
        checked={checked === 'input-1'}
        data-testid="first-radio"
      >
        Input 1
      </Radio>
      <Radio
        value="input-2"
        checked={checked === 'input-2'}
        data-testid="second-radio"
      >
        Input 2
      </Radio>
    </RadioGroup>
  );
}

const renderWrappedRadioGroup = (checked: string) => {
  render(<WrappedRadio checked={checked} />);
};

const renderControlledRadioGroup = (
  props: Omit<RadioGroupProps, 'children'> = {},
) => {
  render(
    <RadioGroup value="input-1" {...props}>
      <Radio value="input-1">Input 1</Radio>
      <Radio value="input-2">Input 2</Radio>
      <Radio value="input-3">Input 3</Radio>
    </RadioGroup>,
  );
};

const renderUncontrolledRadioGroup = (
  props: Omit<RadioGroupProps, 'children'> = {},
) => {
  return render(
    <RadioGroup {...props}>
      <Radio default value="input-1">
        Input 1
      </Radio>
      <Radio value="input-2">Input 2</Radio>
      <Radio value="input-3">Input 3</Radio>
    </RadioGroup>,
  );
};

const renderRadio = (props: Omit<RadioProps, 'value'>) => {
  const { getByTestId, ...rest } = render(
    <Radio {...props} data-testid="lg-radio" value="input-only" />,
  );
  const radio = getByTestId('lg-radio');
  return { radio, ...rest };
};

describe('packages/radio-group', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderUncontrolledRadioGroup();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('when the RadioGroup is controlled', () => {
    let onChange: jest.Mock;

    beforeEach(() => {
      onChange = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('initial value set by RadioGroup when prop provided', () => {
      renderControlledRadioGroup();
      const firstInput = screen.getAllByRole('radio')[0];
      expect(firstInput.getAttribute('aria-checked')).toBe('true');
    });

    test('onChange fires once when the label is clicked', () => {
      renderControlledRadioGroup({ onChange });
      const secondInput = screen.getAllByRole('radio')[1];
      fireEvent.click(secondInput);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('Radio does not become checked when clicked', () => {
      renderControlledRadioGroup();
      const firstInput = screen.getAllByRole('radio')[0];
      const secondInput = screen.getAllByRole('radio')[1];
      fireEvent.click(secondInput);

      expect(firstInput.getAttribute('aria-checked')).toBe('true');
      expect(secondInput.getAttribute('aria-checked')).toBe(null);
    });
  });

  describe('when an external component controls the RadioGroup', () => {
    test('initial checked Radio is determined by `checked` prop on Radio', () => {
      renderWrappedRadioGroup('input-1');
      const initialChecked = screen.getByTestId('first-radio');
      expect((initialChecked as HTMLInputElement).checked).toBe(true);
    });
    test('when `checked` value changes, the checked Radio changes', () => {
      renderWrappedRadioGroup('input-2');
      const newChecked = screen.getByTestId('second-radio');
      expect((newChecked as HTMLInputElement).checked).toBe(true);
      const initialChecked = screen.getByTestId('first-radio');
      expect((initialChecked as HTMLInputElement).checked).toBe(false);
    });
  });

  describe('when the RadioGroup is uncontrolled', () => {
    let onChange: jest.Mock;

    beforeEach(() => {
      onChange = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('renders the className to the RadioGroup container when the prop is set', () => {
      const className = 'test-className';
      renderUncontrolledRadioGroup({ className });
      const container = screen.getByRole('group');
      expect(container.classList.contains(className)).toBe(true);
    });

    test('renders the name in the "aria-label" field of the RadioGroup container', () => {
      const name = 'test-name';
      renderUncontrolledRadioGroup({ name });
      const container = screen.getByRole('group');
      expect(container.getAttribute('aria-label')).toBe(name);
    });

    test('sets Radio as checked by default when the "default" prop is passed', () => {
      renderUncontrolledRadioGroup();
      const firstInput = screen.getAllByRole('radio')[0];
      expect(firstInput.getAttribute('aria-checked')).toBe('true');
    });

    test('onChange fires once when the label is clicked', () => {
      renderUncontrolledRadioGroup({ onChange });
      const secondInput = screen.getAllByRole('radio')[1];
      fireEvent.click(secondInput);
      expect(onChange).toHaveBeenCalledTimes(1);
    });

    test('Radio becomes checked when clicked', () => {
      renderUncontrolledRadioGroup();
      const firstInput = screen.getAllByRole('radio')[0];
      const secondInput = screen.getAllByRole('radio')[1];
      fireEvent.click(secondInput);

      expect(firstInput.getAttribute('aria-checked')).toBe('false');
      expect(secondInput.getAttribute('aria-checked')).toBe('true');
    });
  });

  describe('packages/radio', () => {
    const className = 'radio-className';
    test(`renders "${className}" in the labels's class list`, () => {
      const { radio } = renderRadio({ className });
      const label = radio.parentElement;
      expect(label).not.toBeNull();
      expect(label!.classList.contains(className)).toBe(true);
    });

    test(`renders disabled radio when disabled prop is set`, () => {
      const { radio } = renderRadio({ disabled: true });
      expect((radio as HTMLInputElement).disabled).toBe(true);
      expect(radio.getAttribute('aria-disabled')).toBe('true');
    });

    test(`radio is checked when value is set`, () => {
      const { radio } = renderRadio({ checked: true });
      expect(radio.getAttribute('aria-checked')).toBe('true');
    });

    test(`radio renders a description`, () => {
      const { getByText } = renderRadio({
        checked: true,
        description: 'a description',
      });

      const description = getByText('a description');
      expect(description).toBeInTheDocument();
    });
  });
});
