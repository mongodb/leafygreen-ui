import { keyMap } from '@leafygreen-ui/lib';

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

// Define Arrow type using the keyMap values
export type Arrow =
  | typeof keyMap.ArrowLeft
  | typeof keyMap.ArrowRight
  | typeof keyMap.ArrowUp
  | typeof keyMap.ArrowDown;

export interface ResizableProps {
  /**
   * Whether the resizable feature is enabled.
   * @default false
   */
  enabled?: boolean;

  /**
   * The initial size of the resizable element.
   */
  initialSize: number;

  /**
   * The minimum size the resizable element can be resized to.
   */
  minSize: number;

  /**
   * The maximum size the resizable element can be resized to.
   */
  maxSize: number;

  /**
   * Callback function that is called when the resizable element is resized.
   * This can be used to perform any actions based on the new size.
   */
  onResize?: (size: number) => void;

  /**
   * The position of the element to which the resizer handle is attached.
   */
  position: Position;
}

export interface ResizerProps {
  onMouseDown: (e: React.MouseEvent | MouseEvent) => void;
  tabIndex: number;
  onKeyDown: (e: React.KeyboardEvent | KeyboardEvent) => void;
  className?: string;
  [key: string]: any; // For aria attributes
}

export interface ResizableReturn<T extends HTMLElement = HTMLElement> {
  /**
   * The current size of the resizable element.
   */
  size: number;

  /**
   * Function to set the size of the resizable element.
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
   */
  resizableRef: React.RefObject<T>;
}
