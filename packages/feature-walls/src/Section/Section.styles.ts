import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const CONTAINER_MAX_WIDTH = 1040;

export const cardStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  width: 100%;
  padding: ${spacing[800]}px;
`;

const baseSectionStyles = css`
  max-width: ${CONTAINER_MAX_WIDTH}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[400]}px;
`;

export const getSectionStyles = (className?: string) =>
  cx(baseSectionStyles, className);
