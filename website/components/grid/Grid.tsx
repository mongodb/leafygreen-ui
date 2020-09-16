/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import facepaint from 'facepaint';
import { useMemo } from 'react';

const breakpoints = [320, 768, 1024, 1440];
const breakpointGaps = ['16px', '16px', '32px', '32px'];
const mq = facepaint(
  breakpoints.map(bp => `@media (min-width: ${bp}px)`),
  { literal: true },
);

const baseContainerStyles = css`
  display: flex;
  ${mq({
    width: breakpointGaps.map(gap => `calc(100% + ${gap})`),
    margin: breakpointGaps.map(gap => `calc(-1 * ${gap} / 2)`),
  })}
`;

const Direction = {
  Row: 'row',
  RowReverse: 'row-reverse',
  Column: 'column',
  ColumnReverse: 'column-reverse',
};

const Align = {
  FlexStart: 'flex-start',
  FlexEnd: 'flex-end',
  Center: 'center',
  Stretch: 'stretch',
  Baseline: 'baseline',
};

const Justify = {
  FlexStart: 'flex-start',
  FlexEnd: 'flex-end',
  Center: 'center',
  SpaceBetween: 'space-between',
  SpaceAround: 'space-around',
};

const Wrap = {
  Nowrap: 'nowrap',
  Wrap: 'wrap',
  WrapReverse: 'wrap-reverse',
};

type Direction = typeof Direction[keyof typeof Direction];
type Align = typeof Align[keyof typeof Align];
type Justify = typeof Justify[keyof typeof Justify];
type Wrap = typeof Wrap[keyof typeof Wrap];

type GridContainerProps = JSX.IntrinsicElements['div'] & {
  direction?: Direction;
  align?: Align;
  justify?: Justify;
  wrap?: Wrap;
};

export function GridContainer({
  direction = Direction.Row,
  align = Align.Center,
  justify = Justify.Center,
  wrap = Wrap.Wrap,
  children,
}: GridContainerProps) {
  const gridContainerStyles = css`
    ${baseContainerStyles};
    flex-direction: ${direction};
    flex-wrap: ${wrap};
    align-items: ${align};
    justify-content: ${justify};
  `;

  return <div css={gridContainerStyles}>{children}</div>;
}

const baseGridItemStyles = css`
  box-sizing: border-box;
  ${mq({
    padding: breakpointGaps.map(gap => `calc(${gap} / 2)`),
  })}
`;

const visibleGridItemStyles = css`
  flex-grow: 1;
  flex-shrink: 0;
`;

function getNormalizedBreakpoints({ sm, md, lg, xl }) {
  if (xl) {
    const normalizedLg = lg ?? xl;
    const normalizedMd = md ?? Math.ceil((normalizedLg / 2) * 3);
    const normalizedSm = sm ?? Math.ceil(normalizedMd * 2);
    return {
      xl,
      lg: normalizedLg,
      md: normalizedMd,
      sm: normalizedSm,
    };
  }

  if (lg) {
    const normalizedMd = md ?? Math.ceil((lg / 2) * 3);
    const normalizedSm = sm ?? Math.ceil(normalizedMd * 2);
    return {
      xl: lg,
      lg,
      md: normalizedMd,
      sm: normalizedSm,
    };
  }

  if (md) {
    const normalizedLg = Math.ceil((md / 3) * 2);
    return {
      xl: normalizedLg,
      lg: normalizedLg,
      md,
      sm: sm ?? Math.ceil(md * 2),
    };
  }

  if (sm) {
    return {
      xl: Math.ceil(sm / 3),
      lg: Math.ceil(sm / 3),
      md: Math.ceil(sm / 2),
      sm,
    };
  }

  return {
    sm,
    md,
    lg,
    xl,
  };
}

function getItemStyle(num: number) {
  if (num === 0) {
    return {
      display: 'none',
      width: 0,
      flexBasis: 0,
    };
  }

  if (num) {
    const width = `${Math.round(100 / 12) * num}%`;
    return {
      width,
      flexBasis: width,
      display: 'initial',
    };
  }

  return {
    width: '100%',
    flexBasis: 0,
    display: 'initial',
  };
}

type GridItemProps = JSX.IntrinsicElements['div'] & {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  colStart?: number;
};

export function GridItem({
  sm: smProp,
  md: mdProp,
  lg: lgProp,
  xl: xlProp,
  children,
  colStart,
}: GridItemProps) {
  const { sm, md, lg, xl } = useMemo(
    () =>
      getNormalizedBreakpoints({
        sm: smProp,
        md: mdProp,
        lg: lgProp,
        xl: xlProp,
      }),
    [smProp, mdProp, lgProp, xlProp],
  );

  const styles = useMemo(() => {
    return {
      sm: getItemStyle(sm),
      md: getItemStyle(md),
      lg: getItemStyle(lg),
      xl: getItemStyle(xl),
    };
  }, [sm, md, lg, xl]);

  return (
    <>
      {colStart && (
        <div
          css={css`
            ${baseGridItemStyles}
            width: ${Math.round(100 / 12) * colStart}%;
            flex-basis: ${Math.round(100 / 12) * colStart}%;
          `}
        />
      )}

      <div
        css={css`
          ${baseGridItemStyles}
          ${visibleGridItemStyles}
          ${mq({
            width: [
              styles.sm.width,
              styles.md.width,
              styles.lg.width,
              styles.xl.width,
            ],
            flexBasis: [
              styles.sm.flexBasis,
              styles.md.flexBasis,
              styles.lg.flexBasis,
              styles.xl.flexBasis,
            ],
            display: [
              styles.sm.display,
              styles.md.display,
              styles.lg.display,
              styles.xl.display,
            ],
          })}
        `}
      >
        {children}
      </div>
    </>
  );
}
