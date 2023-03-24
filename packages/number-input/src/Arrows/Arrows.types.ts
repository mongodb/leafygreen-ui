import { Direction } from '../NumberInput/NumberInput.types';

export interface ArrowsProps {
  /**
   * Determines if buttons should be disabled
   */
  disabled: boolean;

  /**
   * Callback called when button is clicked
   */
  handleClick: (value: Direction) => void;

  /**
   * Callback called when up/down arrows are pressed
   */
  handleArrowKeyDown: (e: React.KeyboardEvent) => void;
}

export interface ArrowProps extends ArrowsProps {
  direction: Direction;
}
