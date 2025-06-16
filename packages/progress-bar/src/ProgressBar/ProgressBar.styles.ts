import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[100]}px;
  min-width: 600px;
`;

export const headerStyles = css`
  display: flex;
  justify-content: space-between;
`;

export const headerValueStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[100]}px;
`;

export const progressBarTrackStyles = css`
  width: 100%;
  height: 8px; // temporary
  border-radius: 4px; // temporary
  background-color: rgba(0, 0, 0, 0.1); // temporary
`;

export const progressBarFillStyles = css`
  height: 100%;
  width: 80%; // temporary
  border-radius: 4px; // temporary
  background-color: rgba(0, 0, 0, 0.5); // temporary
`;
