import { css, cx } from '@leafygreen-ui/emotion';

import {
  COLLAPSED_SIDE_NAV_WIDTH_WITH_BORDER,
  gridAreas,
  PINNED_SIDE_NAV_WIDTH_WITH_BORDER,
  SIDE_NAV_TRANSITION_DURATION,
} from '../constants';

const baseContainerStyles = css`
  overflow: hidden;
  height: 100%;
  width: 100%;
  max-height: 100vh;
  max-width: 100vw;
  display: grid;
  grid-template-areas: '${gridAreas.sideNav} ${gridAreas.main}';
  grid-template-columns: ${PINNED_SIDE_NAV_WIDTH_WITH_BORDER}px auto;
  transition: grid-template-columns ${SIDE_NAV_TRANSITION_DURATION}ms
    ease-in-out;
`;

const collapsedContainerStyles = css`
  grid-template-columns: ${COLLAPSED_SIDE_NAV_WIDTH_WITH_BORDER}px auto;
`;

export const getContainerStyles = ({
  className,
  isPinned,
}: {
  className?: string;
  isPinned: boolean;
}) =>
  cx(
    baseContainerStyles,
    {
      [collapsedContainerStyles]: !isPinned,
    },
    className,
  );
