import React from 'react';
import { render } from '@testing-library/react';

import Icon from '@leafygreen-ui/icon';

import {
  FormField,
  FormFieldInputContainer,
  FormFieldState,
  useFormFieldContext,
} from '.';

describe('packages/form-field', () => {
  test('rest passed to outer element', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field">
        <FormFieldInputContainer>
          <div />
        </FormFieldInputContainer>
      </FormField>,
    );
    const formField = getByTestId('form-field');
    expect(formField).toBeInTheDocument();
  });

  test('className passed to outer element', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field" className="form-field">
        <FormFieldInputContainer>
          <div />
        </FormFieldInputContainer>
      </FormField>,
    );
    const formField = getByTestId('form-field');
    expect(formField.classList.contains('form-field')).toBeTruthy();
  });

  test('description has id', () => {
    const { getByText } = render(
      <FormField
        label="Label"
        description="Description"
        data-testid="form-field"
      >
        <FormFieldInputContainer>
          <div />
        </FormFieldInputContainer>
      </FormField>,
    );
    const description = getByText('Description');
    expect(description).toHaveAttribute('id');
  });

  test('description can be ReactNode', () => {
    const { queryByTestId } = render(
      <FormField
        label="Label"
        description={<span data-testid="description-span">description</span>}
        data-testid="form-field"
      >
        <FormFieldInputContainer>
          <div />
        </FormFieldInputContainer>
      </FormField>,
    );
    const descriptionSpan = queryByTestId('description-span');
    expect(descriptionSpan).toBeInTheDocument();
    expect(descriptionSpan?.parentElement).toHaveAttribute('id');
  });

  test('input has id,', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field">
        <FormFieldInputContainer>
          <div data-testid="input" />
        </FormFieldInputContainer>
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input).toHaveAttribute('id');
  });

  describe('Label rendering', () => {
    test('label element has id & htmlFor', () => {
      const { getByText } = render(
        <FormField label="Label" data-testid="form-field">
          <FormFieldInputContainer>
            <div />
          </FormFieldInputContainer>
        </FormField>,
      );
      const label = getByText('Label');
      expect(label).toHaveAttribute('id');
      expect(label).toHaveAttribute('for');
    });

    test('label can be a ReactNode', () => {
      const { queryByTestId } = render(
        <FormField
          label={<span data-testid="label-span">Label</span>}
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div />
          </FormFieldInputContainer>
        </FormField>,
      );
      const labelSpan = queryByTestId('label-span');
      expect(labelSpan).toBeInTheDocument();
      expect(labelSpan?.parentElement).toHaveAttribute('id');
    });

    test('input is labelledby label element', () => {
      const { getByTestId, getByText } = render(
        <FormField
          label="Label"
          description="Description"
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const label = getByText('Label');
      const input = getByTestId('input');
      expect(input).toHaveAttribute('aria-labelledby', label.id);
    });

    test("input is labelledby label when it's a ReactNode", () => {
      const { queryByTestId } = render(
        <FormField
          label={<span data-testid="label-span">Label</span>}
          description="Description"
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const labelSpan = queryByTestId('label-span');
      const input = queryByTestId('input');
      expect(input).toHaveAttribute(
        'aria-labelledby',
        labelSpan?.parentElement?.id,
      );
    });

    test('input is describedby description element', () => {
      const { getByTestId, getByText } = render(
        <FormField
          label="Label"
          description="Description"
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const description = getByText('Description');
      const input = getByTestId('input');
      expect(input).toHaveAttribute('aria-describedby', description.id);
    });

    test("input is describedby description when it's a ReactNode", () => {
      const { getByTestId, queryByTestId } = render(
        <FormField
          label="Label"
          description={<span data-testid="description-span">description</span>}
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const descriptionSpan = queryByTestId('description-span');
      const input = getByTestId('input');
      expect(input).toHaveAttribute(
        'aria-describedby',
        descriptionSpan?.parentElement?.id,
      );
    });

    test('when aria-label is provided, input has that aria-label', () => {
      const { getByTestId } = render(
        <FormField aria-label="Label" data-testid="form-field">
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      expect(input).toHaveAttribute('aria-label', 'Label');
    });

    test('when aria-labelledby is provided, input has that aria-labelledby', () => {
      const { getByTestId } = render(
        <FormField aria-labelledby="label-123" data-testid="form-field">
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      expect(input).toHaveAttribute('aria-labelledby', 'label-123');
    });
  });

  describe('Error state', () => {
    test('Error message is not shown by default', () => {
      const { queryByText } = render(
        <FormField
          label="Label"
          errorMessage="This is an error message"
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
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
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
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
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
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
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
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
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
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
      <FormField label="Label" data-testid="form-field">
        <FormFieldInputContainer
          contentEnd={<Icon glyph="Beaker" data-testid="icon" />}
        >
          <div data-testid="input" />
        </FormFieldInputContainer>
      </FormField>,
    );

    const icon = queryByTestId('icon');
    expect(icon).toBeInTheDocument();
    expect(icon?.tagName.toLowerCase()).toEqual('svg');
  });

  test('Renders other content', () => {
    const { queryByText } = render(
      <FormField label="Label" data-testid="form-field">
        <FormFieldInputContainer contentEnd={<em>Optional</em>}>
          <div data-testid="input" />
        </FormFieldInputContainer>
      </FormField>,
    );

    const em = queryByText('Optional');
    expect(em).toBeInTheDocument();
    expect(em?.tagName.toLowerCase()).toEqual('em');
  });

  describe('custom children', () => {
    const TestChild = () => {
      const { inputProps } = useFormFieldContext();
      return <div data-testid="child" {...inputProps} />;
    };

    test('custom child is rendered', () => {
      const { queryByTestId } = render(
        <FormField label="Label" data-testid="form-field">
          <TestChild />
        </FormField>,
      );

      const child = queryByTestId('child');
      expect(child).toBeInTheDocument();
    });

    test('custom child is labelled by the label element', () => {
      const { queryByTestId, getByText } = render(
        <FormField label="Label" data-testid="form-field">
          <TestChild />
        </FormField>,
      );
      const label = getByText('Label');
      const child = queryByTestId('child');
      expect(child!.id).toBeDefined();
      expect(child!.id).toEqual(label.getAttribute('for'));
      expect(child!.getAttribute('aria-labelledby')).toEqual(label.id);
    });
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

    // Label accepts React.ReactNode
    render(
      <FormField label={<span>label</span>}>
        <div />
      </FormField>,
    );

    // @ts-expect-error - children is required
    render(<FormField label=""></FormField>);
  });
});
