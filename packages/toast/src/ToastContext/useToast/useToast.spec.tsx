import React, { PropsWithChildren, useEffect } from 'react';
import { render } from '@testing-library/react';
import { cleanup } from '@testing-library/react-hooks';

import { renderHook, waitForState } from '@leafygreen-ui/testing-lib';

import { ToastProps, Variant } from '../../Toast.types';
import { ToastContext } from '../ToastContext';
import { useToastReducer } from '../ToastReducer';
import {
  makeToast,
  makeToastStack,
  ToastProvider,
  ToastStack,
  useToast,
} from '..';

const ToastProviderMock = ({ children }: PropsWithChildren<{}>) => {
  const { stack, ...toastFns } = useToastReducer();
  return (
    <ToastContext.Provider value={{ ...toastFns, getStack: () => stack }}>
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
      test('pushToast => ToastId', async () => {
        const { result } = renderHook(useToast, {
          wrapper: ToastProviderMock,
        });
        const { pushToast } = result.current;
        const toastId = await waitForState(() => pushToast({ title: 'test' }));
        expect(toastId).toEqual(expect.stringContaining('toast-'));
      });

      test('getToast => ToastProps', async () => {
        const { result, rerender } = renderHook(useToast, {
          wrapper: ToastProviderMock,
        });
        const { pushToast, getToast } = result.current;

        const toastId = await waitForState(() => pushToast({ title: 'test' }));
        rerender();
        expect(getToast(toastId)).toEqual(
          expect.objectContaining({ title: 'test' }),
        );
      });

      test('updateToast => ToastProps', async () => {
        const { result, rerender } = renderHook(useToast, {
          wrapper: ToastProviderMock,
        });
        const { pushToast, updateToast } = result.current;
        const toastId = await waitForState(() =>
          pushToast({
            title: 'test',
            variant: Variant.Progress,
            progress: 0,
          }),
        );
        const updatedToast = await waitForState(() => {
          rerender();
          return updateToast(toastId, {
            progress: 0.5,
          });
        });

        expect(updatedToast).toEqual(
          expect.objectContaining({ progress: 0.5 }),
        );
      });

      test('popToast => ToastProps', async () => {
        const { result, rerender } = renderHook(useToast, {
          wrapper: ToastProviderMock,
        });
        const { pushToast, popToast } = result.current;
        const toastId = await waitForState(() => pushToast({ title: 'test' }));
        rerender();
        const poppedToast = await waitForState(() => popToast(toastId));
        expect(poppedToast).toEqual(expect.objectContaining({ title: 'test' }));
      });

      test('getStack => ToastStack (Map)', async () => {
        const { result, rerender } = renderHook(useToast, {
          wrapper: ToastProviderMock,
        });
        const { pushToast, getStack } = result.current;
        await waitForState(() => pushToast({ title: 'test' }));
        rerender();

        expect(getStack()).toBeDefined();
        expect(getStack()?.size).toEqual(1);
      });

      test('clearStack => void', async () => {
        const { result } = renderHook(useToast, {
          wrapper: ToastProviderMock,
        });
        const { pushToast, clearStack, getStack } = result.current;
        await waitForState(() => pushToast({ title: 'test' }));
        const clearedStack = await waitForState(() => clearStack());
        expect(clearedStack).toBeUndefined();
        expect(getStack()?.size).toEqual(0);
      });
    });

    test('returned functions are the same reference each render', () => {
      const effectCall = jest.fn();
      const initialValue: ToastStack = makeToastStack([
        makeToast({ title: 'test' }),
      ]);

      const Example = () => {
        const { pushToast } = useToast();

        useEffect(() => {
          effectCall();
          pushToast({ title: 'toast', id: 'lg-toast' });
        }, [pushToast]);

        return (
          <ToastProvider initialValue={initialValue}>
            <div data-testid="div" />
          </ToastProvider>
        );
      };

      render(<Example />);

      expect(effectCall).toHaveBeenCalledTimes(1);
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
