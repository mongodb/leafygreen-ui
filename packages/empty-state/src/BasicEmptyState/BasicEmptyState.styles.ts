import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

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

export const getBadgeStyles = (className?: string) =>
  cx(
    css`
      margin-bottom: ${spacing[300]}px;
    `,
    className,
  );

export const titleStyles = css`
  margin-bottom: ${spacing[300]}px;
`;

export const getDescriptionStyles = (theme: Theme) => css`
  color: ${color[theme].text.secondary.default};
`;

export const buttonContainerStyles = css`
  display: flex;
  gap: ${spacing[300]}px;
  margin-top: ${spacing[600]}px;
`;

export const externalLinkStyles = css`
  margin-top: ${spacing[300]}px;
`;
