import { css, cx } from '@leafygreen-ui/emotion';

import { MOBILE_BREAKPOINT, PANEL_WIDTH } from '../Drawer';

const baseStyles = css`
  /* @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: auto 0;
  } */
  width: 100%;
  position: relative;
  height: inherit;
`;

const drawerOpenStyles = css`
  /* grid-template-columns: auto ${PANEL_WIDTH}px; */

  /* @media only screen and (max-width: ${MOBILE_BREAKPOINT}px) {
    grid-template-columns: unset;
    grid-template-rows: 50% 50%;
  } */
  /* grid-template-columns: auto ${PANEL_WIDTH}px; */
`;

const withoutToolbarDrawerBaseStyles = css`
  display: grid;
  grid-template-columns: auto 0px;
  /* grid-template-areas: 'main drawer'; */
`;

const baseHasToolbarWrapperStyles = css`
  display: grid;
  grid-template-columns: auto 48px;
  grid-template-areas: 'main drawer';
`;

export const getOverlayDrawerLayoutStyles = ({
  className,
  isDrawerOpen,
  hasToolbar = false,
}: {
  className?: string;
  isDrawerOpen: boolean;
  hasToolbar?: boolean;
}) =>
  cx(
    baseStyles,
    {
      [baseHasToolbarWrapperStyles]: hasToolbar,
      [withoutToolbarDrawerBaseStyles]: !hasToolbar,
      [drawerOpenStyles]: isDrawerOpen && !hasToolbar,
    },
    className,
  );

// When hasToolbar is true, we need to shift the layout by 48px;
// When hasToolbar is true and isDrawerOpen is true and the displayMode is embedded, we need to shift the layout by 48px + 432px;
// When hasToolbar is true and isDrawerOpen is true and the displayMode is overlay, the layout remains the same;
