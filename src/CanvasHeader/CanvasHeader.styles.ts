import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

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
  gap: 24px;
  justify-content: space-between;
`;

export const titleBaseStyles = css`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const titleThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
};

export const backLinkStyles = css`
  display: flex;
`;

export const actionsStyles = css`
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: ${spacing[200]}px;
`;
