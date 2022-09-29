import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import {
  createDataProp,
  createUniqueClassName,
  Theme,
} from '@leafygreen-ui/lib';
import { typeScales } from '@leafygreen-ui/tokens';

export const svgInnerOutlineClassName = createUniqueClassName('pipeline');
export const svgOuterOutlineClassName = createUniqueClassName('pipeline');
export const svgInnerClassName = createUniqueClassName('pipeline');

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Normal: 'normal',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

export const sharedBaseStyles = css`
  font-weight: 600;
  flex: 1 1 auto;
  white-space: nowrap;
  z-index: 2;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  display: flex;
`;



export const baseStyles = css`
  counter-reset: hiddenCount;
  flex-direction: row;
`;

export const basePipelineStyles = css`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 74px;
`;

export const baseSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    display: flex;
    font-size: ${typeScales.body1.fontSize}px;
    height: 22px;
  `,
  [Size.Small]: css`
    display: flex;
    font-size: ${typeScales.body1.fontSize}px;
    height: 28px;
  `,
  [Size.Normal]: css`
    display: flex;
    font-size: ${typeScales.body1.fontSize}px;
    height: 36px;
  `,
  [Size.Large]: css`
    display: flex;
    font-size: 18px;
    height: 48px;
  `,
};

export const counterSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    min-width: 44px;
    margin-left: -7px;

    &::before {
      padding: 0 15px;
    }
  `,
  [Size.Small]: css`
    min-width: 48px;
    margin-left: -8px;

    &::before {
      padding: 0 15px;
    }
  `,
  [Size.Normal]: css`
    min-width: 54px;
    margin-left: -11px;

    &::before {
      padding: 0 15px;
    }
  `,
  [Size.Large]: css`
    min-width: 66px;
    margin-left: -11px;

    &::before {
      padding: 0 15px;
    }
  `,
};

export const counterBaseStyles = cx(
  sharedBaseStyles,
  css`
    margin-left: -11px;
    &::before {
      white-space: nowrap;
      content: '+' counter(hiddenCount);
      z-index: 1;
    }

    .${svgInnerOutlineClassName}, .${svgOuterOutlineClassName} {
      opacity: 0;
      transition: opacity 1500ms ease-in-out;
    }

    // .${svgInnerOutlineClassName}, .${svgOuterOutlineClassName} {
    //   opacity: 0;
    // }

    // // .${svgOuterOutlineClassName} {
    // //   transition: opacity 10050ms ease-in-out;
    // // }

    &:focus-visible {
      outline: none;
      .${svgInnerOutlineClassName}, .${svgOuterOutlineClassName} {
        opacity: 1; 
      }
      // .${svgOuterOutlineClassName} {
      //   transition: opacity 150ms ease-in-out;
      // }
    }

    // &:hover {
    //   .${svgInnerOutlineClassName} {
    //     transition: opacity 150ms ease-in-out;
    //     opacity: 1; 
    //     fill: red;
    //   }
    // }

  `,
);

export const counterThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.dark1};
    .${svgInnerClassName} {
      fill: ${palette.blue.light3};
    }
    .${svgInnerOutlineClassName} {
      fill: ${palette.white};
    }
    .${svgOuterOutlineClassName} {
      fill: ${palette.blue.light1};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light2};
    .${svgInnerClassName} {
      fill: ${palette.blue.dark2};
    }
    .${svgInnerOutlineClassName} {
      fill: ${palette.black};
    }
    .${svgOuterOutlineClassName} {
      fill: ${palette.blue.light1};
    }
  `,
};

export const stageTextStyles = css`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

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
  sharedBaseStyles,
  css`
    flex: 1 1 auto;
    white-space: nowrap;
    z-index: 1;

    &[data-stage-visible='false'] {
      counter-increment: hiddenCount;
    }

    &::before,
    &::after {
      content: '';
      background-repeat: no-repeat;
      background-size: cover;
      background-position: right;
      display: inline-block;
      flex-shrink: 0;
      position: relative;
      height: 100%;
    }
  `,
);

export const stageSvgThemeStyles = (theme: Theme) => {
  return css`
    &:not(&:first-of-type) {
      &::before {
        background-image: url("data:image/svg+xml,%3Csvg width='13' height='48' viewBox='0 0 13 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0.223607 1.44721C-0.108843 0.782313 0.374652 0 1.11803 0H13V48H1.11803C0.374652 48 -0.108844 47.2177 0.223607 46.5528L10.382 26.2361C11.0858 24.8284 11.0858 23.1716 10.382 21.7639L0.223607 1.44721Z' fill='%23${theme ===
        Theme.Light
          ? 'C3E7FE'
          : '1254B7'}'/%3E%3C/svg%3E%0A");
        left: 1px;
      }
    }

    &::after {
      background-image: url("data:image/svg+xml,%3Csvg width='15' height='48' viewBox='0 0 15 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0H0.572721C2.47768 0 4.21713 1.08246 5.05854 2.79152L14.4127 21.7915C15.0983 23.184 15.0983 24.816 14.4127 26.2085L5.05855 45.2085C4.21713 46.9175 2.47768 48 0.572721 48H0V0Z' fill='%23${theme ===
      Theme.Light
        ? 'C3E7FE'
        : '1254B7'}'/%3E%3C/svg%3E%0A");
      left: -1px;
    }
  `;
};

export const stageSvgSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    &:not(&:first-of-type) {
      margin-left: -9px;
      &::before {
        width: 12px;
      }
    }

    &::after {
      width: 6px;
    }
  `,
  [Size.Small]: css`
    &:not(&:first-of-type) {
      margin-left: -9px;
      &::before {
        width: 12px;
      }
    }

    &::after {
      width: 8px;
    }
  `,
  [Size.Normal]: css`
    &:not(&:first-of-type) {
      margin-left: -9px;
      &::before {
        width: 13px;
      }
    }

    &::after {
      width: 11px;
    }
  `,
  [Size.Large]: css`
    &:not(&:first-of-type) {
      margin-left: -10px;
      &::before {
        width: 15px;
      }
    }

    &::after {
      width: 15px;
    }
  `,
};

export const stageTextBaseStyles: Record<Size, string> = {
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
    padding: 0 10px;
  `,
};

export const svgStyles = css`
  position: absolute;
`;

export const svgLayer1Styles = cx(
  svgStyles,
  css`
    left: 0;

    top: 50%;
    transform: translate(0%, -50%);
  `,
);

export const svgLayer2Styles = cx(
  svgStyles,
  css`
    // width: 70%;
    right: 0;

    top: 50%;
    transform: translate(0%, -50%);
  `,
);

/* LeafyGreen Data attributes */

// Pipeline
export const pipelineAttr = createDataProp('pipeline');
export const pipelineStages = createDataProp('pipeline-stages');

// Stage
export const stageAttr = createDataProp('pipeline-stage');
export const stageChevronAttr = createDataProp('pipeline-stage-chevron');

// Counter
export const counterAttr = createDataProp('pipeline-counter');
export const counterChevronAttr = createDataProp('pipeline-counter-chevron');
