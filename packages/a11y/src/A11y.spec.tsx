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

      expect(result.current.inputProps).toEqual({
        id: inputId,
        ['aria-labelledby']: 'label-0',
      });
      expect(result.current.labelProps).toEqual({
        id: 'label-0',
        htmlFor: inputId,
      });
    });

    test('when no id is supplied to hook', () => {
      const { result } = renderHook((props: string) =>
        useAccessibleForm(props),
      );

      expect(result.current.inputProps).toEqual({
        id: 'input-0',
        ['aria-labelledby']: 'label-1',
      });
      expect(result.current.labelProps).toEqual({
        id: 'label-1',
        htmlFor: 'input-0',
      });
    });
  });
});
