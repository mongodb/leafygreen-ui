export const handleType = {
  left: 'left',
  right: 'right',
} as const;

export type HandleType = (typeof handleType)[keyof typeof handleType];

export type ResizableProps = {
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
   * The threshold for closing the resizable element.
   * If the size is below this threshold, the element will close.
   * If not provided, there will be no close threshold.
   */
  closeThresholds: number;

  /**
   * Callback function that is called when the resizable element is closed.
   * This can be used to perform any cleanup or state updates.
   */
  onClose?: () => void;

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

  handleType: HandleType;
};

export type ResizerProps = {
  onMouseDown?: (e: React.MouseEvent) => void;
  tabIndex?: number;
  onFocus?: (e: React.KeyboardEvent) => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent) => void;
};

export type ResizableReturn = {
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
   * A function that takes in a handle type ('left', 'right', 'top', 'bottom') and returns the props needed to be spread onto the resizer element.
   */
  getResizerProps: (handleType: HandleType) => ResizerProps;

  /**
   * A ref to the resizable element that can be used to attach the resizer functionality.
   */
  resizableRef: React.RefObject<HTMLElement>;
};
