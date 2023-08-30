import React, { PropsWithChildren, useEffect } from 'react';
import { render } from '@testing-library/react';
import {
  cleanup,
  renderHook,
  RenderHookResult,
} from '@testing-library/react-hooks';

import { ToastProps, Variant } from '../../Toast.types';
import { ToastContext } from '../ToastContext';
import { ToastContextProps } from '../ToastContext.types';
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
      let current: RenderHookResult<
        unknown,
        ToastContextProps
      >['result']['current'];

      beforeEach(() => {
        const { result } = renderHook(useToast, { wrapper: ToastProviderMock });
        current = result.current;
      });

      test('pushToast => ToastId', () => {
        const { pushToast } = current;
        const toastId = pushToast({ title: 'test' });
        expect(toastId).toEqual(expect.stringContaining('toast-'));
      });

      test('getToast => ToastProps', () => {
        const { pushToast, getToast } = current;
        const toastId = pushToast({ title: 'test' });
        expect(getToast(toastId)).toEqual(
          expect.objectContaining({ title: 'test' }),
        );
      });

      test('updateToast => ToastProps', () => {
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

      test('popToast => ToastProps', () => {
        const { pushToast, popToast } = current;
        const toastId = pushToast({ title: 'test' });
        expect(popToast(toastId)).toEqual(
          expect.objectContaining({ title: 'test' }),
        );
      });

      test('getStack => ToastStack (Map)', () => {
        const { pushToast, getStack } = current;
        pushToast({ title: 'test' });

        expect(getStack()).toBeDefined();
        expect(getStack()?.size).toEqual(1);
      });

      test('clearStack => void', () => {
        const { pushToast, clearStack, getStack } = current;
        pushToast({ title: 'test' });
        expect(clearStack()).toBeUndefined();
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
