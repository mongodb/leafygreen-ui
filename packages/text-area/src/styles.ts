import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import {
  spacing,
  fontFamilies,
  focusRing,
  hoverRing,
} from '@leafygreen-ui/tokens';
import { Mode } from './types';

export const containerStyles = css`
  display: flex;
  flex-direction: column;
`;

export const textAreaStyle = css`
  font-family: ${fontFamilies.default};
  width: 100%;
  min-height: ${spacing[6]}px;
  resize: none;
  margin: 0;
  padding: 8px 12px 1px 12px;
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  z-index: 1;
  border: 1px solid;
  border-radius: 6px;
  transition: 150ms ease-in-out;
  transition-property: border-color, box-shadow;
  margin-top: 4px;

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: ${focusRing[Mode.Light].input};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const errorMessageStyle = css`
  font-family: ${fontFamilies.default};
  display: flex;
  height: 20px;
  margin-top: 5px;
  align-items: center;
  font-weight: normal;
`;

export const errorMessageLabelStyles = css`
  line-height: 1;
`;

export const errorIconStyle = css`
  margin-right: 3px;
`;

interface ColorSets {
  textArea: string;
  errorBorder: string;
  errorMessage: string;
}

export const colorSets: Record<Mode, ColorSets> = {
  [Mode.Light]: {
    textArea: css`
      color: ${palette.gray.dark3};
      background-color: ${palette.white};
      border-color: ${palette.gray.base};

      &:hover:not(:disabled):not(:focus) {
        border-color: ${palette.gray.base};
        box-shadow: ${hoverRing[Mode.Light].gray};
      }

      &:disabled {
        color: ${palette.gray.base};
        background-color: ${palette.gray.light2};
        border-color: ${palette.gray.light1};

        &::placeholder {
          color: inherit;
        }
      }
    `,

    errorBorder: css`
      border-color: ${palette.red.base};

      &:hover:not(:disabled):not(:focus) {
        border-color: ${palette.red.base};
        box-shadow: ${hoverRing[Mode.Light].red};
      }

      &:disabled {
        border-color: ${palette.gray.light1};
      }
    `,

    errorMessage: css`
      color: ${palette.red.base};
    `,
  },
  [Mode.Dark]: {
    textArea: css`
      color: ${palette.gray.light3};
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.base};

      &:hover:not(:disabled):not(:focus) {
        border-color: ${palette.gray.base};
        box-shadow: ${hoverRing[Mode.Dark].gray};
      }

      &:disabled {
        color: ${palette.gray.dark1};
        background-color: ${palette.gray.dark3};
        border-color: ${palette.gray.dark2};

        &::placeholder {
          color: inherit;
        }
      }
    `,

    errorBorder: css`
      border-color: ${palette.red.light1};

      &:hover:not(:disabled):not(:focus) {
        border-color: ${palette.red.light1};
        box-shadow: ${hoverRing[Mode.Dark].red};
      }

      &:disabled {
        border-color: ${palette.gray.dark2};
      }
    `,

    errorMessage: css`
      color: ${palette.red.light1};
    `,
  },
};
