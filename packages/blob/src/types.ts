type blobChar = 'o' | 'O' | '_';
type blobRow = [blobChar, blobChar, blobChar, blobChar];
export type blobCode = [blobRow, blobRow, blobRow, blobRow];

export interface BlobProps {
  shape: blobCode;
}

export type Coordinate = [number, number];

export type CardinalDirection = | 'top' | 'bottom' | 'left' | 'right'
export const isCardinalDirection = (dir: DirectionName): dir is CardinalDirection => ['top', 'right', 'left', 'bottom'].includes(dir)

export type DirectionName =  CardinalDirection
| 'topRight'
| 'bottomRight'
| 'bottomLeft'
| 'topLeft';

export const countDirections = 8;
export interface PathPoint {
  /**
   * If this point were a flat face, where would it be?
   */
  face?: DirectionName;
  x: number;
  y: number;
  b1?: Coordinate;
  b2?: Coordinate;
}

export const InverseDirection: Record<DirectionName, DirectionName> = {
  'top': 'bottom',
  'topRight': 'bottomLeft',
  'right': 'left',
  'bottomRight': 'topLeft',
  'bottom': 'top',
  'bottomLeft': 'topRight',
  'left': 'right',
  'topLeft': 'bottomRight',
} as const

export const NextDirection: Record<DirectionName, DirectionName> = {
  'top': 'topRight',
  'topRight': 'right',
  'right': 'bottomRight',
  'bottomRight': 'bottom',
  'bottom': 'bottomLeft',
  'bottomLeft': 'left',
  'left': 'topLeft',
  'topLeft': 'top',
}
