import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { PANEL_WIDTH } from './Drawer.constants';

const getBaseStyles = ({ open, theme }: { open: boolean; theme: Theme }) => css`
  height: 100%;
  width: ${PANEL_WIDTH}px;
  position: fixed;
  top: 0;
  right: 0;
  background-color: ${color[theme].background.primary.default};
  border: 1px solid ${color[theme].border.secondary.default};
  transition: transform ${transitionDuration.slower}ms ease-in-out;
  box-shadow: ${open && theme === Theme.Light
    ? `-10px 0 10px -10px rgba(0,0,0,0.3)`
    : 'initial'};
`;

const drawerOpenStyles = css`
  transform: translateX(0);
`;

const drawerClosedStyles = css`
  transform: translateX(100%);
`;

export const getDrawerStyles = ({
  className,
  open,
  theme,
}: {
  className?: string;
  open: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseStyles({ open, theme }),
    {
      [drawerOpenStyles]: open,
      [drawerClosedStyles]: !open,
    },
    className,
  );

const getBaseHeaderStyles = ({
  hasTabs,
  theme,
}: {
  hasTabs: boolean;
  theme: Theme;
}) => css`
  height: 48px;
  padding: ${spacing[400]}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${hasTabs
    ? 'none'
    : `1px solid ${color[theme].border.secondary.default}`};
  transition: box-shadow ${transitionDuration.faster}ms ease-in-out;
`;

export const getShadowTopStyles = ({ theme }: { theme: Theme }) => css`
  box-shadow: ${theme === Theme.Light
    ? `0px 10px 20px -10px ${transparentize(0.8, palette.black)}`
    : '0px 6px 30px -10px rgba(0, 0, 0, 0.5)'};
`;

export const getHeaderStyles = ({
  hasShadowTop,
  hasTabs,
  theme,
}: {
  hasShadowTop: boolean;
  hasTabs: boolean;
  theme: Theme;
}) =>
  cx(getBaseHeaderStyles({ hasTabs, theme }), {
    [getShadowTopStyles({ theme })]: hasShadowTop && !hasTabs,
  });

const baseChildrenContainerStyles = css`
  height: 100%;
`;

export const scrollContainerStyles = css`
  height: 100%;
  padding: ${spacing[400]}px;
  overflow-y: auto;
  overscroll-behavior: contain;
`;

export const getChildrenContainerStyles = ({ hasTabs }: { hasTabs: boolean }) =>
  cx(baseChildrenContainerStyles, { [scrollContainerStyles]: !hasTabs });
