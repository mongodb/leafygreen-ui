import { NotificationProps, States } from './PasswordInput.types';

export function allEqual(arr: Array<any>) {
  return new Set(arr).size == 1;
}

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
