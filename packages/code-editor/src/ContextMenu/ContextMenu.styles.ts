import { css } from '@leafygreen-ui/emotion';

export const containerStyles = css`
  display: contents;
`;

export const getMenuContainerStyles = (position: {
  x: number;
  y: number;
}) => css`
  position: absolute;
  /* z-index: 50; */
  top: ${position.y}px;
  left: ${position.x}px;
`;
