import { css, cx } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

const baseContainerStyles = css`
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const getContainerStyles = ({ className }: { className?: string }) =>
  cx(baseContainerStyles, className);

export const hiddenSpacerStyles = css`
  flex: 1;
`;

export const inputBarWrapperStyles = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 ${spacing[400]}px ${spacing[400]}px;
`;
