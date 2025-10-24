import { css, cx } from '@leafygreen-ui/emotion';
import { transitionDuration } from '@leafygreen-ui/tokens';

import {
  gridAreas,
  SIDE_NAV_WIDTH_COLLAPSED,
  SIDE_NAV_WIDTH_PINNED,
} from '../constants';

const getBaseContainerStyles = (isPinned: boolean) => css`
  display: grid;
  grid-template-areas: '${gridAreas.sideNav} ${gridAreas.main}';
  grid-template-columns: ${isPinned
      ? `${SIDE_NAV_WIDTH_PINNED}px`
      : `${SIDE_NAV_WIDTH_COLLAPSED}px`} 1fr;
  height: 100%;
  width: 100%;
  transition: grid-template-columns ${transitionDuration.default}ms ease-in-out;
`;

export const getContainerStyles = ({
  className,
  isPinned,
}: {
  className?: string;
  isPinned: boolean;
}) => cx(getBaseContainerStyles(isPinned), className);
