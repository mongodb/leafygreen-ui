import { css } from '@leafygreen-ui/emotion';

import { anchorClassName } from '../shared.styles';

export const arrowRightIconPersist = css`
  transform: translate3d(3px, 0, 0);
  top: 1px;
  position: relative;
`;

export const arrowRightIconHover = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0);
  transition: 100ms ease-in;
  transition-property: opacity, transform;
  top: 1px;
  position: relative;

  .${anchorClassName}:hover &, .${anchorClassName}[data-hover='true'] & {
    opacity: 1;
    transform: translate3d(3px, 0, 0);
  }
`;

export const openInNewTabStyles = css`
  position: relative;
  bottom: 2px;
  left: -1px;
  height: 12px;
`;
