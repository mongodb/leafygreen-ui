import React from 'react';
import { palette } from '@leafygreen-ui/palette';
import { BlobProps } from './types';
import { generateBlobPath } from './generateBlobPath';
import { useMemo } from 'react';

// eslint-disable-next-line no-console
console.clear();

const _SHOW_GRID = true;

export default function Blob({ shape }: BlobProps) {
  const path = useMemo(() => generateBlobPath(shape), [shape]);

  return (
    <svg viewBox="0 0 8 8" width="500" height="500">
      {/* <path d={path} /> */}
      {/* DEBUG */}
      {_SHOW_GRID && (
        <g>
          {new Array(4)
            .fill(new Array(4).fill(null))
            .map((_, r) =>
              _.map((__: any, c: number) => (
                <circle
                  key={c + r}
                  r={1}
                  cx={c * 2 + 1}
                  cy={r * 2 + 1}
                  fill={palette.gray.light2}
                />
              )),
            )}

          {new Array(9).fill(null).map((_, i) => (
            <>
              <line
                key={i + 'vert'}
                stroke={palette.red.light1}
                x1={i}
                x2={i}
                y1={0}
                y2={8}
                strokeWidth={0.01}
              />
              <line
                key={i + 'horiz'}
                stroke={palette.red.light1}
                x1={0}
                x2={8}
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
