import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const TEXT_AREA_MIN_HEIGHT = 64;

export const textAreaContainerStyles = css`
  height: auto;
  display: flex;
  padding: 0;
`;

export const textAreaStyles = css`
  width: 100%;
  min-height: ${TEXT_AREA_MIN_HEIGHT}px;
  display: flex;
  resize: none;
  padding: ${spacing[200]}px ${spacing[300]}px;
`;
