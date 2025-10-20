import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';

export const containerStyles = css`
  max-width: 1184px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing[1600]}px ${spacing[800]}px;
  gap: ${spacing[600]}px;
`;

export const textContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[300]}px;
  text-align: center;
`;

export const getTextStyles = (theme: Theme) => ({
  subtitle: css`
    color: ${palette.green[theme === Theme.Light ? 'dark2' : 'base']};
  `,
  title: css`
    color: ${color[theme].text.primary.default};
  `,
  description: css`
    color: ${color[theme].text.secondary.default};
  `,
});

export const buttonsContainerStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${spacing[200]}px;
`;
