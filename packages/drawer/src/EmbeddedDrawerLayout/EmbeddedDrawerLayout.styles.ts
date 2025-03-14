import { css, cx } from '@leafygreen-ui/emotion';

import { MOBILE_BREAKPOINT, PANEL_WIDTH } from '../Drawer';

const baseStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: auto 0;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: auto 0;
  }
`;

const drawerOpenStyles = css`
  grid-template-columns: auto ${PANEL_WIDTH}px;

  @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: 50% 50%;
  }
`;

export const getEmbeddedDrawerLayoutStyles = ({
  className,
  isDrawerOpen,
}: {
  className?: string;
  isDrawerOpen: boolean;
}) =>
  cx(
    baseStyles,
    {
      [drawerOpenStyles]: isDrawerOpen,
    },
    className,
  );
