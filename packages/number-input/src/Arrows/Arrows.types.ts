import { Direction } from '../NumberInput/NumberInput.types';

export interface ArrowsProps {
  /**
   * Determines if buttons should be disabled
   */
  disabled: boolean;

  /**
   * Callback called on button interaction
   */
  handleValueChange: (value: Direction) => void;
}

export interface ArrowProps extends ArrowsProps {
  direction: Direction;
}
