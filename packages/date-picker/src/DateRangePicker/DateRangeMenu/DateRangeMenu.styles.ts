import { css } from '@leafygreen-ui/emotion';

export const rangeMenuWrapperStyles = css`
  padding: 0; // needs to be set by inner content
  z-index: 1;
`;

export const menuContentStyles = css`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: max-content auto;
  z-index: 1;
`;
