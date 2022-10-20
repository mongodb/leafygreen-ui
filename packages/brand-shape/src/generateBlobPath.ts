/* eslint-disable no-console */
import {
  adjacentRowColumnCoordinates,
  isValidShape,
  makeBlobUtils,
  vertexCoordinatesForCenterPoint,
} from './utils';
import {
  blobCode,
  Direction,
  PathPoint,
  isCardinalDirection,
  InverseDirection,
  NextDirection,
  countDirections,
  Vertex,
  Coordinate,
} from './types';

const _DEBUG = false;
_DEBUG && console.clear();

const bezierDistance = 0.5525;

export function generateBlobPath(shape: blobCode, _DEBUG = false) {
  if (!isValidShape(shape)) return;

  const vertexes = calcVertexes(shape);
  // console.log(vertexes);
  // Convert vertexes into path points

  const points = generateBezierPoints(vertexes);
  // console.log(points);

  // Convert path points to a path string
  const path =
    'M ' +
    points
      .map(
        ({ x, y, b1x, b1y, b2x, b2y }) =>
          `${x},${y} C ${b1x},${b1y} ${b2x},${b2y}`,
      )
      .join(' ') +
    ` ${points[0].x},${points[0].y}` +
    ' Z';

  // console.log(path)
  return path;
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
    isSmallDot,
    isLargeDot,
    getLargeCircleSiblingIndex,
    indexHasDiagonalAdjacencies,
  } = makeBlobUtils(shape);

  // Append new vertexes to this array
  const vertexes = [] as Array<Vertex>;

  // Keep track of the dots we've traversed recursively
  // const traversedDots = new Array(4).fill(new Array(4).fill(false));
  const traversedDots = new Map<`${number},${number}`, boolean>();

  const startIndex = findStart();
  if (!startIndex) return vertexes;

  addCircle(...startIndex); // Modifies `vertexes`

  return vertexes;

  /**
   * Start at startFace.
   * Check each face rotating clockwise.
   * Recursively add adjacent dots if there's an adjacent dot
   * Add vertexes for this dot otherwise.
   */
  function addCircle(
    row: number,
    col: number,
    startFace: Direction = Direction.Top,
    _depth = 0,
  ) {
    const _consolePrefix = new Array(_depth).fill('\t').join('|');
    const indexHasAdjacencyForFace = hasAdjacency([row, col]);
    const rowColPair = `${row},${col}` as `${number},${number}`;

    // If we've traversed this dot already, ignore it
    if (!indexExists(row, col) || traversedDots.get(rowColPair)) {
      return;
    }

    _DEBUG && console.log(`${_consolePrefix}Adding Dot at (${rowColPair})`);

    traversedDots.set(rowColPair, true);

    let currentFace = startFace;

    /**
     * Cycle clockwise looking for adjacent circles, starting from where the last circle was
     * If there's an adjacent circle, add that circle,
     * Otherwise add the vertex at the current face
     *
     * For large circles we need to check for 2 adjacencies for each of the cardinal directions
     * i.e. a large dot can have two small dots above it etc.
     */
    for (let i = 0; i < countDirections; i++) {
      const indexHasAdjacency = indexHasAdjacencyForFace(currentFace);

      // For large circles we add sibling circles' adjacencies as well
      // E.g.
      // if currentFace is `top`
      // AND whichever left/right adjacency that is part of this large circle has a top adjacency
      // -> add a circle there
      const siblingCoordinates = getLargeCircleSiblingIndex(currentFace, [
        row,
        col,
      ]);

      _DEBUG &&
        console.log(
          `${_consolePrefix}|\tChecking ${currentFace} adjacency: ${indexHasAdjacency}`,
        );

      if (indexHasAdjacency) {
        const adjacentCoordinates = adjacentRowColumnCoordinates([row, col]);
        const adjacentCoordinatesForFace = adjacentCoordinates[currentFace];
        addCircle(
          ...adjacentCoordinatesForFace,
          NextDirection[InverseDirection[currentFace]],
          _depth + 1,
        );
      } else if (isCardinalDirection(currentFace)) {
        const diagonalAdjacencies = indexHasDiagonalAdjacencies([row, col]);

        _DEBUG &&
          console.log(`${_consolePrefix}|\tChecking for diagonal adjacencies`, {
            diagonalAdjacencies,
          });

        // If there's a small circle in a related direction
        if (isSmallDot(row, col) || diagonalAdjacencies) {
          // Add small circle vertexes
          const centerPoint = [col * 2 + 1, row * 2 + 1] as Coordinate;
          const [vertexX, vertexY] =
            vertexCoordinatesForCenterPoint(centerPoint)[currentFace];

          addVertex({
            face: currentFace,
            x: vertexX,
            y: vertexY,
          });
        } else {
          /**
           * e.g. currentFace is top
           * There is no circle above this index, or above the sibling index
           */
          // The center point of the Large circle this index is a part of
          const [sibRow, sibCol] = siblingCoordinates;
          const centerPoint = [
            col + sibCol + 1,
            row + sibRow + 1,
          ] as Coordinate;
          const [vertexX, vertexY] = vertexCoordinatesForCenterPoint(
            centerPoint,
            'large',
          )[currentFace];

          addVertex({
            face: currentFace,
            x: vertexX,
            y: vertexY,
          });
        }
      }

      if (isLargeDot(row, col)) {
        const sibilingHasAdjacencyForFace = hasAdjacency(siblingCoordinates);
        const siblingHasAdjacency = sibilingHasAdjacencyForFace(currentFace);

        if (siblingHasAdjacency) {
          const siblingAdjacencyCoordinates =
            adjacentRowColumnCoordinates(siblingCoordinates);
          const siblingAdjacencyCoordinatesForFace =
            siblingAdjacencyCoordinates[currentFace];
          addCircle(
            ...siblingAdjacencyCoordinatesForFace,
            NextDirection[InverseDirection[currentFace]],
            _depth + 1,
          );
        }
      }

      // Move on to the next direction
      currentFace = NextDirection[currentFace];
    }

    function addVertex({ face, x, y }: Vertex) {
      if (
        // Check if this vertex is already added
        !vertexes.some(v => {
          return face == v.face && x == v.x && y == v.y;
        })
      ) {
        _DEBUG &&
          console.log(`${_consolePrefix}|\t\tAdding vertex at`, { x, y, face });
        vertexes.push({
          face,
          x,
          y,
        });
      }
    }
  }
}

