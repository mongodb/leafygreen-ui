import { Size } from '../TimeInput/TimeInput.types';

export interface UnitOption {
  displayName: string;
  value: string;
}

export interface TimeInputSelectProps {
  /**
   * Id for the select component.
   */
  id?: string;

  /**
   * The controlled value of the select input.
   */
  unit: string;

  /**
   * Callback fired when the unit option changes.
   */
  onChange: (unit: UnitOption) => void;

  /**
   * The className for the select component.
   */
  className?: string;
}
