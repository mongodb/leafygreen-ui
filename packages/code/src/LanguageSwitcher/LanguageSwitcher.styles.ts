import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const containerStyle = css`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const menuButtonStyle = css`
  // Override default menuButton styles
  margin-top: 0;
  width: 100%;
  height: 100%;
  border-radius: 0px;
  border: 0;
  font-size: 12px;

  &:hover[aria-disabled='false'],
  &:focus,
  &:active {
    box-shadow: 0 0 0 0;
    border: 0;
  }

  // Override button defaults
  > *:last-child {
    grid-template-columns: 16px 1fr 16px;
    padding: 0 12px;
    > svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const buttonModeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    border-right: 1px solid ${palette.gray.light2};
    box-shadow: 0 0 0 0;

    &:hover[aria-disabled='false'],
    &:active,
    &:focus {
      border-right: 1px solid ${palette.gray.light2};
    }

    &:hover[aria-disabled='false'] {
      background-color: ${palette.gray.light2};
    }

    &:focus-visible {
      background-color: ${palette.blue.light2};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
    border-right: 1px solid ${palette.gray.dark1};
    color: ${palette.gray.light2};

    &:hover[aria-disabled='false'],
    &:focus,
    &:active {
      border-right: 1px solid ${palette.gray.dark1};
    }

    &:hover[aria-disabled='false'],
    &:active {
      background-color: ${palette.gray.dark1};
    }

    &:focus-visible {
      background-color: ${palette.blue.light1};
    }
  `,
};

export const selectStyle = css`
  min-width: 144px;
  height: 100%;
`;

export const iconMargin = css`
  margin-right: ${spacing[3]}px;
`;
