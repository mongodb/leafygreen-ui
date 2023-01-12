import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing, hoverRing } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  border-top: 1px solid transparent;

  // emulating a border bottom on the last nested row
  &:not([data-depth='0']) + tr[data-depth='0'] {
    border-top: 1px solid ${palette.gray.light2};
  }
`;

export const nestedBorderTopStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-top: 1px solid ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    border-top: 1px solid ${palette.gray.light2};
  `,
};

export const nestedBgStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};

export const zebraStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    &:nth-of-type(even) {
      background-color: ${palette.gray.dark4};
    }
  `,
  [Theme.Light]: css`
    &:nth-of-type(even) {
      background-color: ${palette.gray.light3};
    }
  `,
};

export const expandedContentStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};

export const clickableStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-radius: 6px;
    cursor: pointer;
    &:hover:not(:focus) {
      box-shadow: inset ${hoverRing[Theme.Dark].gray};
    }

    &:focus {
      box-shadow: inset ${focusRing[Theme.Dark].input}; 
    }
  `,
  [Theme.Light]: css`
    border-radius: 6px;
    cursor: pointer;
    &:hover:not(:focus) {
      box-shadow: inset ${hoverRing[Theme.Light].gray};
    }

    &:focus {
      box-shadow: inset ${focusRing[Theme.Light].input};  
    }
  `,
}

export const disabledStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    pointer-events: none;
    background-color: ${palette.gray.dark2};
    color: ${palette.gray.base};
  `,
  [Theme.Light]: css`
    pointer-events: none;
    background-color: ${palette.gray.light2};
    color: ${palette.gray.base};
  `,
};
