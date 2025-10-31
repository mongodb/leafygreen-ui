export interface ControlledReturnObject<T extends any> {
  /** Whether the value is controlled */
  isControlled: boolean;

  /** The controlled or uncontrolled value */
  value: T;

  /**
   * Either updates the uncontrolled value,
   * or calls the provided `onChange` callback.
   * Accepts either a direct value or a function that receives the previous value.
   */
  updateValue: (newVal: React.SetStateAction<T>) => void;

  /**
   * A setter for the internal value.
   * Does not change the controlled value if the provided value has not changed.
   * Prefer using `updateValue` to programmatically set the value.
   * @internal
   */
  setUncontrolledValue: React.Dispatch<React.SetStateAction<T>>;
}
