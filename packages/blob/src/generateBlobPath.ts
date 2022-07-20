import {
  adjacentRowColumnCoordinates,
  makeBlobUtils,
  vertexCoordinatesForCenterPoint,
} from './utils';
import {
  blobCode,
  Direction,
  PathPoint,
  isCardinalDirection,
  NextDirection,
  InverseDirection,
  countDirections,
  Vertex,
  Coordinate,
} from './types';
import { isUndefined } from 'lodash';

const bezierDist = 0.5525;

export function generateBlobPath(shape: blobCode) {
  if (!isValidShape(shape)) return;

  const vertexes = calcVertexes(shape);
  console.log(vertexes);
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
 * - no enclaves
 * - no exclaves
 * - Ensure large circles are complete
 */
function isValidShape(shape: blobCode): boolean {
  // TODO: Validate shape
  return !isUndefined(shape);
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
    getLargeCircleSiblingIndex
  } = makeBlobUtils(shape);

  // Append new vertexes to this array
  const vertexes = [] as Array<Vertex>;

  // Keep track of the dots we've traversed recursively
  // const traversedDots = new Array(4).fill(new Array(4).fill(false));
  const traversedDots = new Map<`${number},${number}`, boolean>();

  const startRowCol = findStart();
  addCircle(...startRowCol);

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
    const indexHasAdjacencyInDirectionOf = hasAdjacency([row, col]);
    const rowColPair = `${row},${col}` as `${number},${number}`;

    // If we've traversed this dot already, ignore it
    if (!indexExists(row, col) || traversedDots.get(rowColPair)) {
      return;
    }

    traversedDots.set(rowColPair, true);

    if (isSmallDot(row, col)) {
      /**
       * Go Clockwise around the dot, starting from where the previous adjacency was
       * If there's an adjacent dot, add that dot,
       * Otherwise add a vertex for this dot
       */

      let currentFace = startFace;

      // Cycle through all directions (cardinal & diagonal)
      for (let i = 0; i < countDirections; i++) {
        if (indexHasAdjacencyInDirectionOf(currentFace)) {
          // If there's an adjacent dot we add it
          const adjacentCoordinates = adjacentRowColumnCoordinates([row, col]);
          const adjacentCoordinatesForFace = adjacentCoordinates[currentFace];

          addCircle(
            ...adjacentCoordinatesForFace,
            InverseDirection[currentFace],
            _depth + 1,
          );
        } else if (isCardinalDirection(currentFace)) {
          // otherwise add a vertex
          const centerPoint = [col * 2 + 1, row * 2 + 1] as Coordinate;
          const [vertexX, vertexY] = vertexCoordinatesForCenterPoint(centerPoint)[
            currentFace
          ];

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
      let currentFace = startFace;

      /**
       * Cycle through all directions (same as Small dot),
       * but this time we need to check for 2 adjacencies for each of the cardinal directions
       * i.e. a large dot can have two small dots above it etc.
       */
      for (let i = 0; i < countDirections; i++) {

        // E.g.
        // if currentFace is top and there's a top adjacency
        // OR whichever left/right adjacency that is part of this large circle has a top adjacency
        // add a circle there
        const indexHasImmediateAdjacency = indexHasAdjacencyInDirectionOf(currentFace)
        const adjacentCoordinates = adjacentRowColumnCoordinates([row, col]);
        const adjacentCoordinatesForFace = adjacentCoordinates[currentFace];

        const siblingCoordinates = getLargeCircleSiblingIndex(currentFace, [row, col]);
        const sibilingHasAdjacency = hasAdjacency(siblingCoordinates);
        const siblingHasImmediateAdjacency = sibilingHasAdjacency(currentFace)
        const siblingAdjacencyCoordinates = adjacentRowColumnCoordinates(siblingCoordinates)
        const siblingAdjacencyCoordinatesForFace = siblingAdjacencyCoordinates[currentFace]

        if (indexHasImmediateAdjacency) {
          addCircle(
            ...adjacentCoordinatesForFace,
            InverseDirection[currentFace],
            _depth + 1,
          );
        } else if (siblingHasImmediateAdjacency) {
          addCircle(
            ...siblingAdjacencyCoordinatesForFace,
            InverseDirection[currentFace],
            _depth + 1
          )
        } else if (isCardinalDirection(currentFace)) {
          /**
           * e.g. currentFace is top
           * There is no circle above this index, or above the sibling index
           */

          // The center point of the Large circle this index is a part of
          const [sibRow, sibCol] = siblingCoordinates;
          const centerPoint = [
            col + sibCol + 1,
            row + sibRow + 1
          ] as Coordinate
          const [vertexX, vertexY] = vertexCoordinatesForCenterPoint(centerPoint, 'large')[currentFace]

          vertexes.push({
            face: currentFace,
            x: vertexX,
            y: vertexY,
          });
        }

        currentFace = NextDirection[currentFace];
      }
    }

    if (isEmpty(row, col)) {
      addCircle(row, col + 1);
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

    switch (face) {
      case 'top': {
        return {
          x,
          y,
          b1x: x + bezierDist,
          b1y: y,
          b2x: xNext,
          b2y:
            yNext === y
              ? y
              : yNext > y
              ? yNext - bezierDist
              : yNext + bezierDist, // next v is ? below : above
        };
      }

      case 'right': {
        return {
          x,
          y,
          b1x: x,
          b1y: y + bezierDist,
          b2x:
            xNext === x
              ? x
              : xNext > x
              ? xNext - bezierDist
              : xNext + bezierDist, // next v is ? right : left: ;
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
          b2y:
            yNext === y
              ? y
              : yNext > y
              ? yNext - bezierDist
              : yNext + bezierDist, // next v is ? below : above
        };
      }

      case 'left':
      default: {
        return {
          x,
          y,
          b1x: x,
          b1y: y - bezierDist,
          b2x:
            xNext === x
              ? x
              : xNext > x
              ? xNext - bezierDist
              : xNext + bezierDist, // next v is ? right : left: ;
          b2y: yNext,
        };
      }
    }
  });
}
