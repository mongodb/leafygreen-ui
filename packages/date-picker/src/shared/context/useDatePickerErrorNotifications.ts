import { useMemo, useState } from 'react';

import { DatePickerState } from '../types';

import { StateNotification } from './SharedDatePickerContext.types';

export interface UseDatePickerErrorNotificationsReturnObject {
  stateNotification: StateNotification;
  setInternalErrorMessage: (msg: string) => void;
  clearInternalErrorMessage: () => void;
}

export const useDatePickerErrorNotifications = (
  externalState?: DatePickerState,
  externalErrorMessage?: string,
): UseDatePickerErrorNotificationsReturnObject => {
  /**
   * An external state notification object,
   * updated when the external message or state prop changes
   */
  const externalStateNotification = useMemo<StateNotification>(() => {
    const state = externalState ?? DatePickerState.None;
    const message =
      externalState === DatePickerState.Error ? externalErrorMessage ?? '' : '';

    return {
      state,
      message,
    };
  }, [externalErrorMessage, externalState]);

  /**
   * An internal state notification used to handle internal validation (e.g. if date is in range)
   */
  const [internalStateNotification, setInternalStateNotification] =
    useState<StateNotification>({
      state: DatePickerState.None,
      message: '',
    });

  /**
   * Removes the internal error message
   */
  const clearInternalErrorMessage = () => {
    setInternalStateNotification({
      state: DatePickerState.None,
      message: '',
    });
  };

  /**
   * Sets an internal error message
   */
  const setInternalErrorMessage = (msg: string) => {
    setInternalStateNotification({
      state: DatePickerState.Error,
      message: msg,
    });
  };

  /**
   * Calculate the stateNotification to use based on external & internal states.
   * External errors take precedence over internal errors.
   */
  const stateNotification = useMemo<StateNotification>(() => {
    if (externalStateNotification.state === DatePickerState.Error) {
      if (
        !externalStateNotification.message &&
        internalStateNotification.state === DatePickerState.Error
      ) {
        return internalStateNotification;
      } else {
        return externalStateNotification;
      }
    } else {
      return internalStateNotification;
    }
  }, [externalStateNotification, internalStateNotification]);

  return {
    stateNotification,
    setInternalErrorMessage,
    clearInternalErrorMessage,
  };
};
