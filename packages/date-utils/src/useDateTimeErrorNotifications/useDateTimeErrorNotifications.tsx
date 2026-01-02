import { useMemo, useState } from 'react';

import { DateTimeState, StateNotification } from '../types';

export interface UseDateTimeErrorNotificationsReturnObject {
  stateNotification: StateNotification;
  setInternalErrorMessage: (msg: string) => void;
  clearInternalErrorMessage: () => void;
}

export interface UseDateTimeErrorNotificationsProps {
  externalState?: DateTimeState;
  externalErrorMessage?: string;
}

/**
 * A hook for managing error notifications for date/time form inputs.
 * Works with DatePicker, TimeInput, and any other component using DateTimeState.
 *
 * Manages both external (prop-based) and internal (validation-based) error states,
 * with external errors taking precedence over internal errors.
 */
export const useDateTimeErrorNotifications = ({
  externalState,
  externalErrorMessage,
}: UseDateTimeErrorNotificationsProps): UseDateTimeErrorNotificationsReturnObject => {
  /**
   * An external state notification object,
   * updated when the external message or state prop changes
   */
  const externalStateNotification = useMemo<StateNotification>(() => {
    const state = externalState ?? DateTimeState.None;
    const message =
      externalState === DateTimeState.Error ? externalErrorMessage ?? '' : '';

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
      state: DateTimeState.None,
      message: '',
    });

  /**
   * Removes the internal error message
   */
  const clearInternalErrorMessage = () => {
    setInternalStateNotification({
      state: DateTimeState.None,
      message: '',
    });
  };

  /**
   * Sets an internal error message
   */
  const setInternalErrorMessage = (msg: string) => {
    setInternalStateNotification({
      state: DateTimeState.Error,
      message: msg,
    });
  };

  /**
   * Calculate the stateNotification to use based on external & internal states.
   * External errors take precedence over internal errors.
   */
  const stateNotification = useMemo<StateNotification>(() => {
    if (externalStateNotification.state === DateTimeState.Error) {
      if (
        !externalStateNotification.message &&
        internalStateNotification.state === DateTimeState.Error
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
