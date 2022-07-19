import { blobCode, Coordinate, ExtendedDirection } from './types';

export const makeClosureDependentUtils = (shape: blobCode) => {
  function hasAdjacency([row, col]: Coordinate) {
    return (direction: ExtendedDirection) => {
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
