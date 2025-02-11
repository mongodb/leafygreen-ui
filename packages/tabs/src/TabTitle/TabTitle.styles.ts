import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  borderRadius,
  fontFamilies,
  fontWeights,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';
import { bodyTypeScaleStyles } from '@leafygreen-ui/typography';

import { Size } from '../Tabs';

const BODY_1_HEIGHT = 44;
const BODY_2_HEIGHT = 52;
const MAX_WIDTH = 300;
const SMALL_HEIGHT = 32;
const TRANSITION_DURATION = transitionDuration.default;

const baseStyles = css`
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.medium};
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: ${MAX_WIDTH}px;
  width: min-content;
  padding: ${spacing[300]}px ${spacing[400]}px;
  background-color: transparent;
  border: 0;
  margin: 0;
  text-decoration: none;
  transition-property: color, font-weight;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;

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
    border-radius: ${borderRadius[100]}px ${borderRadius[100]}px 0 0;
    transition-property: background-color, transform;
    transition-duration: ${TRANSITION_DURATION}ms;
    transition-timing-function: ease-in-out;
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

export const defaultSizeHeightStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    height: ${BODY_1_HEIGHT}px;
  `,
  [BaseFontSize.Body2]: css`
    height: ${BODY_2_HEIGHT}px;
  `,
};

interface ListTitleMode {
  base: string;
  hover: string;
  focus: string;
  selected: string;
  disabled: string;
}

const modeStyles: Record<Theme, ListTitleMode> = {
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
      &,
      &:hover {
        color: ${palette.green.dark2};
        font-weight: ${fontWeights.bold};

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
      &,
      &:hover {
        color: ${palette.gray.light2};
        font-weight: ${fontWeights.bold};

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

const sizeStyles: Record<Size, string> = {
  small: css`
    padding: ${spacing[150]}px ${spacing[200]}px;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    height: ${SMALL_HEIGHT}px;

    &:after {
      height: 2px;
    }
  `,
  default: css``,
};

export const getStyles = ({
  baseFontSize,
  className,
  disabled,
  isSelected,
  size,
  theme,
}: {
  baseFontSize: BaseFontSize;
  className: string;
  disabled: boolean;
  isSelected: boolean;
  size: Size;
  theme: Theme;
}) =>
  cx(
    baseStyles,
    bodyTypeScaleStyles[baseFontSize],
    defaultSizeHeightStyles[baseFontSize],
    modeStyles[theme].base,
    sizeStyles[size],
    {
      [modeStyles[theme].selected]: !disabled && isSelected,
      [modeStyles[theme].hover]: !disabled && !isSelected,
      [modeStyles[theme].disabled]: disabled,
    },
    modeStyles[theme].focus,
    className,
  );

export const childrenContainerStyles = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // Cannot use flexbox here to center children because it breaks text-overflow: ellipsis
  > svg {
    vertical-align: text-bottom;
    margin-right: ${spacing[100]}px;
  }
`;
