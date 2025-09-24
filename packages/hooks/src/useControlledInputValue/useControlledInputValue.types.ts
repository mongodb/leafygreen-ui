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
   * Synthetically triggers a change event within the `handleChange` callback.
   * Signals that the value should change for controlled components,
   * and updates the internal value for uncontrolled components
   */
  updateValue: (newVal: T, ref: MutableRefObject<any>) => void;
}
