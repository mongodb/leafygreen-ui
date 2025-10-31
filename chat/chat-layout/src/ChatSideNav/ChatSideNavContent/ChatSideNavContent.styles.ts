import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

const CONTENT_HEADER_HEIGHT = 48;

const baseContentStyles = css`
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

export const getContentStyles = ({ className }: { className?: string }) =>
  cx(baseContentStyles, className);

export const contentHeaderStyles = css`
  height: ${CONTENT_HEADER_HEIGHT}px;
  padding: 0 ${spacing[400]}px;
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
`;

export const getIconFill = (theme: Theme) =>
  color[theme].icon[Variant.Primary][InteractionState.Default];
