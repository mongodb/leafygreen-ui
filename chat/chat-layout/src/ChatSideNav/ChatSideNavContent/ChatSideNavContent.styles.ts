import { css, cx } from '@leafygreen-ui/emotion';

const baseContentStyles = css`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const getContentStyles = ({ className }: { className?: string }) =>
  cx(baseContentStyles, className);
