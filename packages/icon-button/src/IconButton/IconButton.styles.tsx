import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing, transitionDuration } from '@leafygreen-ui/tokens';

import { Size } from './IconButton.types';

export const removeButtonStyle = css`
  border: none;
  -webkit-appearance: unset;
  padding: unset;
`;

export const baseIconButtonStyle = css`
  display: inline-block;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: color, box-shadow;

  // Set background to fully-transparent white for cross-browser compatability with Safari
  //
  // Safari treats "transparent" values in CSS as transparent black instead of white
  // which can make things render differently across browsers if not defined explicitly.
  background-color: rgba(255, 255, 255, 0);

  &::before {
    content: '';
    transition: ${transitionDuration.default}ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 100%;
    transform: scale(0.8);
  }

  &:active:before,
  &:hover:before,
  &:focus:before,
  &[data-hover='true']:before,
  &[data-focus='true']:before {
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }
`;

export const iconButtonSizes = {
  [Size.Default]: css`
    height: 28px;
    width: 28px;
  `,
  [Size.Large]: css`
    height: 36px;
    width: 36px;
  `,
  [Size.XLarge]: css`
    height: 42px;
    width: 42px;
  `,
} as const;

export const iconButtonMode: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};

    &:active,
    &:hover,
    &[data-hover='true'] {
      color: ${palette.black};

      &::before {
        background-color: ${transparentize(0.9, palette.gray.dark2)};
      }
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};

    &:active,
    &:hover,
    &[data-hover='true'] {
      color: ${palette.gray.light3};

      &::before {
        background-color: ${transparentize(0.9, palette.gray.light2)};
      }
    }
  `,
};

export const focusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-visible,
    &[data-focus='true'] {
      color: ${palette.black};
      box-shadow: ${focusRing[Theme.Light].default};

      &::before {
        background-color: ${transparentize(0.9, palette.gray.dark2)};
      }
    }
  `,
  [Theme.Dark]: css`
    &:focus-visible,
    &[data-focus='true'] {
      color: ${palette.gray.light3};
      box-shadow: ${focusRing[Theme.Dark].default};

      &::before {
        background-color: ${transparentize(0.9, palette.gray.light2)};
      }
    }
  `,
} as const;

export const disabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.light1};
    background-color: rgba(255, 255, 255, 0);

    &:active,
    &:hover,
    &[data-hover='true'] {
      color: ${palette.gray.light1};

      &::before {
        background-color: rgba(255, 255, 255, 0);
      }
    }

    &:focus,
    &[data-focus='true'] {
      color: ${palette.gray.light1};

      &::before {
        background-color: rgba(255, 255, 255, 0);
      }
    }
  `,

  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark1};
    background-color: rgba(255, 255, 255, 0);

    &:active,
    &:hover,
    &[data-hover='true'] {
      color: ${palette.gray.dark1};

      &::before {
        background-color: rgba(255, 255, 255, 0);
      }
    }

    &:focus,
    &[data-focus='true'] {
      color: ${palette.gray.dark1};

      &::before {
        background-color: rgba(255, 255, 255, 0);
      }
    }
  `,
} as const;

export const activeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};

    &::before {
      background-color: ${transparentize(0.9, palette.gray.dark2)};
      transform: scale(1);
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light3};

    &::before {
      background-color: ${transparentize(0.9, palette.gray.light2)};
      transform: scale(1);
    }
  `,
} as const;

export const iconStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
