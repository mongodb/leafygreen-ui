import { css } from 'emotion';
import { spacing } from '@leafygreen-ui/tokens';

const alignments = {
  bottom: 'b',
  top: 't',
  left: 'l',
  right: 'r',
} as const;

const coords = {
  x: ['left', 'right'],
  y: ['top', 'bottom'],
} as const;

function generateMarginObject() {
  const margin = {};

  Object.keys(alignments).forEach(align => {
    Object.entries(spacing).forEach(
      ([index, space]) =>
        (margin[
          `${alignments[align]}${index}`
        ] = css`margin-${align}: ${space}px;`),
    );
  });

  Object.keys(coords).forEach(coord => {
    Object.entries(spacing).forEach(
      ([index, space]) =>
        (margin[
          `${coord}${index + 1}`
        ] = css`margin-${coords[0]}: ${space}px; margin-${coords[1]}: ${space}px;`),
    );
  });

  return margin;
}

export const margin: Record<typeof alignments, string> = {
  ...generateMarginObject(),
  // b1: css`
  //   margin-bottom: ${spacing[1]}px;
  // `,
  // b2: css`
  //   margin-bottom: ${spacing[2]}px;
  // `,
  // b3: css`
  //   margin-bottom: ${spacing[3]}px;
  // `,
  // b4: css`
  //   margin-bottom: ${spacing[4]}px;
  // `,
  // t1: css`
  //   margin-top: ${spacing[1]}px;
  // `,
  // t2: css`
  //   margin-top: ${spacing[2]}px;
  // `,
  // t3: css`
  //   margin-top: ${spacing[3]}px;
  // `,
  // t4: css`
  //   margin-top: ${spacing[4]}px;
  // `,
  // l1: css`
  //   margin-left: ${spacing[1]}px;
  // `,
  // l2: css`
  //   margin-left: ${spacing[2]}px;
  // `,
  // l3: css`
  //   margin-left: ${spacing[3]}px;
  // `,
  // l4: css`
  //   margin-left: ${spacing[4]}px;
  // `,
  // r1: css`
  //   margin-right: ${spacing[1]}px;
  // `,
  // r2: css`
  //   margin-right: ${spacing[2]}px;
  // `,
  // r3: css`
  //   margin-right: ${spacing[3]}px;
  // `,
  // r4: css`
  //   margin-right: ${spacing[4]}px;
  // `,
  // x1: css`
  //   margin-left: ${spacing[1]}px;
  //   margin-right: ${spacing[1]}px;
  // `,
  // x2: css`
  //   margin-left: ${spacing[2]}px;
  //   margin-right: ${spacing[2]}px;
  // `,
  // x3: css`
  //   margin-left: ${spacing[3]}px;
  //   margin-right: ${spacing[3]}px;
  // `,
  // x4: css`
  //   margin-left: ${spacing[4]}px;
  //   margin-right: ${spacing[4]}px;
  // `,
  // y1: css`
  //   margin-top: ${spacing[1]}px;
  //   margin-bottom: ${spacing[1]}px;
  // `,
  // y2: css`
  //   margin-top: ${spacing[2]}px;
  //   margin-bottom: ${spacing[2]}px;
  // `,
  // y3: css`
  //   margin-top: ${spacing[3]}px;
  //   margin-bottom: ${spacing[3]}px;
  // `,
  // y4: css`
  //   margin-top: ${spacing[4]}px;
  //   margin-bottom: ${spacing[4]}px;
  // `,
} as const;

export const padding = {
  b1: css`
    padding-bottom: ${spacing[1]}px;
  `,
  b2: css`
    padding-bottom: ${spacing[2]}px;
  `,
  b3: css`
    padding-bottom: ${spacing[3]}px;
  `,
  b4: css`
    padding-bottom: ${spacing[4]}px;
  `,
  t1: css`
    padding-top: ${spacing[1]}px;
  `,
  t2: css`
    padding-top: ${spacing[2]}px;
  `,
  t3: css`
    padding-top: ${spacing[3]}px;
  `,
  t4: css`
    padding-top: ${spacing[4]}px;
  `,
  l1: css`
    padding-left: ${spacing[1]}px;
  `,
  l2: css`
    padding-left: ${spacing[2]}px;
  `,
  l3: css`
    padding-left: ${spacing[3]}px;
  `,
  l4: css`
    padding-left: ${spacing[4]}px;
  `,
  r1: css`
    padding-right: ${spacing[1]}px;
  `,
  r2: css`
    padding-right: ${spacing[2]}px;
  `,
  r3: css`
    padding-right: ${spacing[3]}px;
  `,
  r4: css`
    padding-right: ${spacing[4]}px;
  `,
  x1: css`
    padding-left: ${spacing[1]}px;
    padding-right: ${spacing[1]}px;
  `,
  x2: css`
    padding-left: ${spacing[2]}px;
    padding-right: ${spacing[2]}px;
  `,
  x3: css`
    padding-left: ${spacing[3]}px;
    padding-right: ${spacing[3]}px;
  `,
  x4: css`
    padding-left: ${spacing[4]}px;
    padding-right: ${spacing[4]}px;
  `,
  y1: css`
    padding-top: ${spacing[1]}px;
    padding-bottom: ${spacing[1]}px;
  `,
  y2: css`
    padding-top: ${spacing[2]}px;
    padding-bottom: ${spacing[2]}px;
  `,
  y3: css`
    padding-top: ${spacing[3]}px;
    padding-bottom: ${spacing[3]}px;
  `,
  y4: css`
    padding-top: ${spacing[4]}px;
    padding-bottom: ${spacing[4]}px;
  `,
} as const;
