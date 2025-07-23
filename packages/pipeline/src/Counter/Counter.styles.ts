import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { Size } from '../types';

export const svgInnerOutlineClassName = createUniqueClassName('pipeline');
export const svgOuterOutlineClassName = createUniqueClassName('pipeline');
export const svgInnerClassName = createUniqueClassName('pipeline');

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
