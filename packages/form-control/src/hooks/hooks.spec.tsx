import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { AccessibleFieldProps } from './types';
import { useAccessibleField } from '.';

describe('packages/form-control', () => {
  describe('useAccessibleField', () => {
    const defaultArgs = {
      label: 'string',
      id: 'testId',
      isDescriptionShown: true,
      isErrorMessageShown: false,
    };

    const ExampleInput = ({
      isErrorMessageShown,
      ...rest
    }: AccessibleFieldProps) => {
      const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
        useAccessibleField({ isErrorMessageShown, ...rest });

      return (
        <>
          <label {...labelProps}>{defaultArgs.label}</label>
          <div {...descriptionProps}>Description</div>
          <input {...fieldProps} />
          {isErrorMessageShown && <div {...errorMessageProps}>Error!</div>}
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
        useAccessibleField({ ...defaultArgs, isErrorMessageShown: true }),
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

    describe('it returns the proper value for aria-describedby', () => {
      test('with isErrorMessageShown=false, isDescriptionShown=true', () => {
        const utils = render(<ExampleInput {...defaultArgs} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toEqual(utils.getByText('Description').getAttribute('id'));
      });

      test('with isErrorMessageShown=true isDescriptionShown=true', () => {
        const args = {
          ...defaultArgs,
          isErrorMessageShown: true,
        };
        const utils = render(<ExampleInput {...args} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toContain(utils.getByText('Description').getAttribute('id'));
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toContain(utils.getByText('Error!').getAttribute('id'));
      });

      test('with isErrorMessageShown=true', () => {
        const args = {
          ...defaultArgs,
          isErrorMessageShown: true,
          isDescriptionShown: false,
        };
        const utils = render(<ExampleInput {...args} />);
        expect(
          utils.getByRole('textbox').getAttribute('aria-describedby'),
        ).toEqual(utils.getByText('Error!').getAttribute('id'));
      });
    });
  });
});
