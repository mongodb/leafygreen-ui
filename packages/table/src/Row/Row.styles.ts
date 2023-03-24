import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  hoverRing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

export const rowBaseStyles = css`
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: all;
  border: 0px solid rgba(255, 255, 255, 0); // transparent
`;

export const expandedContentParentStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
    tr:last-child {
      border-bottom: 1px solid ${palette.gray.dark2};
    }
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
    tr:last-child {
      border-bottom: 1px solid ${palette.gray.light2};
    }
  `,
};

/** Styles for top-level, un-nested rows */
export const rowTopLevelStyles = css`
  // We add an invisible border to the top of every row
  border-top-width: 1px;
  margin-top: -1px;
`;

/** Styles for expanded top-level, un-nested rows */
export const rowTopLevelExpandedStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-color: ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    border-color: ${palette.gray.light2};
  `,
};

// applied directly to rows for VS
export const selectableRowStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.blue.light3};
  `,
};

// applied directly to rows for VS
export const grayZebraRowStyles: Record<Theme, string> = {
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
      ${grayZebraRowStyles[Theme.Dark]}
    }
  `,
  [Theme.Light]: css`
    &:nth-of-type(even) {
      ${grayZebraRowStyles[Theme.Light]}
    }
  `,
};

export const clickableStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-radius: 6px;
    cursor: pointer;
    &:hover:not(:focus) {
      outline: none;
      box-shadow: inset ${hoverRing[Theme.Dark].gray};
    }

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: inset ${focusRing[Theme.Dark].input};
    }
  `,
  [Theme.Light]: css`
    border-radius: 6px;
    cursor: pointer;
    &:hover:not(:focus) {
      outline: none;
      box-shadow: inset ${hoverRing[Theme.Light].gray};
    }

    &:focus,
    &:focus-visible {
      outline: none;
      box-shadow: inset ${focusRing[Theme.Light].input};
    }
  `,
};

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
