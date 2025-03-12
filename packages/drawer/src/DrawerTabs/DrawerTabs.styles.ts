import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  tabContainerClassName,
  tabListElementClassName,
  tabPanelsElementClassName,
} from '@leafygreen-ui/tabs';
import { addOverflowShadow, color, Side, spacing } from '@leafygreen-ui/tokens';

import { TAB_CONTAINER_HEIGHT } from './DrawerTabs.constants';

const getBaseDrawerTabsStyles = (theme: Theme) => css`
  display: flex;
  flex-direction: column;
  height: 100%;

  .${tabContainerClassName} {
    height: ${TAB_CONTAINER_HEIGHT}px;
    padding-right: ${spacing[400]}px;
  }

  .${tabListElementClassName} {
    background-color: ${color[theme].background.primary.default};
    padding-left: ${spacing[200]}px;
    position: absolute;
  }

  .${tabPanelsElementClassName} {
    height: 100%;
    padding: ${spacing[400]}px;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
`;

const getTabListShadowTopStyles = ({ theme }: { theme: Theme }) => css`
  .${tabContainerClassName} {
    ${addOverflowShadow({
      isInside: false,
      side: Side.Bottom,
      theme,
    })}
    z-index: 0;
  }
`;

export const getDrawerTabsStyles = ({
  className,
  hasShadowTop,
  theme,
}: {
  className?: string;
  hasShadowTop: boolean;
  theme: Theme;
}) =>
  cx(
    getBaseDrawerTabsStyles(theme),
    {
      [getTabListShadowTopStyles({ theme })]: hasShadowTop,
    },
    className,
  );
