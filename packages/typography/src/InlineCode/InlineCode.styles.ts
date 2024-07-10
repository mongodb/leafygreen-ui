import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, focusRing, fontFamilies } from '@leafygreen-ui/tokens';

export const anchorClassName = createUniqueClassName();

export const code = css`
  display: inline;
  transition: all 0.15s ease-in-out;
  border-radius: 3px;
  font-family: ${fontFamilies.code};
  line-height: 20px;

  .${anchorClassName}:hover > & {
    text-decoration: none;
  }
`;

export const codeModes: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${color.light.background.secondary.default};
    border: 1px solid ${color.light.border.secondary.default};
    color: ${palette.gray.dark3};

    .${anchorClassName}:hover > & {
      box-shadow: 0 0 0 3px ${palette.gray.light2};
      border: 1px solid ${palette.gray.light1};
    }
  `,

  [Theme.Dark]: css`
    background-color: ${color.dark.background.secondary.default};
    border: 1px solid ${palette.gray.dark2};
    color: ${palette.gray.light1};

    .${anchorClassName}:hover > & {
      box-shadow: 0 0 0 3px ${palette.gray.dark2};
      border: 1px solid ${palette.gray.dark1};
    }
  `,
};

export const codeFocusModes: Record<Theme, string> = {
  [Theme.Light]: css`
    .${anchorClassName}:focus-visible > & {
      box-shadow: ${focusRing[Theme.Light].default};
      border: 1px solid ${palette.blue.base};
    }
  `,

  [Theme.Dark]: css`
    .${anchorClassName}:focus-visible > & {
      box-shadow: ${focusRing[Theme.Dark].default};
      border: 1px solid ${palette.blue.base};
    }
  `,
};

export const codeLinkStyleModes: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light1};
  `,
};

export const codeLinkWrapper = css`
  text-decoration: none;
  margin: 0;
  padding: 0;
  line-height: 20px;

  &:focus {
    outline: none;
  }
`;

export const nowrap = css`
  white-space: nowrap;
`;

export const normal = css`
  white-space: normal;
`;
