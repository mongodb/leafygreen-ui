import { adjacentRowColumnCoordinates, getAdjacentCoordinatesFor, makeBlobUtils, vertexCoordinatesForCenterPoint } from './utils';
import { blobCode, DirectionName, PathPoint, isCardinalDirection, NextDirection, InverseDirection, countDirections } from './types';

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
  const { indexExists ,hasAdjacency, findStart, isEmpty, isSmallDot, isLargeDot } =
    makeBlobUtils(shape);
  const vertexes = [] as Array<PathPoint>;

  // Keep track of the dots we've traversed recursively
  // const traversedDots = new Array(4).fill(new Array(4).fill(false));
  const traversedDots = new Map<`${number},${number}`, boolean>()

  /**
   *     c0 c1 c2 c3
   * r0 |  |  |  |  |
   * r1 |  |  |  |  |
   * r2 |  |  |  |  |
   * r3 |  |  |  |  |
   */

  /**
   * Start at start
   * Add vertexes for this dot
   * Recursively add adjacent dots,
   * starting with the top one & moving clockwise
   */

  function addDot(row: number, col: number, startFrom: DirectionName = 'top', _depth = 0) {
    const _consolePrefix = new Array(_depth).fill('\t').join('|')
    const dotHasAdjacency = hasAdjacency([row, col]);
    const rowColPair = `${row},${col}` as `${number},${number}`


    // If we've traversed this dot already, ignore it
    if (!indexExists(row, col) || traversedDots.get(rowColPair)) {
      return;
    }

    console.log(`${_consolePrefix}Adding Dot at (${rowColPair})`)

    traversedDots.set(rowColPair, true);

    // Small circle
    if (isSmallDot(row, col)) {
      // Go Clockwise around the dot, starting from where the previous adjacency was
      // If there's an adjacent dot, add that dot,
      // Otherwise add a vertex for this dot

      let currDir = startFrom

      // Cycle through all directions
      for (let i = 0; i < countDirections; i++) {
        const adjacentCoordinates = adjacentRowColumnCoordinates([row, col])[currDir]

        console.log(`${_consolePrefix}|\tChecking ${currDir} adjacency`, ...adjacentCoordinates)

        // If there's an adjacent dot
        if (dotHasAdjacency(currDir)) {
          addDot(...adjacentCoordinates, InverseDirection[currDir], _depth + 1);
        } else if (isCardinalDirection(currDir)) {
          // otherwise add a vertex
          const [x, y] = [col * 2 + 1, row * 2 + 1]; // The center coordinates for the column/row dot
          const [vertexX, vertexY] = vertexCoordinatesForCenterPoint([x, y])[currDir]

          console.log(`${_consolePrefix}|\t\tAdding vertex at`, {x: vertexX, y:vertexY});

          vertexes.push({
            face: currDir,
            x: vertexX,
            y: vertexY
          })
        }

        currDir = NextDirection[currDir]
      }
    }

    if (isLargeDot(row, col)) {
      // TODO:
    }

    if (isEmpty(row, col)) {
      addDot(row, col + 1);
    }
  }

  addDot(...findStart());

  // console.log(vertexes);

  // Convert vertexes into path points
  return "M" + vertexes.map(({x, y}) =>
    `${x},${y}`
  ).join(' ') + "Z"
}
