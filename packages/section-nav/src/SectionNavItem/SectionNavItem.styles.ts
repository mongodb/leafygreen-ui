import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, fontWeights, spacing, typeScales } from '@leafygreen-ui/tokens';

// const WEDGE_COLOR =

export const getLinkStyles = ({
  depth = 1,
  active = false,
  theme = Theme.Light,
}: {
  depth?: number;
  active?: boolean;
  theme?: Theme;
}) =>
  cx(
    css`
      ${getBaseStyles({ depth, theme })};
      ${getFocusStyles({ theme })};
      ${getHoverStyles({ theme })}
    `,
    {
      [getActiveStyles({ active, theme })]: active,
    },
  );

export const getItemStyles = ({ theme = Theme.Light }: { theme: Theme }) => css`
  list-style: none;
  /* border-left: 1px solid ${color[theme].border.secondary.default}; */
`;

export const getBaseStyles = ({
  depth,
  theme,
}: {
  depth: number;
  theme: Theme;
}) => css`
  all: unset;
  cursor: pointer;
  display: block;
  color: ${color[theme].text.secondary.default};
  padding-inline: ${depth * spacing[400]}px ${spacing[400]}px;
  padding-block: ${spacing[150]}px;
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
  border-left: 1px solid ${color[theme].border.secondary.default};
  min-width: 160px; // TODO: filler
`;

export const getFocusStyles = ({ theme }: { theme: Theme }) => css`
  &:focus-visible {
    color: ${color[theme].text.secondary.focus};
    font-weight: ${fontWeights.bold};
    background-color: ${color[theme].background.primary.focus};
  }
`;

export const getHoverStyles = ({ theme }: { theme: Theme }) => css`
  &:hover {
    background-color: ${color[theme].background.primary.hover};
  }
`;

export const getActiveStyles = ({
  active,
  theme,
}: {
  active: boolean;
  theme: Theme;
}) => css`
  color: ${color[theme].text.primary.default};
  font-weight: ${fontWeights.bold};
`;
