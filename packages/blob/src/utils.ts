import { blobCode, Coordinate, Direction } from "./types";

export const makeHasAdjacency = (shape: blobCode) => {
  return ([row, col]: Coordinate, direction: Direction) => {

    if (!shape) return

    // For small Dots
    switch (direction) {
      case 'top': {
        const hasAdjacency = indexExists(row - 1, col) ? shape[row - 1][col] !== '_' : false
        return hasAdjacency
      }

      case 'bottom': {
        const hasAdjacency = indexExists(row + 1, col) ? shape[row + 1][col] !== '_' : false
        return hasAdjacency
      }

      case 'left': {
        const hasAdjacency = indexExists(row, col - 1) ? shape[row][col - 1] !== '_' : false
        return hasAdjacency
      }

      case 'right': {
        const hasAdjacency = indexExists(row, col + 1) ? shape[row][col + 1] !== '_' : false
        return hasAdjacency
      }

      default:
        break;
    }
  }

  function indexExists (x: number, y: number) {
    return shape && shape[x] && shape[x][y]
  }
}
