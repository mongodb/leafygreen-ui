import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const calendarsFrameStyles = css`
  display: grid;
  grid-auto-flow: column;
  gap: ${spacing[4] * 2}px;
  padding: ${spacing[2] + spacing[1]}px;
`;
