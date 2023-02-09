import PropTypes from 'prop-types';

import { NotificationProps, State } from './PasswordInput.types';

/**
 * Utility function that checks if the values in an array are all equal
 *
 * Returns a boolean
 *
 * @param arr `Array<States>`
 */
export function allEqual(arr: Array<State>): boolean {
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
 * Custom PropType check that ensures that the stateNotification prop has the correct prop type.
 */
export const stateNotificationCheck = function (
  props: { [x: string]: any },
  propName: string,
  ...rest: ['componentName', 'location', 'propFullName']
) {
  const stateStringProp = PropTypes.oneOf(Object.values(State)).isRequired;
  const arrayProp = PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.oneOf(Object.values(State)).isRequired,
      notification: PropTypes.string.isRequired,
    }),
  );
  const ariaProp = 'aria-describedby';

  const stateStringType = stateStringProp(props, propName, ...rest);
  const arrayType = arrayProp(props, propName, ...rest);

  if (typeof props[ariaProp] === 'string') return stateStringType;
  if (typeof props[ariaProp] === 'undefined') return arrayType;

  return new Error('Error');
};
