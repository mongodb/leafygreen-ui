/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core';
import facepaint from 'facepaint';

// mobile, tablet, desktop small, desktop large
const breakpoints = [320, 768, 1024, 1440];
const gap = ['16px', '16px', '32px', '32px'];
const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

interface GridInterface {
  xs?: number;
  sm?: number;
  med?: number;
  lg?: number;
}

const gridContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  ${mq({
    width: [
      `calc(100% + ${gap[0]})`,
      `calc(100% + ${gap[1]})`,
      `calc(100% + ${gap[2]})`,
      `calc(100% + ${gap[3]})`,
    ],
  })}

  ${mq({
    margin: [
      `calc(-1 * ${gap[0]} / 2)`,
      `calc(-1 * ${gap[1]} / 2)`,
      `calc(-1 * ${gap[2]} / 2)`,
      `calc(-1 * ${gap[3]} / 2)`,
    ],
  })}
`;

const gridItemStyle = css`
  box-sizing: border-box;

  ${mq({
    padding: [
      `calc(${gap[0]} /2)`,
      `calc(${gap[1]} /2)`,
      `calc(${gap[2]} /2)`,
      `calc(${gap[3]} /2)`,
    ],
  })}
`;

const getSize = (size: number, breakpoint: 'xs' | 'sm' | 'med' | 'lg') => {
  // const
  // const width = `${Math.round(size / 12) * 100}%`;
  // if (breakpoint === 'xs') {
  // }
};

export function GridContainer({ children }: { children?: React.ReactNode }) {
  return <div css={gridContainerStyle}>{children}</div>;
}

export function Grid({ children, size = 3 }: { children?: React.ReactNode }) {
  return (
    <div
      css={css`
        box-sizing: border-box;
        width: ${Math.round(100 / 12) * size}%;

        ${mq({
          padding: [
            `calc(${gap[0]} /2)`,
            `calc(${gap[1]} /2)`,
            `calc(${gap[2]} /2)`,
            `calc(${gap[3]} /2)`,
          ],
        })}
      `}
    >
      {children}
    </div>
  );
}
