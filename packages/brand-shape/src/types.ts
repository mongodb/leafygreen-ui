import { HTMLElementProps } from '@leafygreen-ui/lib';

export type blobChar = 'o' | 'O' | ' ';
export type blobRow = [blobChar, blobChar, blobChar, blobChar];
export type blobCode = [blobRow, blobRow, blobRow, blobRow];

export const isCharEmpty = (char: blobChar): char is ' ' => char === ' ';
export const isCharSmall = (char: blobChar): char is 'o' => char === 'o';
export const isCharLarge = (char: blobChar): char is 'O' => char === 'O';

type BlobMode = 'debug' | 'interactive' | 'production';

export interface BlobProps extends HTMLElementProps<'svg'> {
  /**
   * The 2D array defining the blob's shape
   */
  shape: blobCode;
  /**
   * The color of the shape
   */
  fill?: string;
  /**
   * Click handler on the grey grid circles. Used in interactive mode
   */
  onGridCircleClick?: (
    event: React.MouseEvent<SVGCircleElement, MouseEvent>,
    coords: Coordinate,
  ) => void;
  /**
   * Switch between debug mode, interactive mode and production (static) mode
   */
  mode?: BlobMode;

  /**
   * CSS Class name
   */
  className?: string;
}

/**
 *     c0 c1 c2 c3
 * r0 |  |  |  |  |
 * r1 |  |  |  |  |
 * r2 |  |  |  |  |
 * r3 |  |  |  |  |
 */

export type Coordinate = [number, number];

export const CardinalDirection = {
  Top: 'top',
  Bottom: 'bottom',
  Left: 'left',
  Right: 'right',
} as const;
export type CardinalDirection =
  typeof CardinalDirection[keyof typeof CardinalDirection];

export const isCardinalDirection = (dir: Direction): dir is CardinalDirection =>
  Object.values(CardinalDirection).includes(dir as any);

export const Direction = {
  ...CardinalDirection,
  TopRight: 'topRight',
  BottomRight: 'bottomRight',
  BottomLeft: 'bottomLeft',
  TopLeft: 'topLeft',
} as const;
export type Direction = typeof Direction[keyof typeof Direction];

export const countDirections = Object.keys(Direction).length;

export interface Vertex {
  /**
   * If this point were a flat face, where would it be?
   */
  face?: CardinalDirection;
  /**
   * This vertex's X coordinate
   */
  x: number;
  /**
   * This vertex's Y coordinate
   */
  y: number;
}
export interface PathPoint extends Vertex {
  b1x: number;
  b1y: number;
  b2x: number;
  b2y: number;
}

/**
 * Map of opposite directions
 */
export const InverseDirection: Record<Direction, Direction> = {
  top: 'bottom',
  topRight: 'bottomLeft',
  right: 'left',
  bottomRight: 'topLeft',
  bottom: 'top',
  bottomLeft: 'topRight',
  left: 'right',
  topLeft: 'bottomRight',
} as const;

/**
 * Maps directions to the next direction (rotating clockwise)
 */
export const NextDirection: Record<Direction, Direction> = {
  top: 'topRight',
  topRight: 'right',
  right: 'bottomRight',
  bottomRight: 'bottom',
  bottom: 'bottomLeft',
  bottomLeft: 'left',
  left: 'topLeft',
  topLeft: 'top',
} as const;

/**
 * Maps directions to the previous direction (rotating clockwise)
 */
export const PrevDirection: Record<Direction, Direction> = {
  top: 'topLeft',
  topRight: 'top',
  right: 'topRight',
  bottomRight: 'right',
  bottom: 'bottomRight',
  bottomLeft: 'bottom',
  left: 'bottomLeft',
  topLeft: 'left',
} as const;

export type CircleSize = 'small' | 'large';
