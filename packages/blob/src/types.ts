type blobChar = 'o' | 'O' | '_';
type blobRow = [blobChar, blobChar, blobChar, blobChar];
export type blobCode = [blobRow, blobRow, blobRow, blobRow];

export interface BlobProps {
  shape: blobCode;
}

/**
 *     c0 c1 c2 c3
 * r0 |  |  |  |  |
 * r1 |  |  |  |  |
 * r2 |  |  |  |  |
 * r3 |  |  |  |  |
 */

export type Coordinate = [number, number];

export type CardinalDirection = 'top' | 'bottom' | 'left' | 'right';
export const isCardinalDirection = (
  dir: DirectionName,
): dir is CardinalDirection => ['top', 'right', 'left', 'bottom'].includes(dir);

export type DirectionName =
  | CardinalDirection
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

export const countDirections = 8;

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

export const InverseDirection: Record<DirectionName, DirectionName> = {
  top: 'bottom',
  topRight: 'bottomLeft',
  right: 'left',
  bottomRight: 'topLeft',
  bottom: 'top',
  bottomLeft: 'topRight',
  left: 'right',
  topLeft: 'bottomRight',
} as const;

export const NextDirection: Record<DirectionName, DirectionName> = {
  top: 'topRight',
  topRight: 'right',
  right: 'bottomRight',
  bottomRight: 'bottom',
  bottom: 'bottomLeft',
  bottomLeft: 'left',
  left: 'topLeft',
  topLeft: 'top',
};
