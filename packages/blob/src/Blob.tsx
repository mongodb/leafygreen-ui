import React from 'react';
import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { BlobProps } from './types';
import { generateBlobPath } from './generateBlobPath';
import { useMemo } from 'react';

const _SHOW_GRID = true;

export default function Blob({ shape }: BlobProps) {
  const path = useMemo(() => generateBlobPath(shape), [shape]);

  return (
    <svg viewBox="0 0 8 8" width="100%" height="100%">
      {/* DEBUG */}
      {_SHOW_GRID && (
        <g>
          {new Array(4).fill(new Array(4).fill(null)).map((_, r) =>
            _.map((__: any, c: number) => (
              <>
                <circle
                  key={c + r}
                  r={1}
                  cx={c * 2 + 1}
                  cy={r * 2 + 1}
                  fill={palette.gray.light2}
                />
                <text
                  x={c * 2 + 1}
                  y={r * 2 + 1}
                  className={css`
                    font-size: 0.25px;
                  `}
                  fill={palette.gray.base}
                >
                  ({r},{c})
                </text>
              </>
            )),
          )}

          {new Array(9).fill(null).map((_, i) => (
            <>
              <line
                key={i + 'vert'}
                stroke={i % 2 ? palette.red.light2 : palette.red.base}
                x1={i}
                x2={i}
                y1={0}
                y2={8}
                strokeWidth={0.01}
              />
              <line
                key={i + 'horiz'}
                stroke={i % 2 ? palette.red.light2 : palette.red.base}
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
      <path
        d={path}
        fill={palette.green.base}
        stroke={palette.green.dark1}
        strokeWidth={0.05}
      />
    </svg>
  );
}
