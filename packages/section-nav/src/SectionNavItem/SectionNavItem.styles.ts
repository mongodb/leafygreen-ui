import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, fontWeights, spacing, typeScales } from '@leafygreen-ui/tokens';

import {
  INDENTATION,
  TRANSITION_DURATION,
  WEDGE_BORDER_RADIUS,
  WEDGE_WIDTH,
} from './SectionNavItem.constants';

// This component currently only supports two levels of indentation.
// If more levels are needed, this function can be extended.
const getIndentation = (level: number) => {
  if (level === 1) return INDENTATION['level1'];
  return INDENTATION['level2'];
};

export const itemStyles = css`
  list-style: none;
`;

export const getLinkStyles = ({
  active = false,
  theme = Theme.Light,
  className,
  level,
}: {
  active?: boolean;
  theme?: Theme;
  className?: string;
  level: number;
}) =>
  cx(
    css`
      ${getBaseStyles({ theme, level })};
      ${getHoverStyles({ theme })}
    `,
    {
      [getActiveStyles({ theme })]: active,
    },
    css`
      ${getFocusStyles({ theme })};
    `,
    className,
  );

export const getBaseStyles = ({
  theme,
  level,
}: {
  theme: Theme;
  level: number;
}) => css`
  all: unset;
  cursor: pointer;
  display: block;
  color: ${color[theme].text.secondary.default};
  padding-block: ${spacing[150]}px;
  font-size: ${typeScales.body1.fontSize}px;
  font-weight: ${fontWeights.regular};
  line-height: ${typeScales.body1.lineHeight}px;
  position: relative;
  padding-inline: calc(${getIndentation(level)}px + ${WEDGE_WIDTH}px)
    ${spacing[400]}px;

  transition-property: font-weight;
  transition-duration: ${TRANSITION_DURATION}ms;
  transition-timing-function: ease-in-out;

  &::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;
    width: ${WEDGE_WIDTH}px;
    height: 100%;
    background-color: transparent;
    border-top-right-radius: ${WEDGE_BORDER_RADIUS}px;
    border-bottom-right-radius: ${WEDGE_BORDER_RADIUS}px;
  }
`;

const activeWedgeColor: Record<Theme, string> = {
  [Theme.Light]: palette.black,
  [Theme.Dark]: palette.gray.light2,
};

export const getFocusStyles = ({ theme }: { theme: Theme }) => css`
  &:focus-visible,
  &[data-focus='true'] {
    color: ${color[theme].text.secondary.focus};
    background-color: ${color[theme].background.primary.focus};

    &::before {
      background-color: ${color[theme].icon.primary.focus};
    }
  }
`;

export const getHoverStyles = ({ theme }: { theme: Theme }) => css`
  &:hover,
  &[data-hover='true'] {
    background-color: ${color[theme].background.primary.hover};
  }
`;

export const getActiveStyles = ({ theme }: { theme: Theme }) => css`
  color: ${color[theme].text.primary.default};
  font-weight: ${fontWeights.semiBold};

  &::before {
    background-color: ${activeWedgeColor[theme]};
  }
`;

export const listStyles = css`
  padding: 0;
  margin: 0;
`;
