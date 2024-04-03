import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const verifiedAnswerBannerStyles = css`
  // Negative top margin to reclaim some of the default padding in MessageContainer
  margin-top: -${spacing[200]}px;
  margin-bottom: ${spacing[400]}px;
`;
