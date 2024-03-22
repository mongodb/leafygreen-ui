import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing, typeScales } from '@leafygreen-ui/tokens';

export const contentClassName = createUniqueClassName('suggested-prompt');

export const suggestedPromptStyles = css`
  display: block;
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${spacing[3]}px;
  padding: 12px 24px;
`;

export const suggestedPromptThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    & .${contentClassName} {
      color: ${palette.black};
    }
  `,
  [Theme.Dark]: css`
    & .${contentClassName} {
      color: ${palette.gray.light2};
    }
  `,
};

export const suggestedPromptDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    & .${contentClassName} {
      color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    & .${contentClassName} {
      color: ${palette.gray.dark1};
    }
  `,
};
