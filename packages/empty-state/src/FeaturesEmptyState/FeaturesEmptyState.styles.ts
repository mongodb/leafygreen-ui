import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const rootStyles = css`
  max-width: 648px;
  text-align: center;
`;

export const featuresContainerStyles = css`
  display: flex;
  gap: ${spacing[4]}px;
  justify-content: center;
`;

export const featureContainerStyles = css`
  width: 200px;
  max-width: 200px;
`;

export const titleStyles = css`
  margin-bottom: ${spacing[4]}px;
`;

export const graphicWrapperStyles = css`
  margin-bottom: ${spacing[3]}px;
`;

export const featureDescriptionStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
};

export const buttonContainerStyles = css`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: ${spacing[4]}px;
`;

export const externalLinkStyles = css`
  margin-top: ${spacing[4]}px;
`;
