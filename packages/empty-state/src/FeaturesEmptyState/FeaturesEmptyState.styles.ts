import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const rootStyles = css`
  max-width: 648px;
  text-align: center;
`;

export const featuresContainerStyles = css`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

export const featureContainerStyles = css`
  max-width: 200px;
`;

export const titleStyles = css`
  margin-bottom: 24px;
`;

export const graphicWrapperStyles = css`
  margin-bottom: 16px;
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
  margin-top: 24px;
`;

export const externalLinkStyles = css`
  margin-top: 24px;
`;
