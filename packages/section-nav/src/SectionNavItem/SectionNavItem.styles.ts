import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, fontWeights, spacing, typeScales } from '@leafygreen-ui/tokens';

import { WEDGE_BORDER_RADIUS, WEDGE_WIDTH } from './SectionNavItem.constants';

export const itemStyles = css`
  list-style: none;
  --current-depth: calc(var(--depth) + 1);
  --current-plus: var(--plus);
`;

export const getLinkStyles = ({
  level = 1,
  active = false,
  theme = Theme.Light,
  className,
}: {
  level?: number;
  active?: boolean;
  theme?: Theme;
  className?: string;
}) =>
  cx(
    css`
      ${getBaseStyles({ level, theme })};
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
  level,
  theme,
}: {
  level: number;
  theme: Theme;
}) => css`
  all: unset;
  cursor: pointer;
  display: block;
  color: ${color[theme].text.secondary.default};
  padding-block: ${spacing[150]}px;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  position: relative;

  /* padding-inline: calc(
      ${spacing[400]}px * var(--current-depth)
    )
    ${spacing[400]}px; */

  padding-inline: calc(
      (${spacing[400]} * var(--current-depth) + var(--current-plus)) * 1px
    )
    ${spacing[400]}px;

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
  font-weight: ${fontWeights.bold};

  &::before {
    background-color: ${activeWedgeColor[theme]};
  }
`;

export const listSyles = css`
  padding: 0;
  margin: 0;
  --depth: var(--current-depth);
  --plus: calc(var(--current-plus) + 6);
`;
