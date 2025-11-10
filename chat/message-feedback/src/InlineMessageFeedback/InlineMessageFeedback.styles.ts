import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

/** match height of the close IconButton which may not render */
const HEADER_CONTAINER_HEIGHT = 28;

export const getFormContainerStyles = (theme: Theme) => css`
  width: 100%;
  border: 1px solid
    ${color[theme].border[Variant.Primary][InteractionState.Default]};
  border-radius: ${borderRadius[200]}px;
  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px ${spacing[300]}px;
`;

// Alternate padding used to align close IconButton with submit Button
export const headerContainerStyles = css`
  height: ${HEADER_CONTAINER_HEIGHT}px;
  padding: ${spacing[200]}px ${spacing[200]}px 0 ${spacing[400]}px;
  display: flex;
  align-items: center;
`;

export const labelStyles = css`
  flex: 1;
`;

export const bodyContainerStyles = css`
  padding: 0 ${spacing[400]}px ${spacing[400]}px;
  display: flex;
  gap: ${spacing[300]}px;
`;

const baseTextAreaStyles = css`
  width: 100%;
`;

export const getTextAreaStyles = (className?: string) =>
  cx(baseTextAreaStyles, className);

export const actionContainerStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
  justify-content: flex-end;
  align-items: flex-end;
`;
