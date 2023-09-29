import React from 'react';
import { render } from '@testing-library/react';

import { FormField } from '.';

describe('packages/form-field', () => {
  test('rest passed to outer element', () => {
    const { getByTestId } = render(
      <FormField data-testid="form-field">
        <div />
      </FormField>,
    );
    const formField = getByTestId('form-field');
    expect(formField).toBeInTheDocument();
  });

  test('className passed to outer element', () => {
    const { getByTestId } = render(
      <FormField data-testid="form-field" className="form-field">
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

  test('input has id, labelledby & describedby', () => {
    const { getByTestId } = render(
      <FormField
        label="Label"
        description="Description"
        data-testid="form-field"
      >
        <div data-testid="input" />
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('id');
    expect(input).toHaveAttribute('aria-labelledby');
    expect(input).toHaveAttribute('aria-describedby');
  });

  test.todo('Error message appears when state changes');
  test.todo('Error message has id');
  test.todo('icon rendering');
});
