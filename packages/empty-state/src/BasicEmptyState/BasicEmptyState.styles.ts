import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const rootStyles = css`
  padding: 40px;
  display: flex;
  gap: ${spacing[3]}px;
  align-items: center;
  justify-content: center;
`;

export const textContainerStyles = css`
  max-width: 432px;
`;

export const titleStyles = css`
  margin-bottom: 12px;
`;

export const descriptionStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
};

export const buttonContainerStyles = css`
  display: flex;
  gap: 12px;
  margin-top: ${spacing[4]}px;
`;

export const externalLinkStyles = css`
  margin-top: ${spacing[3]}px;
`;
