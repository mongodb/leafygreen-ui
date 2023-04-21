import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const titleBaseStyles = css`
  overflow-wrap: anywhere;
`;

export const descriptionBaseStyles = css`
  max-height: ${spacing[3] * 3}px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const contentWrapper = css`
  display: grid;
  grid-template-columns: ${spacing[3]}px 1fr;
  gap: ${spacing[2]}px;
  align-items: center;
  width: 100%;
`;

export const textWrapper = css`
  grid-column: 2;
`;

export const glyphContainer = css`
  display: flex;
  height: 20px;
  align-items: center;
`;

export const glyphRightStyles = css`
  width: ${spacing[3]}px;
  grid-column: 3;
  grid-row: 1;
`;
