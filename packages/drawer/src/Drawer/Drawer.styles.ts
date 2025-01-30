import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, transitionDuration } from '@leafygreen-ui/tokens';

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

export const getHeaderStyles = (theme: Theme) => css`
  height: 48px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${color[theme].border.secondary.default};
`;
