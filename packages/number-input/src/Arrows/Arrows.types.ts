import { Direction } from '../NumberInput/NumberInput.types';

export interface ArrowsProps {
  /**
   * Determines if buttons should be disabled
   */
  disabled: boolean;

  /**
   * Callback called when button is clicked
   */
  onClick: (value: Direction) => void;

  /**
   * Callback called when up/down arrows are pressed
   */
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export interface ArrowProps extends ArrowsProps {
  direction: Direction;
}
