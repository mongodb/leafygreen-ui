import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const inputOptionStyles = css`
  position: relative;
  list-style: none;
  cursor: pointer;

  padding: ${spacing[2]}px ${spacing[2] + spacing[1]}px;
`;

export const inputOptionThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};

    &:hover {
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.white};

    &:hover {
      background-color: ${palette.gray.dark4};
    }
  `,
};

const wedgeWidth = 4;
export const inputOptionWedge = css`

  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: ${wedgeWidth}px;
    height: calc(100% - 14px);
    background-color: rgba(255, 255, 255, 0);
    border-radius: 0 6px 6px 0;
    transform: scale3d(0, 0.3, 0);
    transition: 200ms ease-in-out;
    transition-property: transform, background-color;
  }
`;

export const inputOptionActiveStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.blue.light3};

    &:before {
      transform: scaleY(1);
      background-color: ${palette.blue.base};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.blue.dark3};

    &:before {
      transform: scaleY(1);
      background-color: ${palette.blue.light1};
    }
  `,
};

export const inputOptionDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.light1};

    &:hover {
      background-color: inherit;
    }

    &:before {
      content: unset;
    }
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark1};

    &:hover {
      background-color: inherit;
    }

    &:before {
      content: unset;
    }
  `,
};
