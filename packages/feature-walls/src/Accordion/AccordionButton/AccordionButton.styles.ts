import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  fontWeights,
  spacing,
  typeScales,
} from '@leafygreen-ui/tokens';

import { transitionDurations } from '../Accordion.styles';

const BORDER_OVERFLOW_SPACING = spacing[150];
export const HORIZONTAL_SPACING = spacing[400];
export const VERTICAL_SPACING = spacing[200];

const getBaseStyles = (theme: Theme) => css`
  all: unset;
  cursor: pointer;

  /* default state */
  margin: 0 -${BORDER_OVERFLOW_SPACING}px;
  border-color: transparent;
  border-style: solid;
  border-width: 0 ${BORDER_OVERFLOW_SPACING}px;
  border-radius: ${borderRadius[150]}px;
  padding: ${VERTICAL_SPACING}px ${spacing[400]}px;
  color: ${color[theme].text.primary.default};
  font-size: ${typeScales.body2.fontSize}px;
  line-height: ${typeScales.body2.lineHeight}px;

  transition-property: background-color, border-color, color, font-size,
    font-weight;
  transition-duration: ${transitionDurations.focusOrHover}ms;
  transition-timing-function: ease-out;

  /* hover state */
  &:hover {
    background-color: ${color[theme].background.secondary.hover};
    border-color: ${color[theme].border.secondary.hover};
  }
`;

const getExpandedStyles = css`
  /* expanded state */
  cursor: default;
  font-size: ${typeScales.large.fontSize}px;
  font-weight: ${fontWeights.bold};

  /* expanded hover state */
  &:hover {
    background-color: transparent;
    border-color: transparent;
  }
`;

const getFocusVisibleStyles = (theme: Theme) => css`
  /* non-expanded focus-visible state */
  &:focus-visible {
    background-color: ${color[theme].background.info.focus};
    border-color: ${color[theme].background.info.focus};
    color: ${color[theme].text.primary.focus};
  }
`;

export const getStyles = (
  theme: Theme,
  isExpanded: boolean,
  className?: string,
) =>
  cx(
    getBaseStyles(theme),
    {
      [getExpandedStyles]: isExpanded,
      [getFocusVisibleStyles(theme)]: !isExpanded,
    },
    className,
  );
