import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  fontWeights,
  hoverRing,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

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
  font-weight: ${fontWeights.regular};
  line-height: 16px;
  border: 1px solid;
  border-radius: 6px;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
  margin-top: 4px;

  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: ${focusRing[Theme.Light].input};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const errorContainerStyle = css`
  display: flex;
  height: 20px;
  margin-top: 5px;
  align-items: center;
  font-weight: ${fontWeights.regular};
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
  errorIcon: string;
}

export const colorSets: Record<Theme, ColorSets> = {
  [Theme.Light]: {
    textArea: css`
      color: ${palette.gray.dark3};
      background-color: ${palette.white};
      border-color: ${palette.gray.base};

      &:hover:not(:disabled):not(:focus) {
        border-color: ${palette.gray.base};
        box-shadow: ${hoverRing[Theme.Light].gray};
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
        box-shadow: ${hoverRing[Theme.Light].red};
      }

      &:disabled {
        border-color: ${palette.gray.light1};
      }
    `,

    errorIcon: css`
      color: ${palette.red.base};
    `,
  },
  [Theme.Dark]: {
    textArea: css`
      color: ${palette.gray.light3};
      background-color: ${palette.gray.dark4};
      border-color: ${palette.gray.base};

      &:hover:not(:disabled):not(:focus) {
        border-color: ${palette.gray.base};
        box-shadow: ${hoverRing[Theme.Dark].gray};
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
        box-shadow: ${hoverRing[Theme.Dark].red};
      }

      &:disabled {
        border-color: ${palette.gray.dark2};
      }
    `,

    errorIcon: css`
      color: ${palette.red.light1};
    `,
  },
};
