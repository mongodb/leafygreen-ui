import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

export const canvasHeaderClassname = createUniqueClassName('canvas-header');

export const canvasHeaderBaseStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing[100]}px;
  margin-block: ${spacing[400]}px;
`;

export const titleWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[300]}px;
`;

export const getTitleStyles = (theme: Theme) => css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${color[theme].text.primary?.default};
`;

export const backLinkStyles = css`
  display: flex;
`;

export const actionsStyles = css`
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: ${spacing[200]}px;
  justify-content: end;
  flex-grow: 1;
  padding-inline-start: ${spacing[300]}px;

  button {
    white-space: nowrap;
  }
`;

export const badgesStyles = css`
  display: flex;
  flex-wrap: nowrap;
  gap: ${spacing[200]}px;
  flex-shrink: 0;

  position: relative;
  // Badges are not vertically aligned with the title
  top: 3px;
`;
