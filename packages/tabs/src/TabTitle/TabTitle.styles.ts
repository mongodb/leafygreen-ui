import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  fontWeights,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

interface ListTitleMode {
  base: string;
  hover: string;
  focus: string;
  selected: string;
  disabled: string;
}

export const listTitleModeStyles: Record<Theme, ListTitleMode> = {
  light: {
    base: css`
      color: ${palette.gray.dark1};
    `,
    hover: css`
      &:hover {
        cursor: pointer;
        color: ${palette.gray.dark3};
        &:after {
          background-color: ${palette.gray.light2};
        }
      }
    `,
    focus: css`
      &:focus-visible {
        color: ${palette.blue.base};

        &:after {
          background-color: ${palette.blue.light1};
        }
      }
    `,
    selected: css`
      color: ${palette.green.dark2};
      font-weight: ${fontWeights.bold};

      &:after {
        transform: scaleX(1);
        background-color: ${palette.green.dark1};
      }

      &:hover {
        color: ${palette.green.dark2};

        &:after {
          transform: scaleX(1);
          background-color: ${palette.green.dark1};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.light1};
    `,
  },

  dark: {
    base: css`
      color: ${palette.gray.light1};
    `,
    hover: css`
      &:hover {
        cursor: pointer;
        color: ${palette.white};

        &:after {
          background-color: ${palette.gray.dark2};
        }
      }
    `,
    focus: css`
      &:focus-visible {
        color: ${palette.blue.light1};

        &:after {
          background-color: ${palette.blue.light1};
        }
      }
    `,
    selected: css`
      color: ${palette.green.base};
      font-weight: ${fontWeights.bold};

      &:after {
        transform: scaleX(1);
        background-color: ${palette.green.dark1};
      }

      &:hover {
        color: ${palette.green.base};

        &:after {
          transform: scaleX(1);
          background-color: ${palette.green.dark1};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.dark2};
    `,
  },
};

export const listTitleFontSize: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [BaseFontSize.Body2]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
  `,
};

export const listTitleStyles = css`
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.medium};
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 300px;
  padding: 12px 16px;
  background-color: transparent;
  border: 0px;
  margin: 0;
  text-decoration: none;
  transition: ${transitionDuration.default}ms color ease-in-out;

  &:focus:not(:disabled) {
    outline: none;
    font-weight: ${fontWeights.bold};
  }

  // We create a pseudo element that's the width of the bolded text
  // This way there's no layout shift on hover when the text is bolded.
  &:before {
    content: attr(data-text);
    height: 0;
    font-weight: ${fontWeights.bold};
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    border-radius: 4px 4px 0 0;
    transition: all ${transitionDuration.default}ms ease-in-out;
    background-color: transparent;
    transform: scaleX(0.8);
  }

  &:hover:after {
    transform: scaleX(0.95);
  }

  &:active:after {
    &:after {
      transform: scaleX(1);
    }
  }
`;

export const listTitleChildrenStyles = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // Cannot use flexbox here to center children because it breaks text-overflow: ellipsis
  > svg {
    vertical-align: text-bottom;
    margin-right: 4px;
  }
`;
