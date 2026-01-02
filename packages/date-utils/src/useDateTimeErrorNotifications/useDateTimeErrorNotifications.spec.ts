import { act, renderHook } from '@leafygreen-ui/testing-lib';
import {
  useDateTimeErrorNotifications,
  UseDateTimeErrorNotificationsProps,
} from './useDateTimeErrorNotifications';
import { DateTimeState } from '../types';

const renderUseDateTimeErrorNotifications = (
  props?: Partial<UseDateTimeErrorNotificationsProps>,
) => {
  const { result, rerender: _rerender } = renderHook(
    props => useDateTimeErrorNotifications(props),
    {
      initialProps: { ...props },
    },
  );

  const rerender = (newProps: Partial<UseDateTimeErrorNotificationsProps>) =>
    _rerender({ ...props, ...newProps });

  return { result, rerender };
};

describe('useDateTimeErrorNotifications', () => {
  describe('default behavior', () => {
    test('returns a state notification with state None and an empty message', () => {
      const { result } = renderUseDateTimeErrorNotifications();
      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.None,
        message: '',
      });
    });

    test('returns clearInternalErrorMessage and setInternalErrorMessage functions', () => {
      const { result } = renderUseDateTimeErrorNotifications();
      expect(typeof result.current.clearInternalErrorMessage).toBe('function');
      expect(typeof result.current.setInternalErrorMessage).toBe('function');
    });
  });

  describe('external state handling', () => {
    test('returns None state when provided', () => {
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.None,
      });
      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.None,
        message: '',
      });
    });

    test('returns Error state when provided', () => {
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
      });
      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: '',
      });
    });

    test('returns Error state with error message when both provided', () => {
      const errorMessage = 'This is an external error';
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
        externalErrorMessage: errorMessage,
      });
      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: errorMessage,
      });
    });

    test('updates when external state changes', () => {
      const errorMessage = 'This is an external error';
      const { result, rerender } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.None,
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.None,
        message: '',
      });

      rerender({
        externalState: DateTimeState.Error,
        externalErrorMessage: errorMessage,
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: errorMessage,
      });
    });

    test('updates when external error message changes', () => {
      const errorMessage = 'This is an external error';
      const newErrorMessage = 'This is a new external error';
      const { result, rerender } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
        externalErrorMessage: errorMessage,
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: errorMessage,
      });

      rerender({
        externalState: DateTimeState.Error,
        externalErrorMessage: newErrorMessage,
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: newErrorMessage,
      });
    });
  });

  describe('internal state handling', () => {
    test('sets internal error message', () => {
      const { result } = renderUseDateTimeErrorNotifications();
      const errorMessage = 'Internal validation error';

      act(() => {
        result.current.setInternalErrorMessage(errorMessage);
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: errorMessage,
      });
    });

    test('clears internal error message', () => {
      const { result } = renderUseDateTimeErrorNotifications();
      const errorMessage = 'Internal validation error';

      act(() => {
        result.current.setInternalErrorMessage(errorMessage);
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: errorMessage,
      });

      act(() => {
        result.current.clearInternalErrorMessage();
      });
      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.None,
        message: '',
      });
    });

    test('updates internal error message when set multiple times', () => {
      const firstErrorMessage = 'First internal error';
      const secondErrorMessage = 'Second internal error';
      const { result } = renderUseDateTimeErrorNotifications();

      act(() => {
        result.current.setInternalErrorMessage(firstErrorMessage);
      });

      expect(result.current.stateNotification.message).toBe(firstErrorMessage);

      act(() => {
        result.current.setInternalErrorMessage(secondErrorMessage);
      });

      expect(result.current.stateNotification.message).toBe(secondErrorMessage);
    });
  });

  describe('external vs internal error priority', () => {
    test('external error takes precedence over internal error', () => {
      const externalErrorMessage = 'External error';
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
        externalErrorMessage: externalErrorMessage,
      });

      act(() => {
        result.current.setInternalErrorMessage('Internal error');
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: externalErrorMessage,
      });
    });

    test('internal error takes precedence over external error without message', () => {
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
      });

      act(() => {
        result.current.setInternalErrorMessage('Internal error');
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: 'Internal error',
      });
    });

    test('external error without message and no internal error should return empty message', () => {
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: '',
      });
    });

    test('when external state is None, internal error should be used', () => {
      const internalErrorMessage = 'Internal validation failed';
      const { result } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.None,
      });

      act(() => {
        result.current.setInternalErrorMessage(internalErrorMessage);
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: internalErrorMessage,
      });
    });

    test('when external state changes from Error to None, internal error takes precedence', () => {
      const externalErrorMessage = 'External error message';
      const internalErrorMessage = 'Internal error';
      const { result, rerender } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
        externalErrorMessage: externalErrorMessage,
      });

      act(() => {
        result.current.setInternalErrorMessage(internalErrorMessage);
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: externalErrorMessage,
      });

      rerender({
        externalState: DateTimeState.None,
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: internalErrorMessage,
      });
    });

    test('when external error message is cleared, should fall back to internal error', () => {
      const externalErrorMessage = 'External error message';
      const internalErrorMessage = 'Internal error';
      const { result, rerender } = renderUseDateTimeErrorNotifications({
        externalState: DateTimeState.Error,
        externalErrorMessage: externalErrorMessage,
      });

      act(() => {
        result.current.setInternalErrorMessage(internalErrorMessage);
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: externalErrorMessage,
      });

      rerender({
        externalErrorMessage: '',
      });

      expect(result.current.stateNotification).toEqual({
        state: DateTimeState.Error,
        message: internalErrorMessage,
      });
    });
  });

  test('handles undefined external state', () => {
    const { result } = renderUseDateTimeErrorNotifications({
      externalState: undefined,
    });

    expect(result.current.stateNotification.state).toBe(DateTimeState.None);
  });
});
