import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

export const stepIconClassName = createUniqueClassName('step');

const MARKER_SIZE = 20;

export const baseStyles = css`
  display: flex;
  gap: ${spacing[200]}px;
  margin-bottom: ${spacing[100]}px;
`;

export const contentStyles = css`
  width: 100%;
`;

export const markerStyles = css`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  width: ${MARKER_SIZE}px;
  height: ${MARKER_SIZE}px;
  position: relative;
  font-size: 12px;
  font-weight: 500;
`;

export const titleStyles = css`
  font-weight: bold;
  line-height: unset;
`;

export const getThemedStateStyles = (theme: Theme) => css`
  color: ${color[theme].text.primary.default};
  background-color: rgba(255, 255, 255, 0);
  border-color: ${color[theme].border.primary.default};
`;
