import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { edges } from '../svgs/edges';
import { Size } from '../types';

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
