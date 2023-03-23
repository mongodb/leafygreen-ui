import { Direction } from '../NumberInput/NumberInput.types';

export interface ArrowProps {
  /**
   * Determines if buttons should be disabled
   */
  disabled: boolean;

  /**
   * Callback called on button interaction
   */
  handleValueChange: (value: Direction) => void;
}
