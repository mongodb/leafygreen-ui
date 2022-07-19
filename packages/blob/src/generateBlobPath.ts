import {
  adjacentRowColumnCoordinates,
  makeBlobUtils,
  vertexCoordinatesForCenterPoint,
} from './utils';
import {
  blobCode,
  DirectionName,
  PathPoint,
  isCardinalDirection,
  NextDirection,
  InverseDirection,
  countDirections,
  Vertex,
} from './types';

const bezierDist = 0.5525;

export function generateBlobPath(shape: blobCode) {
  if (!isValidShape(shape)) return;

  const vertexes = calcVertexes(shape);
  // console.log(vertexes);
  // Convert vertexes into path points
  const points = generateBezierPoints(vertexes);
  // console.log(points);

  // Convert path points to a path string
  const path = "M " + points.map(
    ({ x, y, b1x, b1y, b2x, b2y }) => `${x},${y}\n C ${b1x},${b1y} ${b2x},${b2y}`).join(' ')
  + ` ${points[0].x},${points[0].y}` + "\nZ"

  // console.log(path)
  return path
}

/**
 * - no enclaves
 * - no exclaves
 * - Ensure large circles are complete
 */
function isValidShape(shape: blobCode): boolean {
  // TODO: Validate shape
  return true;
}

/**
 * For each gridPoint in shape
 * Check if there should be a dot
 * and add the dot vertexes to the array
 */
function calcVertexes(shape: blobCode): Array<Vertex> {
  const {
    indexExists,
    hasAdjacency,
    findStart,
    isEmpty,
    isSmallDot,
    isLargeDot,
  } = makeBlobUtils(shape);

  // Append new vertexes to this array
  const vertexes = [] as Array<Vertex>;

  // Keep track of the dots we've traversed recursively
  // const traversedDots = new Array(4).fill(new Array(4).fill(false));
  const traversedDots = new Map<`${number},${number}`, boolean>();

  const startRowCol = findStart();
  addDot(...startRowCol);

  return vertexes;

  /**
   * Start at startFace.
   * Check each face rotating clockwise.
   * Recursively add adjacent dots if there's an adjacent dot
   * Add vertexes for this dot otherwise.
   */

  function addDot(
    row: number,
    col: number,
    startFace: DirectionName = 'top',
    _depth = 0,
  ) {
    //  const _consolePrefix = new Array(_depth).fill('\t').join('|')
    const dotHasAdjacency = hasAdjacency([row, col]);
    const rowColPair = `${row},${col}` as `${number},${number}`;

    // If we've traversed this dot already, ignore it
    if (!indexExists(row, col) || traversedDots.get(rowColPair)) {
      return;
    }

    // console.log(`${_consolePrefix}Adding Dot at (${rowColPair})`)

    traversedDots.set(rowColPair, true);

    // Small circle
    if (isSmallDot(row, col)) {
      // Go Clockwise around the dot, starting from where the previous adjacency was
      // If there's an adjacent dot, add that dot,
      // Otherwise add a vertex for this dot

      let currentFace = startFace;

      // Cycle through all directions
      for (let i = 0; i < countDirections; i++) {
        const adjacentCoordinates = adjacentRowColumnCoordinates([row, col])[
          currentFace
        ];

        // console.log(`${_consolePrefix}|\tChecking ${currentFace} adjacency`, ...adjacentCoordinates)

        // If there's an adjacent dot
        if (dotHasAdjacency(currentFace)) {
          addDot(
            ...adjacentCoordinates,
            InverseDirection[currentFace],
            _depth + 1,
          );
        } else if (isCardinalDirection(currentFace)) {
          // otherwise add a vertex
          const [x, y] = [col * 2 + 1, row * 2 + 1]; // The center coordinates for the column/row dot
          const [vertexX, vertexY] = vertexCoordinatesForCenterPoint([x, y])[
            currentFace
          ];

          // console.log(`${_consolePrefix}|\t\tAdding vertex at`, {x: vertexX, y:vertexY});

          vertexes.push({
            face: currentFace,
            x: vertexX,
            y: vertexY,
          });
        }

        currentFace = NextDirection[currentFace];
      }
    }

    if (isLargeDot(row, col)) {
      // TODO:
    }

    if (isEmpty(row, col)) {
      addDot(row, col + 1);
    }
  }
}

/**
 * Add bezier points to vertexes
 */
function generateBezierPoints(vertexes: Array<Vertex>): Array<PathPoint> {
  return vertexes.map(({ x, y, face }, i) => {
    const nextVertex = vertexes[i + 1] || vertexes[0];
    const { x: xNext, y: yNext } = nextVertex

    switch (face) {
      case 'top': {
        return {
          x,
          y,
          b1x: x + bezierDist,
          b1y: y,
          b2x: xNext,
          b2y: yNext === y ? y : (yNext > y) ? yNext - bezierDist : yNext + bezierDist, // next v is ? below : above
        };
      }

      case 'right': {
        return {
          x,
          y,
          b1x: x,
          b1y: y + bezierDist,
          b2x: xNext === x ? x : (xNext > x) ? xNext - bezierDist : xNext + bezierDist, // next v is ? right : left: ;
          b2y: yNext,
        };
      }

      case 'bottom': {
        return {
          x,
          y,
          b1x: x - bezierDist,
          b1y: y,
          b2x: xNext,
          b2y: yNext === y ? y : (yNext > y) ? yNext - bezierDist : yNext + bezierDist, // next v is ? below : above
        };
      }

      case 'left':
      default: {
        return {
          x,
          y,
          b1x: x,
          b1y: y - bezierDist,
          b2x: xNext === x ? x : (xNext > x) ? xNext - bezierDist : xNext + bezierDist, // next v is ? right : left: ;
          b2y: yNext,
        };
      }
    }
  });
}
