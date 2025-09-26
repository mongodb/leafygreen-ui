import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const BADGE_HEIGHT = spacing[600];
const BADGE_WIDTH = spacing[900];

export const promotionContainerStyles = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0px ${spacing[200]}px;
`;

export const badgeStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  width: ${BADGE_WIDTH}px;
  height: ${BADGE_HEIGHT}px;
`;
