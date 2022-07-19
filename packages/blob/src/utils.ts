import {
  blobCode,
  CardinalDirection,
  Coordinate,
  DirectionName,
} from './types';

export const makeBlobUtils = (shape: blobCode) => {
  function hasAdjacency([row, col]: Coordinate) {
    return (direction: DirectionName) => {
      if (!shape) return;

      // For small Dots
      switch (direction) {
        case 'top': {
          const hasAdjacency = indexExists(row - 1, col)
            ? shape[row - 1][col] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'topRight': {
          const hasAdjacency = indexExists(row - 1, col + 1)
            ? shape[row - 1][col + 1] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'right': {
          const hasAdjacency = indexExists(row, col + 1)
            ? shape[row][col + 1] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'bottomRight': {
          const hasAdjacency = indexExists(row + 1, col + 1)
            ? shape[row + 1][col + 1] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'bottom': {
          const hasAdjacency = indexExists(row + 1, col)
            ? shape[row + 1][col] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'bottomLeft': {
          const hasAdjacency = indexExists(row + 1, col - 1)
            ? shape[row + 1][col - 1] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'left': {
          const hasAdjacency = indexExists(row, col - 1)
            ? shape[row][col - 1] !== '_'
            : false;
          return hasAdjacency;
        }

        case 'topLeft': {
          const hasAdjacency = indexExists(row - 1, col - 1)
            ? shape[row - 1][col - 1] !== '_'
            : false;
          return hasAdjacency;
        }

        default:
          break;
      }
    };
  }

  function indexExists(row: number, col: number) {
    return shape && shape[row] && shape[row][col];
  }

  function isEmpty(row: number, col: number) {
    return indexExists(row, col) && shape[row][col] === '_';
  }

  function isSmallDot(row: number, col: number) {
    return indexExists(row, col) && shape[row][col] === 'o';
  }

  function isLargeDot(row: number, col: number) {
    return indexExists(row, col) && shape[row][col] === 'O';
  }

  /**
   * Finds the top-right-most dot
   */
  function findStart(row = 0, col = 0): [number, number] {
    if (isSmallDot(row, col) || isLargeDot(row, col)) {
      return [row, col];
    } else {
      return (
        findStart(row, col + 1) ||
        findStart(row + 1, col) ||
        findStart(row + 1, col + 1)
      );
    }
  }

  return {
    hasAdjacency,
    indexExists,
    isEmpty,
    isSmallDot,
    isLargeDot,
    findStart,
  };
};

export const adjacentRowColumnCoordinates = ([row, col]: Coordinate): Record<
  DirectionName,
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

export const vertexCoordinatesForCenterPoint = ([x, y]: Coordinate): Record<
  CardinalDirection,
  Coordinate
> => {
  return {
    top: [x, y - 1],
    right: [x + 1, y],
    bottom: [x, y + 1],
    left: [x - 1, y],
  };
};