/**
 * Add bezier points to vertexes
 */
function generateBezierPoints(vertexes: Array<Vertex>): Array<PathPoint> {
  return vertexes.map(({ x, y, face }, i) => {
    const nextVertex = vertexes[i + 1] || vertexes[0];
    const { x: xNext, y: yNext } = nextVertex;
    const [xDiff, yDiff] = [Math.abs(x - xNext), Math.abs(y - yNext)];
    const [bezX, bezY] = [bezierDistance * xDiff, bezierDistance * yDiff];

    switch (face) {
      case 'top': {
        return {
          x,
          y,
          b1x: x + bezX,
          b1y: y,
          b2x: xNext,
          b2y: yNext === y ? y : yNext > y ? yNext - bezY : yNext + bezY, // next v is ? below : above
        };
      }

      case 'right': {
        return {
          x,
          y,
          b1x: x,
          b1y: y + bezY,
          b2x: xNext === x ? x : xNext > x ? xNext - bezX : xNext + bezX, // next v is ? right : left: ;
          b2y: yNext,
        };
      }

      case 'bottom': {
        return {
          x,
          y,
          b1x: x - bezX,
          b1y: y,
          b2x: xNext,
          b2y: yNext === y ? y : yNext > y ? yNext - bezY : yNext + bezY, // next v is ? below : above
        };
      }

      case 'left':
      default: {
        return {
          x,
          y,
          b1x: x,
          b1y: y - bezY,
          b2x: xNext === x ? x : xNext > x ? xNext - bezX : xNext + bezX, // next v is ? right : left: ;
          b2y: yNext,
        };
      }
    }
  });
}
