import React from 'react';
import { render } from '@testing-library/react';

import Icon from '@leafygreen-ui/icon';

import {
  FormField,
  FormFieldInputContainer,
  FormFieldState,
  LGIDS_FORM_FIELD,
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

  test('input has aria-disabled attribute but not disabled attribute when disabled prop is defined', () => {
    const { getByTestId } = render(
      <FormField label="Label" data-testid="form-field" disabled={true}>
        <FormFieldInputContainer>
          <div data-testid="input" />
        </FormFieldInputContainer>
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input).not.toHaveAttribute('disabled');
    expect(input).toHaveAttribute('aria-disabled');
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

    const label = 'Label';
    const ariaLabel = 'Aria label';
    const ariaLabelledby = 'custom-label-id';

    describe('when label is defined', () => {
      test('input sets generated label id for aria-labelledby', () => {
        const { getByTestId, getByText } = render(
          <FormField label={label} data-testid="form-field">
            <FormFieldInputContainer>
              <div data-testid="input" />
            </FormFieldInputContainer>
          </FormField>,
        );
        const input = getByTestId('input');
        const generatedLabel = getByText(label);
        expect(input).toHaveAttribute('aria-labelledby', generatedLabel.id);
      });

      test('when aria-labelledby is defined, input sets aria-labelledby attribute to generated label id and not the custom prop', () => {
        const { getByTestId, getByText } = render(
          <FormField
            aria-labelledby={ariaLabelledby}
            label={label}
            data-testid="form-field"
          >
            <FormFieldInputContainer>
              <div data-testid="input" />
            </FormFieldInputContainer>
          </FormField>,
        );
        const input = getByTestId('input');
        const generatedLabel = getByText(label);
        expect(input).toHaveAttribute('aria-labelledby', generatedLabel.id);
        expect(input).not.toHaveAttribute('aria-labelledby', ariaLabelledby);
      });

      test('when aria-label is defined, input does not set the aria-label', () => {
        const { getByTestId } = render(
          <FormField
            aria-label={ariaLabel}
            label={label}
            data-testid="form-field"
          >
            <FormFieldInputContainer>
              <div data-testid="input" />
            </FormFieldInputContainer>
          </FormField>,
        );
        const input = getByTestId('input');
        expect(input).not.toHaveAttribute('aria-label', ariaLabel);
      });
    });

    describe('when label is not defined', () => {
      test('when aria-labelledby is defined, input sets aria-labelledby attribute to custom prop', () => {
        const { getByTestId } = render(
          <FormField aria-labelledby={ariaLabelledby} data-testid="form-field">
            <FormFieldInputContainer>
              <div data-testid="input" />
            </FormFieldInputContainer>
          </FormField>,
        );
        const input = getByTestId('input');
        expect(input).toHaveAttribute('aria-labelledby', ariaLabelledby);
      });

      test('when aria-labelledby and aria-label are defined, input does not set the aria-label', () => {
        const { getByTestId } = render(
          <FormField
            aria-labelledby={ariaLabelledby}
            aria-label={ariaLabel}
            data-testid="form-field"
          >
            <FormFieldInputContainer>
              <div data-testid="input" />
            </FormFieldInputContainer>
          </FormField>,
        );
        const input = getByTestId('input');
        expect(input).toHaveAttribute('aria-labelledby', ariaLabelledby);
        expect(input).not.toHaveAttribute('aria-label', ariaLabel);
      });

      test('when aria-labelledby is not defined and aria-label is defined, input sets aria-label attribute to custom prop', () => {
        const { getByTestId } = render(
          <FormField aria-label={ariaLabel} data-testid="form-field">
            <FormFieldInputContainer>
              <div data-testid="input" />
            </FormFieldInputContainer>
          </FormField>,
        );
        const input = getByTestId('input');
        expect(input).toHaveAttribute('aria-label', ariaLabel);
      });
    });
  });

  describe(`when state is not ${FormFieldState.None}`, () => {
    test('form field feedback has an id', () => {
      const { getByTestId } = render(
        <FormField
          label="Label"
          successMessage="Success"
          state={FormFieldState.Valid}
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const feedback = getByTestId(LGIDS_FORM_FIELD.feedback);
      expect(feedback).toHaveAttribute('id');
    });

    test('input is described by form field feedback', () => {
      const { getByTestId } = render(
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
      const feedback = getByTestId(LGIDS_FORM_FIELD.feedback);
      expect(input).toHaveAttribute('aria-describedby', feedback?.id);
    });

    test('input is described by both description & feedback', () => {
      const { getByTestId, queryByText } = render(
        <FormField
          label="Label"
          description="Description"
          successMessage="Success"
          state={FormFieldState.Valid}
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      const description = queryByText('Description');
      const feedback = getByTestId(LGIDS_FORM_FIELD.feedback);
      expect(input).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(description?.id!),
      );
      expect(input).toHaveAttribute(
        'aria-describedby',
        expect.stringContaining(feedback?.id),
      );
    });
  });

  describe(`${FormFieldState.Valid} state`, () => {
    test('Success icon and message are not shown by default', () => {
      const { queryByText, queryByTitle } = render(
        <FormField
          label="Label"
          successMessage="Success"
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const successIcon = queryByTitle('Valid');
      const successText = queryByText('Success');
      expect(successIcon).toBeNull();
      expect(successText).toBeNull();
    });

    test(`Success icon and message appear when state is ${FormFieldState.Valid}`, () => {
      const { queryByText, queryByTitle } = render(
        <FormField
          label="Label"
          successMessage="Success"
          state={FormFieldState.Valid}
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const successIcon = queryByTitle('Valid');
      const successText = queryByText('Success');
      expect(successIcon).toBeInTheDocument();
      expect(successText).toBeInTheDocument();
    });
  });

  describe(`${FormFieldState.Error} state`, () => {
    test('Error icon and message are not shown by default', () => {
      const { queryByText, queryByTitle } = render(
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
      const errorIcon = queryByTitle('Error');
      const errorText = queryByText('This is an error message');
      expect(errorIcon).toBeNull();
      expect(errorText).toBeNull();
    });

    test(`Error message appears when state is ${FormFieldState.Error}`, () => {
      const { queryByText, queryByTitle } = render(
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
      const errorIcon = queryByTitle('Error');
      const errorText = queryByText('This is an error message');
      expect(errorIcon).toBeInTheDocument();
      expect(errorText).toBeInTheDocument();
    });

    test('input has aria-invalid attribute set to true when state is Error', () => {
      const { getByTestId } = render(
        <FormField
          label="Label"
          state={FormFieldState.Error}
          data-testid="form-field"
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
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

  test('renders optional through the "optional" prop', () => {
    const { queryByText } = render(
      <FormField label="Label" data-testid="form-field" optional>
        <FormFieldInputContainer>
          <div data-testid="input" />
        </FormFieldInputContainer>
      </FormField>,
    );

    const optional = queryByText('Optional');
    expect(optional).toBeInTheDocument();
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

  test('allows input id to be controlled by user', () => {
    const id = 'testId';

    const { getByTestId, getByText } = render(
      <FormField label="Label" data-testid="form-field" id={id}>
        <FormFieldInputContainer>
          <div data-testid="input" />
        </FormFieldInputContainer>
      </FormField>,
    );
    const input = getByTestId('input');
    expect(input.getAttribute('id')).toBe(id);

    const label = getByText('Label');
    expect(label.getAttribute('for')).toBe(id);
  });

  describe('readonly', () => {
    test('input has readonly prop', () => {
      const { getByTestId } = render(
        <FormField label="Label" data-testid="form-field" readOnly>
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      expect(input).toHaveAttribute('readonly');
    });

    test('disabled overrides readOnly prop', () => {
      const { getByTestId } = render(
        <FormField
          label="Label"
          data-testid="form-field"
          readOnly={false}
          disabled
        >
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      expect(input).toHaveAttribute('readonly');
    });

    test('input does not have readonly prop', () => {
      const { getByTestId } = render(
        <FormField label="Label" data-testid="form-field" readOnly={false}>
          <FormFieldInputContainer>
            <div data-testid="input" />
          </FormFieldInputContainer>
        </FormField>,
      );
      const input = getByTestId('input');
      expect(input).not.toHaveAttribute('readonly');
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
