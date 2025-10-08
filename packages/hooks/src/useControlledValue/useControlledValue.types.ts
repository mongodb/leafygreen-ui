import { ChangeEventHandler, MutableRefObject } from 'react';

import { ControlledReturnObject } from '../useControlled/useControlled.types';

type PickedControlledReturnObject<T extends any> = Pick<
  ControlledReturnObject<T>,
  'isControlled' | 'value' | 'setUncontrolledValue'
>;

export interface ControlledValueReturnObject<T extends any>
  extends PickedControlledReturnObject<T> {
  /** A ChangeEventHandler to assign to any onChange event */
  handleChange: ChangeEventHandler<any>;

  /**
   * Synthetically triggers a change event within the `handleChange` callback.
   * Signals that the value should change for controlled components,
   * and updates the internal value for uncontrolled components
   */
  updateValue: (newVal: T, ref: MutableRefObject<any>) => void;
}
