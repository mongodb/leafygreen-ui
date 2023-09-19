import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontWeights,
  hoverRing,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Size } from '../types';

export const inputDisplayClassName = createUniqueClassName('radio-group');
export const inputDisplayWrapperClassName =
  createUniqueClassName('radio-group');
export const inputClassName = createUniqueClassName('radio-group');

export const containerStyle = css`
  display: grid;
  grid-template-areas: 'label label' '. description';
  gap: 0 ${spacing[2]}px;
`;

export const containerSizeStyle: Omit<Record<Size, string>, 'xsmall'> = {
  // size of `inputDisplay` element
  [Size.Small]: css`
    grid-template-columns: 14px auto;
  `,
  [Size.Default]: css`
    grid-template-columns: 20px auto;
  `,
};

export const labelBaseStyle = css`
  grid-area: label;
  display: flex;
  line-height: 20px;
  cursor: pointer;
  align-items: flex-start;
  font-weight: ${fontWeights.bold};
`;

export const disabledStyle = css`
  cursor: not-allowed;
`;

export const labelWeightStyle = css`
  font-weight: ${fontWeights.regular};
`;

export const inputThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:checked {
      & + .${inputDisplayWrapperClassName} .${inputDisplayClassName} {
        background-color: ${palette.blue.base};
        border-color: ${palette.blue.base};

        &:after {
          transform: scale(1);
        }
      }

      &:disabled + .${inputDisplayWrapperClassName} .${inputDisplayClassName} {
        background-color: ${palette.gray.light2};
        border-color: ${palette.gray.light2};

        &:after {
          background-color: ${palette.gray.light3};
          transform: scale(1);
        }
      }
    }

    &:focus-visible:not(:disabled)
      + .${inputDisplayWrapperClassName}
      .${inputDisplayClassName} {
      box-shadow: ${focusRing.light.default};
    }

    &:disabled + .${inputDisplayWrapperClassName} .${inputDisplayClassName} {
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
      & + .${inputDisplayWrapperClassName} .${inputDisplayClassName} {
        background-color: ${palette.blue.light1};
        border-color: ${palette.blue.light1};

        &:after {
          transform: scale(1);
        }
      }

      &:disabled + .${inputDisplayWrapperClassName} .${inputDisplayClassName} {
        border-color: ${palette.gray.dark3};

        &:after {
          background-color: ${palette.gray.dark2};
          transform: scale(1);
        }
      }
    }

    &:focus-visible:not(:disabled)
      + .${inputDisplayWrapperClassName}
      .${inputDisplayClassName} {
      box-shadow: ${focusRing.dark.default};
    }

    &:disabled + .${inputDisplayWrapperClassName} .${inputDisplayClassName} {
      border-color: ${palette.gray.dark2};
      background-color: ${palette.gray.dark3};

      &:after {
        transform: scale(1);
        background-color: ${palette.gray.dark3};
      }
    }
  `,
};

export const hoverThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover {
      .${inputDisplayClassName} {
        box-shadow: ${hoverRing.light.gray};
      }
    }
  `,
  [Theme.Dark]: css`
    &:hover {
      .${inputDisplayClassName} {
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

export const inputDisplayThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.gray.dark2};
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.base};
    background-color: ${palette.black};
  `,
};

export const inputDisplayBaseStyle = css`
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

  .${inputClassName}:disabled + .${inputDisplayWrapperClassName} & {
    &:after {
      box-shadow: none;
    }
  }
`;

export const inputDisplaySizeStyles: Omit<Record<Size, string>, 'xsmall'> = {
  [Size.Small]: css`
    border-width: 2px;

    &:after {
      width: 6px;
      height: 6px;
      transition: transform ${transitionDuration.default}ms
          cubic-bezier(0.16, 1.54, 0, 1.31),
        border-color ${transitionDuration.default}ms ease-in-out;
    }
  `,
  [Size.Default]: css`
    border-width: 3px;

    &:after {
      width: 8px;
      height: 8px;
      transition: transform ${transitionDuration.default}ms
          cubic-bezier(0.175, 0.885, 0.32, 1.275),
        border-color ${transitionDuration.default}ms ease-in-out;
    }
  `,
};

export const radioBoxSizeStyles: Omit<Record<Size, string>, 'xsmall'> = {
  [Size.Small]: css`
    height: 14px;
    width: 14px;
    margin-top: 3px;
    margin-right: 8px;
  `,
  [Size.Default]: css`
    height: 20px;
    width: 20px;
    margin-right: 8px;
  `,
};

export const radioBoxBaseStyle = css`
  position: relative;
  flex-shrink: 0;
`;

export const descriptionStyles = css`
  grid-area: description;
`;
