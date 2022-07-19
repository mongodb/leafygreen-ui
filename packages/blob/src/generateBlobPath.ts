import { makeClosureDependentUtils } from './utils';
import { blobCode, PathPoint } from './types';

const bezierDist = 0.55;

export function generateBlobPath(shape: blobCode) {
  /**
   * TODO: Validate shape
   * - no enclaves/exclaves
   * - Ensure large circles are complete
   */

  // validateShape(shape)

  /**
   * For each gridPoint in shape
   * Check if there should be a dot
   * and add the dot vertexes to the array
   */
  const { hasAdjacency, findStart } = makeClosureDependentUtils(shape);
  const _vertexes = {
    head: [] as Array<PathPoint>,
    tail: [] as Array<PathPoint>,
  };
  const traversedDots = new Array(4).fill(new Array(4).fill(false));

  /**
   *     c0 c1 c2 c3
   * r0 |  |  |  |  |
   * r1 |  |  |  |  |
   * r2 |  |  |  |  |
   * r3 |  |  |  |  |
   */

  /**
   * Start at 0,0
   * Add vertexes for this dot
   * Recursively add adjacent dots,
   * starting with the top one & moving clockwise
   */

  function addDot(row: number, col: number) {
    const dotHasAdjacency = hasAdjacency([row, col]);
    const dotCode = shape[row][col];

    // If we've traversed this dot already, ignore it
    if (traversedDots[row][col]) {
      return;
    }
    traversedDots[row][col] = true;

    switch (dotCode) {
      case '_': {
        addDot(row, col + 1);
        break;
      }

      // Small circle
      case 'o': {
        // The center coordinates for the column/row
        const [x, y] = [col * 2 + 1, row * 2 + 1];

        // If there's an adjacenct dot, add it,
        // Otherwise add the vertex\

        // TODO: Change start vertex based on where
        // the previous adjacency was

        // Add the top vertex
        if (dotHasAdjacency('top')) {
          addDot(row - 1, col);
        } else {
          _vertexes.head.push({
            face: 'top',
            x,
            y: y - 1,
          });
        }

        // Move diagonally if necessary
        if (dotHasAdjacency('topRight')) {
          addDot(row - 1, col + 1);
        }

        if (dotHasAdjacency('right')) {
          // Add the right vertex
          addDot(row, col + 1);
        } else {
          _vertexes.head.push({
            face: 'right',
            x: x + 1,
            y,
          });
        }

        if (dotHasAdjacency('bottomRight')) {
          addDot(row + 1, col + 1);
        }

        if (dotHasAdjacency('bottom')) {
          addDot(row + 1, col);
        } else {
          _vertexes.head.push({
            face: 'bottom',
            x,
            y: y + 1,
          });
        }

        if (dotHasAdjacency('bottomLeft')) {
          addDot(row + 1, col - 1);
        }

        if (dotHasAdjacency('left')) {
          addDot(row, col - 1);
        } else {
          _vertexes.head.push({
            face: 'left',
            x: x - 1,
            y,
          });
        }

        if (dotHasAdjacency('topLeft')) {
          addDot(row - 1, col - 1);
        }

        break;
      }
    }
  }

  addDot(...findStart());
  console.log(...findStart());

  const vertexes = [..._vertexes.head, ..._vertexes.tail.reverse()];
  // console.log(vertexes);
}
