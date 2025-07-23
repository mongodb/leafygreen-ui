import { checkWrapperClassName } from '@leafygreen-ui/checkbox';
import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  color,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

const getBaseLegendCheckboxStyles = ({
  checkboxColor,
  theme,
}: {
  checkboxColor?: string;
  theme: Theme;
}) => {
  const defaultCheckboxColor =
    theme === 'dark' ? palette.blue.light1 : palette.blue.base;

  return css`
    padding: 0 ${spacing[100]}px;
    border-radius: ${borderRadius[100]}px;

    &:hover {
      background-color: ${color[theme].background.secondary.hover};
    }

    .${checkWrapperClassName} {
      border-color: ${checkboxColor || defaultCheckboxColor};

      &:before {
        background-color: ${checkboxColor || defaultCheckboxColor};
      }
    }

    label {
      align-items: center;
      gap: ${spacing[100]}px;
      font-size: ${typeScales.disclaimer.fontSize}px;
      line-height: ${typeScales.disclaimer.lineHeight}px;
      font-weight: ${fontWeights.regular};
    }
  `;
};

const getFilledStyles = ({
  checkboxColor,
  theme,
}: {
  checkboxColor?: string;
  theme: Theme;
}) => {
  const defaultCheckboxColor =
    theme === 'dark' ? palette.blue.light1 : palette.blue.base;

  return css`
    .${checkWrapperClassName} {
      background-color: ${checkboxColor || defaultCheckboxColor};
    }
  `;
};

export const getLegendCheckboxStyles = ({
  className,
  checkboxColor,
  showFilled,
  theme,
}: {
  className?: string;
  checkboxColor?: string;
  showFilled: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseLegendCheckboxStyles({ checkboxColor, theme }),
    {
      [getFilledStyles({ checkboxColor, theme })]: showFilled,
    },
    className,
  );
