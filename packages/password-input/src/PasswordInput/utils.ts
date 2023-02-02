import { NotificationProps, States } from './PasswordInput.types';

/**
 * Utility function that checks if the values in an array are all equal
 *
 * Returns a boolean
 *
 * @param arr `Array<States>`
 */
export function allEqual(arr: Array<States>): boolean {
  return new Set(arr).size == 1;
}

/**
 * Utility function that takes in an array of `NotificationProps` objects to compute the overall input state.
 *
 * Returns a `States` value
 *
 * @param stateNotifications `Array<NotificationProps>`
 */
export function getStateFromArray(
  stateNotifications: Array<NotificationProps>,
): States {
  if (stateNotifications.length === 0) return States.None;

  const statesArray: Array<States> = (
    stateNotifications as Array<NotificationProps>
  ).map((notification: NotificationProps) => notification.state);

  if (statesArray.length === 1) return statesArray[0];
  if (allEqual(statesArray)) return statesArray[0];
  if (statesArray.includes(States.Error)) return States.Error;
  if (statesArray.includes(States.Warning)) return States.Warning;

  return States.None;
}
