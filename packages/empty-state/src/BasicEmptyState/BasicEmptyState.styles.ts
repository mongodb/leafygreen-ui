import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const rootStyles = css`
  padding: 40px;
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const textContainerStyles = css`
  max-width: 432px;
`;

export const titleStyles = css`
  margin-bottom: 12px;
`;

export const descriptionStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light3};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
};

export const buttonContainerStyles = css`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

export const externalLinkStyles = css`
  margin-top: 16px;
`;
