type blobChar = 'o' | 'O' | '_';
type blobRow = [blobChar, blobChar, blobChar, blobChar];
export type blobCode = [blobRow, blobRow, blobRow, blobRow];

export interface BlobProps {
  shape: blobCode;
}

export type Coordinate = [number, number];

export type Direction = 'top' | 'bottom' | 'left' | 'right';
export type ExtendedDirection =
  | Direction
  | 'topRight'
  | 'bottomRight'
  | 'bottomLeft'
  | 'topLeft';

export interface PathPoint {
  /**
   * If this point were a flat face, where would it be?
   */
  face?: Direction;
  x: number;
  y: number;
  b1?: Coordinate;
  b2?: Coordinate;
}
