import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, focusRing, hoverRing } from '@leafygreen-ui/tokens';
import { Size } from './types';

export const inputDisplay = createUniqueClassName('radio-group');
export const inputDisplayWrapper = createUniqueClassName('radio-group');
export const inputDataProp = createUniqueClassName('radio-group');

export const containerMargin = css`
  & + & {
    margin-top: 8px;
  }
`;

export const offsets: Record<Size, string> = {
  [Size.XSmall]: css`
    margin-top: -3px;
    margin-left: 4px;
  `,
  [Size.Small]: css`
    margin-top: -3px;
    margin-left: 8px;
  `,
  [Size.Default]: css`
    margin-top: 0;
    margin-left: 8px;
  `,
};

export const labelThemeStyles = {
  [Theme.Light]: {
    base: css`
      color: ${palette.black};
      font-family: ${fontFamilies.default};
    `,

    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.dark1};
    `,
  },

  [Theme.Dark]: {
    base: css`
      color: ${palette.gray.light2};
    `,

    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.dark1};
    `,
  },
};

export const labelBaseStyle = css`
  display: flex;
  line-height: 20px;
  cursor: pointer;
  align-items: flex-start;
  font-size: 13px;
  font-weight: 700;
`;

export const inputThemeStyles = {
  [Theme.Light]: css`
    &:checked {
      & + .${inputDisplayWrapper} .${inputDisplay} {
        background-color: ${palette.blue.base};
        border-color: ${palette.blue.base};

        &:after {
          transform: scale(1);
        }
      }

      &:disabled + .${inputDisplayWrapper} .${inputDisplay} {
        background-color: ${palette.gray.light2};
        border-color: ${palette.gray.light2};

        &:after {
          background-color: ${palette.gray.light3};
          transform: scale(1);
        }
      }
    }

    &:focus-visible:not(:disabled) + .${inputDisplayWrapper} .${inputDisplay} {
      box-shadow: ${focusRing.light.default};
    }

    &:disabled + .${inputDisplayWrapper} .${inputDisplay} {
      border-color: ${palette.gray.light2};
      background-color: ${palette.gray.light3};

      &:after {
        transform: scale(1);
        background-color: ${palette.gray.light3};
      }
    }
  `,

  [Theme.Dark]: css`
    &:checked {
      & + .${inputDisplayWrapper} .${inputDisplay} {
        background-color: ${palette.blue.light1};
        border-color: ${palette.blue.light1};

        &:after {
          transform: scale(1);
        }
      }

      &:disabled + .${inputDisplayWrapper} .${inputDisplay} {
        border-color: ${palette.gray.dark3};

        &:after {
          background-color: ${palette.gray.dark2};
          transform: scale(1);
        }
      }
    }

    &:focus-visible:not(:disabled) + .${inputDisplayWrapper} .${inputDisplay} {
      box-shadow: ${focusRing.dark.default};
    }

    &:disabled + .${inputDisplayWrapper} .${inputDisplay} {
      border-color: ${palette.gray.dark2};
      background-color: ${palette.gray.dark3};

      &:after {
        transform: scale(1);
        background-color: ${palette.gray.dark3};
      }
    }
  `,
};

export const hoverModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover {
      color: red;
      .${inputDisplay} {
        box-shadow: ${hoverRing.light.gray};
      }
    }
  `,
  [Theme.Dark]: css`
    &:hover {
      .${inputDisplay} {
        box-shadow: ${hoverRing.dark.gray};
      }
    }
  `,
};

export const inputBaseStyle = css`
  height: 0;
  width: 0;
  opacity: 0;
  margin: 0;
`;

export const divThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.gray.dark2};
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.base};
    background-color: ${palette.black};
  `,
};

export const divBaseStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 100%;
  border-style: solid;

  &:before {
    content: '';
    position: absolute;
    border-radius: 100%;
  }

  &:after {
    content: '';
    background-color: white;
    border-radius: 100%;
    transform: scale(0);
  }

  .${inputDataProp}:disabled + .${inputDisplayWrapper} & {
    &:after {
      box-shadow: none;
    }
  }
`;

export const divSizeStyles: Omit<Record<Size, string>, 'xsmall'> = {
  [Size.Small]: css`
    border-width: 2px;

    &:after {
      width: 6px;
      height: 6px;
      transition: transform 0.15s cubic-bezier(0.16, 1.54, 0, 1.31),
        border-color 0.15s ease-in-out;
    }
  `,
  [Size.Default]: css`
    border-width: 3px;

    &:after {
      width: 8px;
      height: 8px;
      transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275),
        border-color 0.15s ease-in-out;
    }
  `,
};

export const radioBoxSizeStyles: Omit<Record<Size, string>, 'xsmall'> = {
  [Size.Small]: css`
    height: 14px;
    width: 14px;
  `,
  [Size.Default]: css`
    height: 20px;
    width: 20px;
  `,
};

export const radioBoxBaseStyle = css`
  position: relative;
  flex-shrink: 0;
`;
