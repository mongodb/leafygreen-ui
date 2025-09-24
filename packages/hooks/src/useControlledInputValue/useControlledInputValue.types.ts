import { ChangeEventHandler, MutableRefObject } from 'react';

import { ControlledValueReturnObject } from '../useControlledValue/useControlledValue.types';

type PickedControlledValueReturnObject<T extends any> = Pick<
  ControlledValueReturnObject<T>,
  'isControlled' | 'value' | 'setUncontrolledValue'
>;

export interface ControlledInputValueReturnObject<T extends any>
  extends PickedControlledValueReturnObject<T> {
  /** A ChangeEventHandler to assign to any onChange event */
  handleChange: ChangeEventHandler<any>;

  /**
   * A setter for the internal value.
   * Does not change the controlled value if the provided value has not changed.
   * Prefer using `updateValue` to programmatically set the value.
   * @internal
   */
  setUncontrolledValue: React.Dispatch<React.SetStateAction<T>>;

  /**
   * Synthetically triggers a change event within the `handleChange` callback.
   * Signals that the value should change for controlled components,
   * and updates the internal value for uncontrolled components
   */
  updateValue: (newVal: T, ref: MutableRefObject<any>) => void;
}
