import { FormFieldState } from '@leafygreen-ui/form-field';
import { allEqual } from '@leafygreen-ui/lib';

import { NotificationProps, State } from './PasswordInput.types';

/**
 * Utility function that takes in an array of `NotificationProps` objects to compute the overall input state.
 *
 * Returns a `States` value
 *
 * @param stateNotifications `Array<NotificationProps>`
 */
export function getStateFromArray(
  stateNotifications: Array<NotificationProps>,
): State {
  if (stateNotifications.length === 0) return State.None;

  const statesArray: Array<State> = (
    stateNotifications as Array<NotificationProps>
  ).map((notification: NotificationProps) => notification.state);

  if (statesArray.length === 1) return statesArray[0];
  if (allEqual(statesArray)) return statesArray[0];
  if (statesArray.includes(State.Error)) return State.Error;
  if (statesArray.includes(State.Warning)) return State.Warning;

  return State.None;
}

/**
 * Utility function that takes a value of `State` and converts to a value of `FormFieldState`
 *
 * @param state `State`
 * @returns a value of `FormFieldState`
 */
export function convertStateToFormFieldState(state: State): FormFieldState {
  if (state === State.Error || state === State.Warning) {
    return FormFieldState.Error;
  }

  if (state === State.Valid) {
    return FormFieldState.Valid;
  }

  return FormFieldState.None;
}
