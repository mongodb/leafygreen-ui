import { useCallback, useEffect, useState } from 'react';

import { DatePickerState } from '../../types';

import { StateNotification } from './DatePickerContext.types';

/** Gets an error state given the existence of a message */
const getErrorState = (msg?: string): DatePickerState => {
  return msg ? DatePickerState.Error : DatePickerState.None;
};

export interface UseDatePickerErrorNotificationsReturnObject {
  stateNotification: StateNotification;
  setInternalErrorMessage: (msg: string) => void;
  clearInternalErrorMessage: () => void;
}

export const useDatePickerErrorNotifications = (
  errorMessage?: string,
): UseDatePickerErrorNotificationsReturnObject => {
  const [stateNotification, _setStateNotification] =
    useState<StateNotification>({
      state: getErrorState(errorMessage),
      message: errorMessage || '',
    });

  const setStateNotification = useCallback(
    (notification: StateNotification) => {
      // If there's either a user-defined error state
      // or an internally defined one,
      // use that value
      const newState = [
        notification.state,
        getErrorState(errorMessage),
      ].includes(DatePickerState.Error)
        ? DatePickerState.Error
        : DatePickerState.None;

      const newMessage =
        newState === notification.state
          ? notification.message
          : errorMessage || '';

      _setStateNotification({
        state: newState,
        message: newMessage,
      });
    },
    [errorMessage],
  );

  const clearInternalErrorMessage = () => {
    setStateNotification({
      state: DatePickerState.None,
      message: '',
    });
  };

  const setInternalErrorMessage = (msg: string) => {
    setStateNotification({
      state: DatePickerState.Error,
      message: msg,
    });
  };

  // If the error message changes, use that message
  useEffect(() => {
    setStateNotification({
      state: getErrorState(errorMessage),
      message: errorMessage || '',
    });
  }, [errorMessage, setStateNotification]);

  return {
    stateNotification,
    setInternalErrorMessage,
    clearInternalErrorMessage,
  };
};
