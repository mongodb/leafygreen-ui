import { css } from '@leafygreen-ui/emotion';

import { anchorClassName } from '../shared.styles';

const ICON_TOP_OFFSET = 1;
const NEW_TAB_ICON_LEFT_OFFSET = 2;

export const arrowRightIconPersist = css`
  transform: translate3d(3px, 0, 0);
  top: ${ICON_TOP_OFFSET}px;
  position: relative;
`;

export const arrowRightIconHover = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0);
  transition: 100ms ease-in;
  transition-property: opacity, transform;
  top: ${ICON_TOP_OFFSET}px;
  position: relative;

  .${anchorClassName}:hover &, .${anchorClassName}[data-hover='true'] & {
    opacity: 1;
    transform: translate3d(3px, 0, 0);
  }
`;

export const openInNewTabStyles = css`
  position: relative;
  top: ${ICON_TOP_OFFSET}px;
  left: ${NEW_TAB_ICON_LEFT_OFFSET}px;
`;
