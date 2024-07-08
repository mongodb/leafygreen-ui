import { Direction, Size } from '../NumberInput/NumberInput.types';

interface BaseArrowProps {
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
export interface ArrowsProps extends BaseArrowProps {
  /**
   * Determines horizontal positioning of arrows
   */
  size: Size;
}

export interface ArrowProps extends BaseArrowProps {
  /**
   * Direction of arrow: increment or decrement
   */
  direction: Direction;
}
