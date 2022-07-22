import {
  blobCode,
  CardinalDirection,
  CircleSize,
  Coordinate,
  Direction,
} from './types';

/**
 * Generates utility functions dependent on the provided `blobCode`
 */
export const makeBlobUtils = (shape: blobCode) => {
  /**
   * Returns a function that accepts a direction.
   * That function returns whether the provided coordinate has an adjacency in the provided direction
   */
  function hasAdjacency([row, col]: Coordinate) {
    /**
     * Returns whether the provided coordinate has an adjacency in the provided direction
     */
    return (direction: Direction): boolean => {
      if (!shape) return false;

      const adjacentCoordinates = adjacentRowColumnCoordinates([row, col]);
      const coords = adjacentCoordinates[direction];
      return isNotEmpty(...coords);
    };
  }

  /**
   * Returns whether the provided (row, column) pair is valid
   */
  function indexExists(row: number, col: number) {
    return shape && shape[row] && shape[row][col];
  }

  /**
   * Returns whether the provided (row, column) pair DOES NOT have a circle
   */
  function isEmpty(row: number, col: number) {
    return indexExists(row, col) && shape[row][col] === ' ';
  }

  function isNotEmpty(row: number, col: number) {
    return isSmallDot(row, col) || isLargeDot(row, col);
  }

  /**
   * Returns whether the provided (row, column) pair has a small circle
   */
  function isSmallDot(row: number, col: number) {
    return indexExists(row, col) && shape[row][col] === 'o';
  }

  /**
   * Returns whether the provided (row, column) pair has a large circle
   */
  function isLargeDot(row: number, col: number) {
    return indexExists(row, col) && shape[row][col] === 'O';
  }

  /**
   * Returns the coordinates of the top-left-most dot to the provided (row, column) pair
   */
  function findStart(row = 0, col = 0): [number, number] {
    if (isSmallDot(row, col) || isLargeDot(row, col)) {
      return [row, col];
    } else {
      if (indexExists(row, col + 1)) return findStart(row, col + 1);
      if (indexExists(row + 1, col)) return findStart(row + 1, col);
      if (indexExists(row + 1, col + 1)) return findStart(row + 1, col + 1);
      return [-1, -1];
    }
  }

  /**
   * Does the circle at this index have any external circles on the diagonal?
   * ◜◝
   * ◟◞ <-
   *   o <-
   */
  function indexHasDiagonalAdjacencies([row, col]: Coordinate): boolean {
    const adjCoords = adjacentRowColumnCoordinates([row, col]);

    // check for diagonal small circles
    return (
      isSmallDot(...adjCoords['topLeft']) ||
      isSmallDot(...adjCoords['topRight']) ||
      isSmallDot(...adjCoords['bottomRight']) ||
      isSmallDot(...adjCoords['bottomLeft']) ||
      // Or diagonals that are not in the same large circle
      (isLargeDot(row, col) &&
        indexHasExternalLargeDiagonalAdjacencies([row, col]))
    );

    /**
     * Does the circle at this index have diagonal adjacencies
     * that are not a part of the same circle?
     *    ◜◝
     * -> ◟◞
     *  ◜◝ <-
     *  ◟◞
     */
    function indexHasExternalLargeDiagonalAdjacencies([
      row,
      col,
    ]: Coordinate): boolean {
      const adjCoords = adjacentRowColumnCoordinates([row, col]);
      const corner = getLargeCircleCorner(row, col);

      switch (corner) {
        case 'topLeft':
          return (
            isLargeDot(...adjCoords['topLeft']) ||
            isLargeDot(...adjCoords['topRight']) ||
            isLargeDot(...adjCoords['bottomLeft'])
          );
        case 'topRight':
          return (
            isLargeDot(...adjCoords['topLeft']) ||
            isLargeDot(...adjCoords['topRight']) ||
            isLargeDot(...adjCoords['bottomRight'])
          );
        case 'bottomRight':
          return (
            isLargeDot(...adjCoords['bottomRight']) ||
            isLargeDot(...adjCoords['bottomLeft']) ||
            isLargeDot(...adjCoords['topRight'])
          );
        case 'bottomLeft':
          return (
            isLargeDot(...adjCoords['bottomLeft']) ||
            isLargeDot(...adjCoords['bottomRight']) ||
            isLargeDot(...adjCoords['topLeft'])
          );
        default:
          return false;
      }
    }
  }

  /**
   * Determines which of the 4 corners this index is
   * i.e. which of these are we looking at:
   *
   * ◜◝
   * ◟◞
   */
  function getLargeCircleCorner(
    row: number,
    col: number,
  ): Direction | undefined {
    const adjacentCoordinates = adjacentRowColumnCoordinates([row, col]);

    if (
      isLargeDot(...adjacentCoordinates['right']) &&
      isLargeDot(...adjacentCoordinates['bottomRight']) &&
      isLargeDot(...adjacentCoordinates['bottom'])
    ) {
      /**
       * -> ◜◝
       *    ◟◞
       */
      return Direction.TopLeft;
    } else if (
      isLargeDot(...adjacentCoordinates['left']) &&
      isLargeDot(...adjacentCoordinates['bottomLeft']) &&
      isLargeDot(...adjacentCoordinates['bottom'])
    ) {
      /**
       * ◜◝ <-
       * ◟◞
       */
      return Direction.TopRight;
    } else if (
      isLargeDot(...adjacentCoordinates['left']) &&
      isLargeDot(...adjacentCoordinates['topLeft']) &&
      isLargeDot(...adjacentCoordinates['top'])
    ) {
      /**
       * ◜◝
       * ◟◞ <-
       */
      return Direction.BottomRight;
    } else if (
      isLargeDot(...adjacentCoordinates['right']) &&
      isLargeDot(...adjacentCoordinates['topRight']) &&
      isLargeDot(...adjacentCoordinates['top'])
    ) {
      /**
       *    ◜◝
       * -> ◟◞
       */
      return Direction.BottomLeft;
    }
  }

  /**
   * Returns the coordinates for the quarter circle that shares the given face
   * i.e. given `top`, returns coordinates of either ◜ or ◝
   * Returns the given coordinates if this is not a large circle
   */
  function getLargeCircleSiblingIndex(
    face: Direction,
    [row, col]: Coordinate,
  ): Coordinate {
    const adjacentCoordinates = adjacentRowColumnCoordinates([row, col]);

    if (isLargeDot(row, col)) {
      switch (face) {
        case Direction.Top:
        case Direction.Bottom: {
          // Is the index to the left part of the large circle?
          if (isLargeDot(...adjacentCoordinates['left'])) {
            return adjacentCoordinates['left'];
          }

          // index to the right?
          if (isLargeDot(...adjacentCoordinates['right'])) {
            return adjacentCoordinates['right'];
          }

          // Code error
          return [row, col];
        }

        case Direction.Right:
        case Direction.Left: {
          // Is the index to the top part of the large circle?
          if (isLargeDot(...adjacentCoordinates['top'])) {
            return adjacentCoordinates['top'];
          }

          // index to the bottom?
          if (isLargeDot(...adjacentCoordinates['bottom'])) {
            return adjacentCoordinates['bottom'];
          }

          // Code error
          return [row, col];
        }
      }
    }

    // Not in large circle
    return [row, col];
  }

  return {
    hasAdjacency,
    indexExists,
    isEmpty,
    isSmallDot,
    isLargeDot,
    findStart,
    getLargeCircleSiblingIndex,
    indexHasDiagonalAdjacencies,
  };
};

/**
 * Generates a record of the (row,column) pairs for each adjacent direction.
 */
export const adjacentRowColumnCoordinates = ([row, col]: Coordinate): Record<
  Direction,
  Coordinate
> => {
  return {
    top: [row - 1, col],
    topRight: [row - 1, col + 1],
    right: [row, col + 1],
    bottomRight: [row + 1, col + 1],
    bottom: [row + 1, col],
    bottomLeft: [row + 1, col - 1],
    left: [row, col - 1],
    topLeft: [row - 1, col - 1],
  };
};

/**
 * Generates a record of all the vertexes of a small circle given a center point
 */
export const vertexCoordinatesForCenterPoint = (
  [x, y]: Coordinate,
  size: CircleSize = 'small',
): Record<CardinalDirection, Coordinate> => {
  if (size === 'large') {
    return {
      top: [x, y - 1],
      right: [x + 1, y],
      bottom: [x, y + 1],
      left: [x - 1, y],
    };
  }

  return {
    top: [x, y - 1],
    right: [x + 1, y],
    bottom: [x, y + 1],
    left: [x - 1, y],
  };
};
