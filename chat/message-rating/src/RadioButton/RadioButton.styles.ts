import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing, hoverRing } from '@leafygreen-ui/tokens';

export const checkedStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border-color: ${palette.white};
    background: ${palette.gray.light2};
    &:hover {
      border-color: ${palette.white};
      background: ${palette.gray.light2};
      box-shadow: none;
    }
  `,
  [Theme.Light]: css`
    background: ${palette.black};
    &:hover {
      background: ${palette.black}; // override default hover
      box-shadow: none;
    }
    &:focus-visible {
      box-shadow: none;
    }
  `,
};

export const baseStyles = css`
  overflow: hidden; // for ripple
  display: flex;
  height: 28px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  align-self: stretch;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border: 1px solid;
`;

export const baseThemedStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    border: 1px solid ${palette.gray.dark1};
    background: ${palette.gray.dark2};
    &:hover {
      box-shadow: ${hoverRing.dark.gray};
      background: ${palette.gray.dark1};
    }
    &:focus-visible {
      box-shadow: ${focusRing.dark.default};
      background: ${palette.gray.dark1};
    }
  `,
  [Theme.Light]: css`
    border: 1px solid ${palette.gray.dark1};
    background: ${palette.gray.light3};
    &:hover {
      box-shadow: ${hoverRing.light.gray};
    }
    &:focus-visible {
      box-shadow: ${focusRing.light.default};
    }
  `,
};

export const labelStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  height: 100%;
  cursor: pointer;
`;

export const rippleStyles = css`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
`;
