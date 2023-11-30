import { useMemo, useState } from 'react';

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
  // TODO: pass in external `state` prop
): UseDatePickerErrorNotificationsReturnObject => {
  const [internalStateNotification, setInternalStateNotification] =
    useState<StateNotification>({
      state: DatePickerState.None,
      message: '',
    });

  /**
   * Update the external state notification when the external message (or state) changes
   * */
  const externalStateNotification = useMemo<StateNotification>(() => {
    return {
      state: getErrorState(errorMessage),
      message: errorMessage || '',
    };
  }, [errorMessage]);

  /**
   * Calculate the stateNotification based on external internal states.
   */
  const stateNotification = useMemo<StateNotification>(() => {
    if (externalStateNotification.state === DatePickerState.Error) {
      return externalStateNotification;
    } else return internalStateNotification;
  }, [externalStateNotification, internalStateNotification]);

  // const [stateNotification, _setStateNotification] =
  //   useState<StateNotification>({
  //     state: getErrorState(errorMessage),
  //     message: errorMessage || '',
  //   });

  // /**
  //  * Calculates & sets the stateNotification
  //  * based on external & internal states
  //  */
  // const setStateNotification = useCallback(
  //   (notification: StateNotification) => {
  //     // If either internal or external state is Error,
  //     // then there's an error
  //     const newState = [
  //       notification.state,
  //       getErrorState(errorMessage),
  //     ].includes(DatePickerState.Error)
  //       ? DatePickerState.Error
  //       : DatePickerState.None;

  //     const newMessage =
  //       newState === notification.state
  //         ? notification.message
  //         : errorMessage || '';

  //     _setStateNotification({
  //       state: newState,
  //       message: newMessage,
  //     });
  //   },
  //   [errorMessage],
  // );

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

  return {
    stateNotification,
    setInternalErrorMessage,
    clearInternalErrorMessage,
  };
};
