import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TextInput, { State } from './TextInput';
import { typeIs } from '@leafygreen-ui/lib';

afterAll(cleanup);

describe('packages/text-input', () => {
  const error = 'This is the error message';
  const validEmail = 'test.email@mongodb.com';
  const invalidEmail = 'invalid.email';
  const props = {
    className: 'test-text-input-class',
    label: 'Test Input Label',
    description: 'This is the description',
    placeholder: 'This is some placeholder text',
    onChange: jest.fn(),
    state: State.None,
    optional: true,
  };

  props.onChange.mockReturnValue('none');

  const { getByPlaceholderText, getByText, getByTitle, container } = render(
    <TextInput {...props} />,
  );

  const renderedChildren = container.firstChild;

  if (!typeIs.element(renderedChildren)) {
    throw new Error('TextInput component failed to render');
  }

  const renderedInputElement = getByPlaceholderText(props.placeholder);

  if (!typeIs.input(renderedInputElement)) {
    throw new Error('Could not find input element');
  }

  const optionalText = getByText('Optional');

  test(`renders "${props.label}" as the input's label and "${props.description}" as the description`, () => {
    expect(renderedChildren.innerHTML).toContain(props.label);
    expect(renderedChildren.innerHTML).toContain(props.description);
  });

  test(`"optional" text is present when TextInput is optional and state is None`, () => {
    expect(optionalText).toBeVisible();
  });

  test(`valid/error icons are not present when state is None`, () => {
    expect(renderedChildren.innerHTML).not.toContain('Checkmark Icon');
    expect(renderedChildren.innerHTML).not.toContain('Warning Icon');
  });

  test('key presses are reflected in component state and onChange function is called when value changes', () => {
    expect(renderedInputElement.value).toBe('');
    fireEvent.change(renderedInputElement, {
      target: { value: 'a' },
    });
    expect(renderedInputElement.value).toBe('a');
    expect(props.onChange).toHaveBeenCalledTimes(1);
    expect(props.onChange).toHaveReturnedWith('none');
  });

  test('checkmark icon shows when input is valid', async () => {
    render(
      <TextInput
        label={props.label}
        description={props.description}
        state={State.Valid}
        value={validEmail}
        optional={true}
      />,
      {
        container: container,
      },
    );

    expect(renderedInputElement.value).toBe(validEmail);
    expect(renderedChildren.innerHTML).not.toContain(optionalText);
    const checkmarkIcon = getByTitle('Checkmark Icon');

    if (!typeIs.element(checkmarkIcon)) {
      throw new Error('Could not find checkmark icon element');
    }
  });

  test('warning icon and error message show when input is invalid', async () => {
    render(
      <TextInput
        label={props.label}
        description={props.description}
        state={State.Error}
        value={invalidEmail}
        errorMessage={error}
        optional={true}
      />,
      {
        container: container,
      },
    );

    expect(renderedInputElement.value).toBe(invalidEmail);
    const warningIcon = getByTitle('Warning Icon');

    if (!typeIs.element(warningIcon)) {
      throw new Error('Could not find warning icon element');
    }
    expect(renderedChildren.innerHTML).toContain(error);
    expect(renderedChildren.innerHTML).not.toContain(optionalText);
  });

  test('error state still shows when error message is empty', async () => {
    render(
      <TextInput
        label={props.label}
        description={props.description}
        state={State.Error}
        value={invalidEmail}
        optional={true}
      />,
      {
        container: container,
      },
    );

    expect(renderedInputElement.value).toBe(invalidEmail);
    expect(renderedChildren.innerHTML).not.toContain(optionalText);
    const warningIcon = getByTitle('Warning Icon');

    if (!typeIs.element(warningIcon)) {
      throw new Error('Could not find warning icon element');
    }
  });

  test(`check that "optional" text is not visible when TextInput is required`, () => {
    render(<TextInput label={props.label} description={props.description} />, {
      container: container,
    });
    expect(renderedChildren.innerHTML).not.toContain(optionalText);
  });
});
