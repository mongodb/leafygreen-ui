import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

// react-lottie-player does not accept className
export const blobStyles = {
  width: '72px',
  height: '72px',
  marginBottom: `${spacing[3]}px`,
};

export const rootStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
