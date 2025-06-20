import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, fontWeights, spacing, typeScales } from '@leafygreen-ui/tokens';

export const getItemStyles = ({ theme = Theme.Light }: { theme: Theme }) => css`
  list-style: none;
  /* border-left: 1px solid ${color[theme].border.secondary.default}; */
`;

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
      ${getHoverStyles({ theme })}
    `,
    {
      [getActiveStyles({ theme })]: active,
    },
    css`
      ${getFocusStyles({ theme })};
    `,
  );

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
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;
    width: 2px; // TODO: const
    height: 100%;
    background-color: transparent;
    border-top-right-radius: 100px;
    border-bottom-right-radius: 100px;
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
