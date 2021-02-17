import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { axe } from 'jest-axe';
import { VisuallyHidden, useAccessibleForm } from '.';

describe('packages/a11y', () => {
  describe('VisuallyHidden', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = render(
        <VisuallyHidden>test content</VisuallyHidden>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('useAccessibleFormField', () => {
    test('when id is supplied to hook', () => {
      const inputId = 'text-input-id';
      const { result } = renderHook(
        (props: string) => useAccessibleForm(props),
        { initialProps: inputId },
      );

      expect(result.current.inputProps.id).toEqual(inputId);
      expect(result.current.inputProps.id).toEqual(
        result.current.labelProps.htmlFor,
      );
      expect(result.current.inputProps['aria-labelledby']).toEqual(
        result.current.labelProps.id,
      );
    });

    test('when no id is supplied to hook', () => {
      const { result } = renderHook((props: string) =>
        useAccessibleForm(props),
      );

      expect(result.current.inputProps.id).toEqual(
        result.current.labelProps.htmlFor,
      );
      expect(result.current.inputProps['aria-labelledby']).toEqual(
        result.current.labelProps.id,
      );
    });

    test('updates props correctly when the parameter passed to the hook changes', () => {
      let inputId = 'text-input-id';

      const { result, rerender } = renderHook(() => useAccessibleForm(inputId));

      expect(result.current.inputProps.id).toEqual(inputId);
      expect(result.current.inputProps.id).toEqual(
        result.current.labelProps.htmlFor,
      );
      expect(result.current.inputProps['aria-labelledby']).toEqual(
        result.current.labelProps.id,
      );

      inputId = 'second-render-id';
      rerender();
      expect(result.current.inputProps.id).toEqual(inputId);
      expect(result.current.inputProps.id).toEqual(
        result.current.labelProps.htmlFor,
      );
      expect(result.current.inputProps['aria-labelledby']).toEqual(
        result.current.labelProps.id,
      );
    });
  });
});
