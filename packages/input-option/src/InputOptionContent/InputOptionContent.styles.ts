import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const titleBaseStyles = css`
  overflow-wrap: anywhere;
`;

export const descriptionBaseStyles = css`
  max-height: ${spacing[3] * 3}px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const descriptionThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

export const contentWrapper = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: ${spacing[2]}px;
`;

export const leftContentWrapper = css`
  display: grid;
  grid-template-columns: 16px 1fr;
  gap: ${spacing[2]}px;
  align-items: center;
  width: 100%;

  label {
    align-items: center;
  }
`;

export const leftTextWrapper = css`
  grid-column: 2;
`;

export const glyphContainer = css`
  display: flex;
  // align-items: center;
  // justify-content: center;
`;
