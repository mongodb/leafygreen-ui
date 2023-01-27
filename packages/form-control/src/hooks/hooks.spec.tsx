import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { ValidationState } from '../types';

import { AccessibleFieldProps } from './types';
import { useAccessibleField } from '.';

describe('packages/form-control', () => {
  describe('useAccessibleField', () => {
    const defaultArgs = {
      label: 'string',
      id: 'testId',
      errorMessage: 'this is an error',
      description: 'this is a description',
      validationState: 'valid' as ValidationState,
    };

    const ExampleInput = (props: AccessibleFieldProps) => {
      const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
        useAccessibleField(props);

      return (
        <>
          <label {...labelProps}>{defaultArgs.label}</label>
          <div {...descriptionProps}>Description</div>
          <input {...fieldProps} />
          <div {...errorMessageProps}>Error!</div>
        </>
      );
    };

    test('it returns an object with props for label, field, description, and error message', () => {
      const { result } = renderHook(() => useAccessibleField(defaultArgs));
      const { current } = result;

      expect(current.labelProps.id).toBeDefined();
      expect(current.labelProps.htmlFor).toBeDefined();
      expect(current.fieldProps.id).toBeDefined();
      expect(current.fieldProps['aria-describedby']).toBeDefined();
      expect(current.fieldProps['aria-labelledby']).toBeDefined();
      expect(current.descriptionProps.id).toBeDefined();
      expect(current.errorMessageProps.id).toBeDefined();
    });

    test('it properly relates the objects with one another', () => {
      const { result } = renderHook(() =>
        useAccessibleField({ ...defaultArgs, validationState: 'error' }),
      );
      const { current } = result;

      expect(current.labelProps.id).toEqual(
        current.fieldProps['aria-labelledby'],
      );
      expect(current.labelProps.htmlFor).toEqual(current.fieldProps.id);
      expect(current.fieldProps['aria-describedby']).toContain(
        current.descriptionProps.id,
      );
      expect(current.fieldProps['aria-describedby']).toContain(
        current.errorMessageProps.id,
      );
    });

    describe('it returns the proper value for aria-describedby based on validation state', () => {
      test('with errorMessage, description, and validationState="valid"', () => {
        const utils = render(<ExampleInput {...defaultArgs} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toEqual(utils.getByText('Description').getAttribute('id'));
      });

      test('with errorMessage, description, and validationState="error"', () => {
        const args = {
          ...defaultArgs,
          validationState: 'error' as ValidationState,
        };
        const utils = render(<ExampleInput {...args} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toContain(utils.getByText('Description').getAttribute('id'));
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toContain(utils.getByText('Error!').getAttribute('id'));
      });

      test('with just description', () => {
        const args = { ...defaultArgs, errorMessage: undefined };
        const utils = render(<ExampleInput {...args} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toEqual(utils.getByText('Description').getAttribute('id'));
      });

      test('with just an error', () => {
        const args = {
          ...defaultArgs,
          validationState: 'error' as ValidationState,
          description: undefined,
        };
        const utils = render(<ExampleInput {...args} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toEqual(utils.getByText('Error!').getAttribute('id'));
      });
    });
  });
});
