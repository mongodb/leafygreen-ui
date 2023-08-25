import { css, keyframes } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

export const loadingOptionStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[2]}px;
  padding-block: ${spacing[1]}px;
`;

const loadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  } 
  to {
    transform: rotate(360deg);
  }
`;

export const loadingOptionIcon = css`
  height: 16px;
  width: 16px;
  animation: ${loadingSpinner} 1.5s linear infinite;
`;
