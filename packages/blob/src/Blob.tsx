import React from 'react';
import { BlobProps, Coordinate, PathPoint } from './types';
import { makeHasAdjacency } from './utils';

// eslint-disable-next-line no-console
console.clear();

const bezierDist = 0.55;
const _SHOW_GRID = true;

export default function Blob({ shape }: BlobProps) {
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
  const _vertexes = {
    head: [] as Array<PathPoint>,
    tail: [] as Array<PathPoint>,
  };
  const hasAdjacency = makeHasAdjacency(shape);

  /**
   *     c0 c1 c2 c3
   * r0 |  |  |  |  |
   * r1 |  |  |  |  |
   * r2 |  |  |  |  |
   * r3 |  |  |  |  |
   */

  shape.forEach((row, r) => {
    row.forEach((dot, c) => {
      const indexes: Coordinate = [r, c];

      switch (dot) {
        // Small circle
        case 'o': {
          // If we have a small circle,
          // Convert the indexes to _vertexes
          // Skip if there's an adjacency

          // The center coordinates for the column/row
          const [x, y] = [c * 2 + 1, r * 2 + 1];

          // Add the top vertex
          if (!hasAdjacency(indexes, 'top')) {
            _vertexes.head.push({
              face: 'top',
              x,
              y: y - 1,
            });
          }

          // Add the right vertex
          if (!hasAdjacency(indexes, 'right')) {
            _vertexes.head.push({
              face: 'right',
              x: x + 1,
              y,
            });
          }

          if (!hasAdjacency(indexes, 'left')) {
            _vertexes.tail.push({
              face: 'left',
              x: x - 1,
              y,
            });
          }

          if (!hasAdjacency(indexes, 'bottom')) {
            _vertexes.tail.push({
              face: 'bottom',
              x,
              y: y + 1,
            });
          }

          break;
        }

        // Large circle
        case 'O': {
          break;
        }

        case '_':
        default: {
          break;
        }
      }
    });
  });

  const vertexes = [..._vertexes.head, ..._vertexes.tail.reverse()];

  const bezierPathPoints: Array<PathPoint> = vertexes.map(
    ({ face, x, y }, i) => {
      // Get the next point
      const { x: xNext, y: yNext } = vertexes[i + 1] || vertexes[0];

      switch (face) {
        case 'top': {
          return {
            x,
            y,
            b1: [x + bezierDist, y],
            b2: [xNext, yNext - bezierDist],
          };
        }

        case 'right': {
          return {
            x,
            y,
            b1: [x, y + bezierDist],
            b2: [xNext > x ? xNext - bezierDist : xNext + bezierDist, yNext],
          };
        }

        case 'bottom': {
          return {
            x,
            y,
            b1: [x - bezierDist, y],
            b2: [xNext, yNext + bezierDist],
          };
        }

        case 'left': {
          return {
            x,
            y,
            b1: [x, y - bezierDist],
            b2: [xNext > x ? xNext - bezierDist : xNext + bezierDist, yNext],
          };
        }
      }

      return { x, y };
    },
  );

  const path = `M\n${bezierPathPoints
    .map(
      ({ x, y, b1, b2 }) =>
        `${x},${y} C ${b1?.[0]},${b1?.[1]} ${b2?.[0]},${b2?.[1]}`,
    )
    .join('\n')}
  ${vertexes[0].x} ${vertexes[0].y} Z`;

  console.log(path);

  return (
    <svg viewBox="0 0 8 8" width="500" height="500">
      <path d={path} />
      {/* DEBUG */}
      {_SHOW_GRID && (
        <g>
          {new Array(9).fill(null).map((_, i) => (
            <>
              <line
                key={i + 'vert'}
                stroke="red"
                x1={i}
                x2={i}
                y1={0}
                y2={9}
                strokeWidth={0.01}
              />
              <line
                key={i + 'horiz'}
                stroke="red"
                x1={0}
                x2={9}
                y1={i}
                y2={i}
                strokeWidth={0.01}
              />
            </>
          ))}
        </g>
      )}
    </svg>
  );
}
