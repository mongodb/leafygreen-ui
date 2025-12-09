import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const reviewCardStyles = css`
  & h6 {
    display: block;
  }
`;

export const expandableCardContentStyles = css`
  padding: unset;
`;

export const cardContentWrapperStyles = css`
  padding-bottom: ${spacing[400]}px;
  overflow: hidden;
`;
