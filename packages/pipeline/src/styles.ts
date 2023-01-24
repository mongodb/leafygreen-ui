import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration, typeScales } from '@leafygreen-ui/tokens';

import { edges } from './svgs/edges';
import { Size } from './types';

export const svgInnerOutlineClassName = createUniqueClassName('pipeline');
export const svgOuterOutlineClassName = createUniqueClassName('pipeline');
export const svgInnerClassName = createUniqueClassName('pipeline');

// base styles

export const basePipelineStyles = css`
  display: flex;
  counter-reset: hiddenCount;
  font-weight: 600;
`;

export const basePipelineListStyles = css`
  display: flex;
  flex-grow: 1;
  flex-wrap: wrap;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 74px;
`;

export const baseSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
    height: 22px;
  `,
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    height: 28px;
  `,
  [Size.Normal]: css`
    font-size: ${typeScales.body1.fontSize}px;
    height: 36px;
  `,
  [Size.Large]: css`
    font-size: 18px;
    height: 48px;
  `,
};

// Counter Styles

export const counterVisibleStyles = css`
  display: flex;
`;

export const counterSvgBaseStyles = css`
  position: absolute;
  width: 100%;
  height: calc(100% + 10px);
  display: flex;
`;

export const counterSvgColStyles = css`
  width: 50%;
  position: relative;
  overflow: hidden;
`;

export const counterSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    min-width: 44px;
    margin-left: -6px;

    &::before {
      padding: 0 18px;
    }
  `,
  [Size.Small]: css`
    min-width: 48px;
    margin-left: -8px;

    &::before {
      padding: 0 21px;
    }
  `,
  [Size.Normal]: css`
    min-width: 54px;
    margin-left: -9px;

    &::before {
      padding: 0 23px;
    }
  `,
  [Size.Large]: css`
    min-width: 66px;
    margin-left: -11px;

    &::before {
      padding: 0px 28px;
    }
  `,
};

export const counterBaseStyles = cx(
  css`
    display: none;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-left: -11px;
    &::before {
      white-space: nowrap;
      content: '+' counter(hiddenCount);
      z-index: 1;
    }

    .${svgInnerClassName} {
      transition: all ${transitionDuration.slower}ms ease-in-out;
    }

    .${svgInnerOutlineClassName}, .${svgOuterOutlineClassName} {
      fill: rgba(255, 255, 255, 0);
      transition: all ${transitionDuration.slower}ms ease-in-out;
    }

    &:focus-visible,
    &:focus {
      outline: none;
    }
  `,
);

export const svgStyles = css`
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
`;

export const svgLayer1Styles = cx(
  svgStyles,
  css`
    left: 0;
  `,
);

export const svgLayer2Styles = cx(
  svgStyles,
  css`
    right: 0;
  `,
);

export const counterThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.dark1};

    .${svgInnerClassName} {
      fill: ${palette.blue.light3};
    }

    &:focus-visible {
      .${svgOuterOutlineClassName} {
        fill: ${palette.blue.light1};
      }
    }

    &:hover {
      .${svgInnerOutlineClassName} {
        fill: ${palette.blue.light3};
      }
      .${svgInnerClassName} {
        fill: ${palette.blue.light2};
      }
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light2};

    .${svgInnerClassName} {
      fill: ${palette.blue.dark2};
    }

    &:focus-visible {
      .${svgOuterOutlineClassName} {
        fill: ${palette.blue.light1};
      }
    }

    &:hover {
      .${svgInnerOutlineClassName} {
        fill: ${palette.blue.dark2};
      }
      .${svgInnerClassName} {
        fill: ${palette.blue.dark1};
      }
    }
  `,
};

// Stage Styles

export const stageTextStyles = css`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const stageTextSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    padding: 0 6px;
  `,
  [Size.Small]: css`
    padding: 0 6px;
  `,
  [Size.Normal]: css`
    padding: 0 8px;
  `,
  [Size.Large]: css`
    padding: 0 12px;
  `,
};

export const stageTextThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.blue.light2};
    color: ${palette.blue.dark1};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.blue.dark1};
    color: ${palette.blue.light2};
  `,
};

export const stageBaseStyles = cx(
  css`
    display: flex;
    flex-grow: 1;
    height: 100%;

    &[data-stage-visible='false'] {
      counter-increment: hiddenCount;
    }

    &::before,
    &::after {
      content: '';
      display: inline-block;
      flex-shrink: 0;
      position: relative;
      height: 100%;
    }

    &:first-of-type {
      span {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  `,
);

export const stageSvgThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    &:not(&:first-of-type) {
      &::before {
        background: ${palette.blue.dark1};
        right: -1px;
      }
    }
    &::after {
      background: ${palette.blue.dark1};
      left: -1px;
    }
  `,
  [Theme.Light]: css`
    &:not(&:first-of-type) {
      &::before {
        background: ${palette.blue.light2};
        right: -1px;
      }
    }
    &::after {
      background: ${palette.blue.light2};
      left: -1px;
    }
  `,
};

// Adding edges of segments as an SVG with CSS
export const stageSvgSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    &:first-of-type {
      span {
        padding-left: 10px;
      }
    }
    &:not(&:first-of-type) {
      margin-left: -3px;
      &::before {
        mask: url('${edges[Size.XSmall].before}');
        width: 7px;
      }
    }
    &::after {
      mask: url('${edges[Size.XSmall].after}');
      width: 9px;
    }
  `,
  [Size.Small]: css`
    &:first-of-type {
      span {
        padding-left: 10px;
      }
    }
    &:not(&:first-of-type) {
      margin-left: -6px;
      &::before {
        mask: url('${edges[Size.Small].before}');
        width: 9px;
      }
    }
    &::after {
      mask: url('${edges[Size.Small].after}');
      width: 11px;
    }
  `,
  [Size.Normal]: css`
    &:first-of-type {
      span {
        padding-left: 12px;
      }
    }
    &:not(&:first-of-type) {
      margin-left: -7px;
      &::before {
        mask: url('${edges[Size.Normal].before}');
        width: 13px;
      }
    }
    &::after {
      mask: url('${edges[Size.Normal].after}');
      width: 13px;
    }
  `,
  [Size.Large]: css`
    &:first-of-type {
      span {
        padding-left: 15px;
      }
    }
    &:not(&:first-of-type) {
      margin-left: -8px;
      &::before {
        mask: url('${edges[Size.Large].before}');
        width: 13px;
      }
    }
    &::after {
      mask: url('${edges[Size.Large].after}');
      width: 15px;
    }
  `,
};

export const tooltipStyles = css`
  max-width: 400px;
`;

export const tooltipTextStyles = css`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;

  span {
    display: inline-flex;
  }
`;
