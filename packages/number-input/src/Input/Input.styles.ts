import { css } from '@leafygreen-ui/emotion';
import {
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { Size } from '../NumberInput/NumberInput.types';

export const baseInputStyles = css`
  all: unset;
  font-family: ${fontFamilies.default};
  font-weight: normal;
  width: 100%;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  height: inherit;
  box-sizing: border-box;

  // border-top-right-radius: 0;
  // border-bottom-right-radius: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const sizeInputStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    padding: 0 ${spacing[1] * 3}px;
  `,
  [Size.Small]: css`
    padding: 0 ${spacing[1] * 3}px;
  `,
  [Size.Default]: css`
    padding: 0 ${spacing[1] * 3}px;
  `,
};

export const inputWrapperBaseStyles = css`
  position: relative;

  border: 1px solid;
  border-radius: 6px;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;

  overflow: hidden;

  display: flex;
  align-items: center;
`;

export const arrowsBaseStyles = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 5px;
  height: 100%;
  justify-content: center;
`;

export const arrowBaseStyles = css`
  all: unset;
  display: flex;
  position: relative;
  height: 12px;
  width: 8px;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    svg {
      color: red;
    }
  }

  svg {
    position: absolute;
    translate: -50% -50%;
    top: 50%;
    left: 50%;
  }
`;
