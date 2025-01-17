import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { renderHook } from '@leafygreen-ui/testing-lib';

import {
  AriaLabelProps,
  AriaLabelPropsWithChildren,
  AriaLabelPropsWithLabel,
} from './AriaLabelProps';
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
  /* eslint-disable jest/no-disabled-tests */
  describe.skip('AriaLabelProps types', () => {
    test('AriaLabelProps', () => {
      // @ts-expect-error - empty object not allowed
      const empty: AriaLabelProps = {};
      const aria_label: AriaLabelProps = {
        'aria-label': 'some label',
      };
      const labelledby: AriaLabelProps = {
        'aria-labelledby': '#some-id',
      };
      const both_aria: AriaLabelProps = {
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      [empty, aria_label, labelledby, both_aria]; // Avoid TS error
    });
    test('AriaLabelPropsWithLabel', () => {
      // @ts-expect-error
      const empty: AriaLabelPropsWithLabel = {};
      const aria_label: AriaLabelPropsWithLabel = {
        'aria-label': 'some label',
      };
      const labelledby: AriaLabelPropsWithLabel = {
        'aria-labelledby': '#some-id',
      };
      const both_aria: AriaLabelPropsWithLabel = {
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      const label_only: AriaLabelPropsWithLabel = {
        label: 'some label',
      };
      const label_and_aria: AriaLabelPropsWithLabel = {
        label: 'some label',
        'aria-label': 'some label',
      };
      const label_and_labelledby: AriaLabelPropsWithLabel = {
        label: 'some label',
        'aria-labelledby': '#some-id',
      };
      const all: AriaLabelPropsWithLabel = {
        label: 'some label',
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      [
        empty,
        aria_label,
        labelledby,
        both_aria,
        label_only,
        label_and_aria,
        label_and_labelledby,
        all,
      ]; // Avoid TS error
    });
    test('AriaLabelPropsWithChildren', () => {
      // @ts-expect-error - empty object not allowed
      const empty: AriaLabelPropsWithChildren = {};
      const label: AriaLabelPropsWithChildren = {
        'aria-label': 'some label',
      };
      const labelledby: AriaLabelPropsWithChildren = {
        'aria-labelledby': '#some-id',
      };
      const both_aria: AriaLabelPropsWithChildren = {
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };
      const children: AriaLabelPropsWithChildren = {
        children: 'some label',
      };
      const label_and_children: AriaLabelPropsWithChildren = {
        children: 'some label',
        'aria-label': 'some label',
      };
      const labelledby_and_children: AriaLabelPropsWithChildren = {
        children: 'some label',
        'aria-labelledby': '#some-id',
      };
      const all: AriaLabelPropsWithChildren = {
        children: 'some label',
        'aria-label': 'some label',
        'aria-labelledby': '#some-id',
      };

      [
        empty,
        label,
        labelledby,
        both_aria,
        children,
        label_and_children,
        labelledby_and_children,
        all,
      ]; //
    });
  });
});
