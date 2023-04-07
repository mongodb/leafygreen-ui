import React, { PropsWithChildren } from 'react';
import { cleanup, HookResult, renderHook } from '@testing-library/react-hooks';

import { ToastProps, Variant } from '../../Toast.types';
import { ToastContext } from '../ToastContext';
import { ToastContextProps } from '../ToastContext.types';
import { useToastReducer } from '../ToastReducer';

import { useToast } from '.';

const ToastProviderMock = ({ children }: PropsWithChildren<{}>) => {
  const { stack, ...toastFns } = useToastReducer();
  return (
    <ToastContext.Provider
      value={{ ...toastFns, getStack: () => stack, _hasProvider: true }}
    >
      {children}
    </ToastContext.Provider>
  );
};

/**
 * Tests the external `useToast` hook
 */
describe('packages/toast/useToast', () => {
  afterEach(cleanup);

  describe('within context', () => {
    test('returns defined functions', () => {
      const { result } = renderHook(useToast, { wrapper: ToastProviderMock });

      const {
        pushToast,
        popToast,
        updateToast,
        getToast,
        getStack,
        clearStack,
      } = result.current;

      // Note, here we're only checking the existence of the functions
      expect(pushToast).toBeDefined();
      expect(popToast).toBeDefined();
      expect(updateToast).toBeDefined();
      expect(getToast).toBeDefined();
      expect(getStack).toBeDefined();
      expect(clearStack).toBeDefined();
    });

    describe('returned functions return correct values', () => {
      let current: HookResult<ToastContextProps>['current'];

      beforeEach(() => {
        const { result } = renderHook(useToast, { wrapper: ToastProviderMock });
        current = result.current;
      });

      test('pushToast', () => {
        const { pushToast } = current;
        const toastId = pushToast({ title: 'test' });
        expect(toastId).toEqual(expect.stringContaining('toast-'));
      });

      test('getToast', () => {
        const { pushToast, getToast } = current;
        const toastId = pushToast({ title: 'test' });
        expect(getToast(toastId)).toEqual(
          expect.objectContaining({ title: 'test' }),
        );
      });

      test('updateToast', () => {
        const { pushToast, updateToast } = current;
        const toastId = pushToast({
          title: 'test',
          variant: Variant.Progress,
          progress: 0,
        });

        expect(updateToast(toastId, { progress: 0.5 })).toEqual(
          expect.objectContaining({ progress: 0.5 }),
        );
      });

      test('popToast', () => {
        const { pushToast, popToast } = current;
        const toastId = pushToast({ title: 'test' });
        expect(popToast(toastId)).toEqual(
          expect.objectContaining({ title: 'test' }),
        );
      });

      test('getStack', () => {
        const { pushToast, getStack } = current;
        pushToast({ title: 'test' });

        expect(getStack()).toBeDefined();
        expect(getStack()?.size).toEqual(1);
      });

      test('clearStack', () => {
        const { pushToast, clearStack, getStack } = current;
        pushToast({ title: 'test' });
        clearStack();
        expect(getStack()?.size).toEqual(0);
      });
    });
  });

  describe('outside context', () => {
    test('logs console warning', () => {
      jest.spyOn(global.console, 'warn').mockImplementation(() => {});
      renderHook(useToast);
      expect(console.warn).toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining(
          '`useToast` hook must be used within a `ToastProvider` context',
        ),
      );
    });

    test('returns defined functions', () => {
      const { result } = renderHook(useToast);

      const {
        pushToast,
        popToast,
        updateToast,
        getToast,
        getStack,
        clearStack,
      } = result.current;

      // Note, here we're only checking the existence of the functions
      // They will return undefined (or empty string)
      expect(pushToast).toBeDefined();
      expect(popToast).toBeDefined();
      expect(updateToast).toBeDefined();
      expect(getToast).toBeDefined();
      expect(getStack).toBeDefined();
      expect(clearStack).toBeDefined();
    });

    test('returned functions return empty values when not using context', () => {
      const { result } = renderHook(useToast);
      const {
        pushToast,
        popToast,
        updateToast,
        getToast,
        getStack,
        clearStack,
      } = result.current;

      expect(pushToast({} as ToastProps)).toBe('');
      expect(popToast('')).toBeUndefined();
      expect(updateToast('', {})).toBeUndefined();
      expect(getToast('')).toBeUndefined();
      expect(getStack()).toBeUndefined();
      expect(clearStack()).toBeUndefined();
    });
  });
});
