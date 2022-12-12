import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';
import { labelTypeScaleStyles } from '@leafygreen-ui/typography';

import { Size } from './types';

export const containerStyle = css`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  grid-template-areas: 'code button';
  height: 48px;
  width: 400px;
  margin: 2px 0;
`;

export const buttonContainerStyle = css`
  height: 36px;
`;

export const codeStyle = css`
  grid-area: code;
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 100%;
  font-family: ${fontFamilies.code};
  border: 1px solid;
  border-right: unset;
  border-radius: 6px 0 0 6px;
  padding-left: 12px;
  white-space: nowrap;
  overflow: auto;
`;

export const codeStyleColor: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background-color: ${palette.gray.light3};
    border-color: ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    background-color: ${palette.black};
    border-color: ${palette.gray.dark1};
  `,
};

// Border is removed from the code component and added to the parent
export const codeStyleNoButton = css`
  border: 0;
`;

export const labelNoButtonStyle = css`
  font-size: 18px;
  line-height: 24px;
`;

export const codeFontStyle: Record<Size, string> = {
  [Size.Default]: css`
    font-size: ${typeScales.code1.fontSize}px;
    line-height: ${typeScales.code1.lineHeight}px;
  `,
  [Size.Large]: css`
    font-size: ${typeScales.code2.fontSize}px;
    line-height: ${typeScales.code2.lineHeight}px;
  `,
};

export const labelFontStyle: Record<Size, string> = {
  [Size.Default]: labelTypeScaleStyles[BaseFontSize.Body1],
  [Size.Large]: labelTypeScaleStyles[BaseFontSize.Body2],
};

export const noButtonContainerStyle = css`
  overflow: hidden;
  border-radius: 12px;
`;

// When there is no button, remove the border from the code component and add the border to this component so it sits above the button wrapper box shadow
export const noButtonContainerStyleMode: Record<Theme, string> = {
  [Theme.Light]: css`
    border-radius: 6px;
    border: 1px solid ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    border-radius: 6px;
    border: 1px solid ${palette.gray.dark1};
  `,
};

export const buttonWrapperStyle = css`
  grid-area: button;
  position: relative;
  display: inline-block;
  height: 100%;
`;

export const buttonWrapperStyleShadow = css`
  &:before {
    content: '';
    display: block;
    position: absolute;
    height: calc(100% - 6px);
    width: 16px;
    left: 0px;
    top: 3px;
    border-radius: 100%;
    transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
  }
`;

export const buttonWrapperStyleShadowTheme: Record<Theme, string> = {
  [Theme.Light]: css`
    &:before {
      box-shadow: 0 0 10px 0 ${transparentize(0.65, palette.gray.dark1)};
    }

    &:hover:before {
      box-shadow: 0 0 12px 0 ${transparentize(0.6, palette.gray.dark1)};
    }
  `,
  [Theme.Dark]: css`
    &:before {
      box-shadow: -10px 0 10px 0 ${transparentize(0.4, palette.black)};
    }

    &:hover:before {
      box-shadow: -12px 0 10px 0 ${transparentize(0.4, palette.black)};
    }
  `,
};
export const buttonStyle = css`
  height: 100%;
  border-radius: 0 6px 6px 0;

  // The ripple element
  & > :first-child {
    border-radius: 0 6px 6px 0;
  }
`;

export const iconStyle = css`
  padding-right: 6px;
`;
