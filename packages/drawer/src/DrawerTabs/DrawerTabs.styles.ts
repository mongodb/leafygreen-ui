import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  tabListElementClassName,
  tabPanelsElementClassName,
} from '@leafygreen-ui/tabs';
import { spacing } from '@leafygreen-ui/tokens';

import { getShadowTopStyles, scrollContainerStyles } from '../Drawer';

import { TAB_LIST_HEIGHT } from './DrawerTabs.constants';

const baseDrawerTabsStyles = css`
  height: 100%;

  .${tabListElementClassName} {
    height: ${TAB_LIST_HEIGHT}px;
    padding: 0 ${spacing[400]}px 0 ${spacing[200]}px;
  }

  .${tabPanelsElementClassName} {
    height: calc(100% - ${TAB_LIST_HEIGHT}px);
    ${scrollContainerStyles}
  }
`;

const getTabListShadowTopStyles = ({ theme }: { theme: Theme }) => css`
  .${tabListElementClassName} {
    ${getShadowTopStyles({ theme })}
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
    baseDrawerTabsStyles,
    {
      [getTabListShadowTopStyles({ theme })]: hasShadowTop,
    },
    className,
  );
