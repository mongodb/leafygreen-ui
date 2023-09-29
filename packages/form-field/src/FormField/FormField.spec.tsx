import React from 'react';
import { render } from '@testing-library/react';

import Icon from '@leafygreen-ui/icon';

import { FormField, FormFieldState } from '.';

describe('packages/form-field', () => {
  test('rest passed to outer element', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field">
        <div />
      </FormField>,
    );
    const formField = getByTestId('form-field');
    expect(formField).toBeInTheDocument();
  });

  test('className passed to outer element', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field" className="form-field">
        <div />
      </FormField>,
    );
    const formField = getByTestId('form-field');
    expect(formField.classList.contains('form-field')).toBeTruthy();
  });

  test('label has id & htmlFor', () => {
    const { getByText } = render(
      <FormField label="Label" data-testid="form-field">
        <div />
      </FormField>,
    );
    const label = getByText('Label');
    expect(label).toHaveAttribute('id');
    expect(label).toHaveAttribute('for');
  });

  test('description has id', () => {
    const { getByText } = render(
      <FormField
        label="Label"
        description="Description"
        data-testid="form-field"
      >
        <div />
      </FormField>,
    );
    const description = getByText('Description');
    expect(description).toHaveAttribute('id');
  });

  test('input has id,', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field">
        <div data-testid="input" />
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('id');
  });

  test('input has labelledby attribute', () => {
    const { getByTestId, getByText } = render(
      <FormField
        label="Label"
        description="Description"
        data-testid="form-field"
      >
        <div data-testid="input" />
      </FormField>,
    );
    const label = getByText('Label');
    const input = getByTestId('input');
    expect(input).toHaveAttribute('aria-labelledby', label.id);
  });

  test('input has describedby attribute', () => {
    const { getByTestId, getByText } = render(
      <FormField
        label="Label"
        description="Description"
        data-testid="form-field"
      >
        <div data-testid="input" />
      </FormField>,
    );
    const description = getByText('Description');
    const input = getByTestId('input');
    expect(input).toHaveAttribute('aria-describedby', description.id);
  });

  test('when aria-label is provided, input has that aria-label', () => {
    const { getByTestId } = render(
      <FormField aria-label="Label" data-testid="form-field">
        <div data-testid="input" />
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('aria-label', 'Label');
  });

  test('when aria-labelledby is provided, input has that aria-labelledby', () => {
    const { getByTestId } = render(
      <FormField aria-labelledby="label-123" data-testid="form-field">
        <div data-testid="input" />
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('aria-labelledby', 'label-123');
  });

  describe('Error state', () => {
    test('Error message is not shown by default', () => {
      const { queryByText } = render(
        <FormField
          label="Label"
          errorMessage="This is an error message"
          data-testid="form-field"
        >
          <div data-testid="input" />
        </FormField>,
      );
      const error = queryByText('This is an error message');
      expect(error).not.toBeInTheDocument();
    });

    test('Error message appears when state is Error', () => {
      const { queryByText } = render(
        <FormField
          label="Label"
          errorMessage="This is an error message"
          state={FormFieldState.Error}
          data-testid="form-field"
        >
          <div data-testid="input" />
        </FormField>,
      );
      const error = queryByText('This is an error message');
      expect(error).toBeInTheDocument();
    });

    test('Error message has id', () => {
      const { queryByText } = render(
        <FormField
          label="Label"
          errorMessage="This is an error message"
          state={FormFieldState.Error}
          data-testid="form-field"
        >
          <div data-testid="input" />
        </FormField>,
      );
      const error = queryByText('This is an error message');
      expect(error).toHaveAttribute('id');
    });

    test('input is described by error message', () => {
      const { getByTestId, queryByText } = render(
        <FormField
          label="Label"
          errorMessage="This is an error message"
          state={FormFieldState.Error}
          data-testid="form-field"
        >
          <div data-testid="input" />
        </FormField>,
      );
      const input = getByTestId('input');
      const error = queryByText('This is an error message');
      expect(input).toHaveAttribute('aria-describedby', error?.id);
    });

    test('input is described by both description & error message', () => {
      const { getByTestId, queryByText } = render(
        <FormField
          label="Label"
          description="Description"
          errorMessage="This is an error message"
          state={FormFieldState.Error}
          data-testid="form-field"
        >
          <div data-testid="input" />
        </FormField>,
      );
      const input = getByTestId('input');
      const description = queryByText('Description');
      const error = queryByText('This is an error message');
      expect(input).toHaveAttribute(
        'aria-describedby',
        description?.id + ' ' + error?.id,
      );
    });
  });

  test('Renders an icon', () => {
    const { queryByTestId } = render(
      <FormField
        label="Label"
        icon={<Icon glyph="Beaker" data-testid="icon" />}
        data-testid="form-field"
      >
        <div data-testid="input" />
      </FormField>,
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName).toEqual('svg');
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('Types', () => {
    render(
      // @ts-expect-error - label is required
      <FormField>
        <div />
      </FormField>,
    );

    // Label is required ...
    render(
      <FormField label="">
        <div />
      </FormField>,
    );

    // ...or aria-label...
    render(
      <FormField aria-label="">
        <div />
      </FormField>,
    );

    // ...or aria-labelledby
    render(
      <FormField aria-labelledby="">
        <div />
      </FormField>,
    );

    // @ts-expect-error - children is required
    render(<FormField label=""></FormField>);
  });
});
