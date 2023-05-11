import React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { axe } from 'jest-axe';

import { AriaLabelProps, AriaLabelPropsWithLabel } from './AriaLabelProps';
import {
  prefersReducedMotion,
  useAccessibleForm,
  validateAriaLabelProps,
  VisuallyHidden,
} from '.';

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
      const { result } = renderHook((_: string) => useAccessibleForm(_), {
        initialProps: inputId,
      });

      expect(result.current.inputProps.id).toEqual(inputId);
      expect(result.current.inputProps.id).toEqual(
        result.current.labelProps.htmlFor,
      );
      expect(result.current.inputProps['aria-labelledby']).toEqual(
        result.current.labelProps.id,
      );
    });

    test('when no id is supplied to hook', () => {
      const { result } = renderHook((_: string) => useAccessibleForm(_));

      expect(result.current.inputProps.id).toEqual(
        result.current.labelProps.htmlFor,
      );
      expect(result.current.inputProps['aria-labelledby']).toEqual(
        result.current.labelProps.id,
      );
    });

    test('updates _ correctly when the parameter passed to the hook changes', () => {
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

  let consoleSpy: jest.SpyInstance;

  describe('validateAriaLabelProps', () => {
    beforeEach(
      () =>
        (consoleSpy = jest
          .spyOn(console, 'error')
          .mockImplementation(() => {})),
    );

    afterEach(() => jest.clearAllMocks());

    test('when prop object does not contain valid _', () => {
      validateAriaLabelProps({}, 'TestComponent');
      expect(consoleSpy).toHaveBeenCalledWith(
        'For screen-reader accessibility, aria-label or aria-labelledby must be provided to TestComponent.',
      );
    });
  });

  describe('prefersReducedMotion', () => {
    test('when passed a valid input, returns a string with length greater than 0', () => {
      expect(prefersReducedMotion('color: blue;').length > 0).toBeTruthy();
      expect(prefersReducedMotion('').length > 0).toBeTruthy();
    });

    test('when passed an invalid input, returns a string', () => {
      // @ts-expect-error
      expect(prefersReducedMotion(null)).toEqual('');

      // @ts-expect-error
      expect(prefersReducedMotion(undefined)).toEqual('');

      // @ts-expect-error
      expect(prefersReducedMotion(24)).toEqual('');

      // @ts-expect-error
      expect(prefersReducedMotion([])).toEqual('');

      // @ts-expect-error
      expect(prefersReducedMotion({})).toEqual('');
    });
  });

  // testing types
  /* eslint-disable jest/no-disabled-tests, jest/expect-expect, @typescript-eslint/no-unused-vars */
  describe.skip('AriaLabelProps types', () => {
    test('AriaLabelProps', () => {
      // @ts-expect-error
      const _1: AriaLabelProps = {};
      const _2: AriaLabelProps = {
        'aria-label': 'some label',
      };
      const _3: AriaLabelProps = {
        'aria-labelledby': '#some-id',
      };
      const _4: AriaLabelProps = {
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      [_1, _2, _3, _4]; // Avoid TS error
    });
    test('AriaLabelPropsWithLabel', () => {
      // @ts-expect-error
      const _1: AriaLabelPropsWithLabel = {};
      const _2: AriaLabelPropsWithLabel = {
        'aria-label': 'some label',
      };
      const _3: AriaLabelPropsWithLabel = {
        'aria-labelledby': '#some-id',
      };
      const _4: AriaLabelPropsWithLabel = {
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      const _5: AriaLabelPropsWithLabel = {
        label: 'some label',
      };
      const _6: AriaLabelPropsWithLabel = {
        label: 'some label',
        'aria-label': 'some label',
      };
      const _7: AriaLabelPropsWithLabel = {
        label: 'some label',
        'aria-labelledby': '#some-id',
      };
      const _8: AriaLabelPropsWithLabel = {
        label: 'some label',
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      [_1, _2, _3, _4, _5, _6, _7, _8]; // Avoid TS error
    });
  });
});
