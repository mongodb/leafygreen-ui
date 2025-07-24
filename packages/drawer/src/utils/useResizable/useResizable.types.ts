export const Position = {
  Left: 'left',
  Right: 'right',
  Top: 'top',
  Bottom: 'bottom',
} as const;

export type Position = (typeof Position)[keyof typeof Position];

export const SizeGrowth = {
  Increase: 'increase',
  Decrease: 'decrease',
} as const;

export type SizeGrowth = (typeof SizeGrowth)[keyof typeof SizeGrowth];

export interface ResizableProps {
  /**
   * Whether the resizable feature is enabled.
   * @default false
   */
  enabled?: boolean;

  /**
   * The initial size of the resizable element.
   * If not provided, the element will take its default size.
   */
  initialSize: number;

  /**
   * The minimum size the resizable element can be resized to.
   * If not provided, there will be no minimum size restriction.
   */
  minSize: number;

  /**
   * The maximum size the resizable element can be resized to.
   * If not provided, there will be no maximum size restriction.
   */
  maxSize: number;

  /**
   * Callback function that is called when the resizable element is resized.
   * This can be used to perform any actions based on the new size.
   */
  onResize?: (size: number) => void;

  /**
   * The percentage of the viewport that the resizable element should occupy at maximum.
   * This can be used to ensure the element does not exceed a certain size relative to the viewport.
   * If provided, this percentage-based maximum will override the maxSize prop if the calculated pixel value is smaller.
   */
  maxViewportPercentages: number;

  /**
   * The position of the element to which the resizer handle is attached.
   * This is used to determine the direction in which the element can be resized.
   */
  position: Position;
}

export interface ResizerProps {
  onMouseDown: (e: React.MouseEvent | MouseEvent) => void;
  tabIndex: number;
  onFocus: () => void;
  onBlur: () => void;
  className?: string;
}

export interface ResizableReturn<T extends HTMLElement = HTMLElement> {
  /**
   * The current width and height of the resizable element.
   */
  size: number;

  /**
   * Function to set the size of the resizable element.
   * Accepts a Size object with width and height properties.
   */
  setSize: React.Dispatch<React.SetStateAction<number>>;

  /**
   * Boolean indicating whether the resizable element is currently being resized.
   */
  isResizing: boolean;

  /**
   * A function that returns the props needed to be spread onto the resizer element.
   */
  getResizerProps: () => ResizerProps | undefined;

  /**
   * A ref to the resizable element that can be used to attach the resizer functionality.
   * Generic type allows for specific HTML element types like HTMLDialogElement or HTMLDivElement.
   */
  resizableRef: React.RefObject<T>;
}
