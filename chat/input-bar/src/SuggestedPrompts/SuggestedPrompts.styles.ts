import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const themeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    & + & {
      border-top: 1px solid ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    & + & {
      border-top: 1px solid ${palette.gray.dark2};
    }
  `,
};

export const suggestedPromptsLabelWrapperStyle = css`
  padding-bottom: 0;
`;

export const suggestedPromptsLabelStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};
