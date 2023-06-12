import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Size } from '../types';

export const radioBoxSizes: { [K in Size]: string } = {
  [Size.Default]: css`
    width: 169px;
  `,

  [Size.Compact]: css`
    padding-right: 12px;
    padding-left: 12px;
  `,

  [Size.Full]: css`
    flex: 1;
  `,
};

export const inputStyles = css`
  opacity: 0;
  position: absolute;
  pointer-events: none;
`;

interface StateForStyles {
  checked: boolean;
  disabled: boolean;
  size: Size;
  darkMode: boolean;
}

export const getRadioDisplayStyles = ({
  checked,
  disabled,
  size,
  darkMode,
}: StateForStyles) => {
  return cx(
    css`
      display: flex;
      align-items: center;
      justify-content: center;

      padding: 16px 24px;

      font-size: 13px;
      font-weight: ${fontWeights.bold};
      text-align: center;
      overflow-wrap: break-word;
      background-color: ${darkMode ? palette.gray.dark4 : palette.white};
      border-radius: 6px;
      color: ${darkMode ? palette.gray.light2 : palette.black};
      border: 1px solid ${palette.gray.base};

      cursor: pointer;
      pointer-events: auto;
      transition: ${transitionDuration.default}ms ease-in-out;
      transition-property: border-color, box-shadow;

      &:hover,
      &:active {
        box-shadow: ${darkMode ? hoverRing.dark.gray : hoverRing.light.gray};
      }

      input:focus-visible + & {
        border-color: ${palette.gray.base};
        box-shadow: ${darkMode
          ? focusRing.dark.default
          : focusRing.light.default};
      }
    `,
    {
      [css`
        border-color: rgba(255, 255, 255, 0);
        box-shadow: 0 0 0 3px ${palette.green.dark1};
        &:hover,
        &:active {
          box-shadow: 0 0 0 3px ${palette.green.dark1};
        }
      `]: checked,
      [css`
        color: ${darkMode ? palette.gray.dark1 : palette.gray.light1};
        background: ${darkMode ? palette.gray.dark3 : palette.gray.light3};
        font-weight: ${fontWeights.regular};
        border-color: ${darkMode ? palette.gray.dark2 : palette.gray.light2};
        cursor: not-allowed;
        &:hover,
        &:active {
          box-shadow: unset;
        }
      `]: disabled,
    },
    radioBoxSizes[size],
  );
};

export const radioWrapper = css`
  font-family: ${fontFamilies.default};
  display: flex;
  position: relative;

  &:not(:last-of-type) {
    margin-right: 12px;
  }
`;
