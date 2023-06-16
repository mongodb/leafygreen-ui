import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  hoverRing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { Size } from './types';

export const toggleButtonClassName = createUniqueClassName('toggle-button');

export const buttonSelectors = {
  checked: `.${toggleButtonClassName}[aria-checked="true"]`,
  unchecked: `.${toggleButtonClassName}[aria-checked="false"]`,
  disabled: `.${toggleButtonClassName}:disabled`,
};

export const sliderSelector = {
  checked: `${buttonSelectors.checked} > &`,
  unchecked: `${buttonSelectors.unchecked} > &`,
  disabled: `${buttonSelectors.disabled} > &`,
};

export const checkmarkSelector = {
  checked: `${buttonSelectors.checked}:not(:disabled) &`,
  unchecked: `${buttonSelectors.unchecked}:not(:disabled) &`,
  disabledChecked: `${buttonSelectors.checked}:disabled &`,
  disabledUnchecked: `${buttonSelectors.unchecked}:disabled &`,
};

export const buttonBaseStyles = css`
  transition: ${transitionDuration.default}ms all ease-in-out,
    0s background-color linear;
  display: inline-block;
  flex-shrink: 0;
  position: relative;
  padding: 0;
  border-radius: 50px;
  border: 1px solid;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
  }

  &[aria-checked='true'] {
    transition-delay: ${transitionDuration.default}ms;

    &:before {
      transform: scale(1);
      opacity: 1;
    }
  }

  // We're animating this pseudo-element in order to give the toggle groove
  // background an animation in and out.
  &:before {
    content: '';
    transition: ${transitionDuration.default}ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 50px;
    opacity: 0;
    transform: scale(0.85);
  }

  &:disabled:before {
    opacity: 0;
  }
`;

export const sliderBaseStyles = css`
  transition: all ${transitionDuration.default}ms ease-in-out;
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  ${sliderSelector.disabled} {
    &:before,
    &:after {
      content: none;
    }
  }
`;

export const buttonSizeStyles: Record<Size, string> = {
  [Size.Default]: css`
    height: 32px;
    width: 56px;
  `,

  [Size.Small]: css`
    height: 22px;
    width: 40px;
  `,

  [Size.XSmall]: css`
    height: 14px;
    width: 24px;
  `,
};

export const sliderSizeStyles: Record<Size, string> = {
  [Size.Default]: css`
    height: 28px;
    width: 28px;
    left: 1px;

    ${sliderSelector.checked} {
      transform: translate3d(24px, 0, 0);
    }
  `,

  [Size.Small]: css`
    height: 18px;
    width: 18px;
    left: 1px;

    ${sliderSelector.checked} {
      transform: translate3d(18px, 0, 0);
    }
  `,

  [Size.XSmall]: css`
    height: 12px;
    width: 12px;

    ${sliderSelector.checked} {
      transform: translate3d(10px, 0, 0);
    }
  `,
};

export const buttonThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    &[aria-checked='false']:not(:disabled) {
      background-color: ${palette.gray.base};
      border-color: ${palette.gray.base};
    }

    &[aria-checked='true'] {
      // We set background-color here to avoid a small issue with overflow clipping
      // that makes this look less seamless than it should.
      background-color: ${palette.blue.base};
      border-color: ${palette.blue.base};
    }

    &:disabled {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light2};
    }

    &:before {
      background-color: ${palette.blue.base};
    }

    &:hover:not(:disabled) {
      box-shadow: ${hoverRing.light.gray};
    }

    &:focus-visible:not(:disabled) {
      box-shadow: ${focusRing.light.default};
    }
  `,
  [Theme.Dark]: css`
    &[aria-checked='false']:not(:disabled) {
      background-color: ${palette.gray.dark1};
      border-color: ${palette.gray.dark1};
    }

    &[aria-checked='true'] {
      // We set background-color here to avoid a small issue with overflow clipping
      // that makes this look less seamless than it should.
      background-color: ${palette.blue.light1};
      border-color: ${palette.blue.light1};
    }

    &:disabled {
      background-color: ${palette.gray.dark2};
      border-color: ${palette.gray.dark2};
    }

    &:before {
      background-color: ${palette.blue.light1};
    }

    &:hover:not(:disabled) {
      box-shadow: ${hoverRing.dark.gray};
    }

    &:focus-visible:not(:disabled) {
      box-shadow: ${focusRing.dark.default};
    }
  `,
};

export const sliderThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};

    ${sliderSelector.disabled} {
      background-color: ${palette.gray.light3};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.white};

    ${sliderSelector.disabled} {
      background-color: ${palette.gray.dark1};
    }
  `,
};

export const checkmarkBaseStyles = css`
  display: flex;
  transition: color ${transitionDuration.default}ms ease-in-out;
`;

export const checkmarkThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    ${checkmarkSelector.checked} {
      color: ${palette.blue.light1};
    }

    ${checkmarkSelector.unchecked} {
      color: ${palette.white};
    }

    ${checkmarkSelector.disabledChecked} {
      color: ${palette.gray.dark2};
    }

    ${checkmarkSelector.disabledUnchecked} {
      color: ${palette.gray.dark1};
    }
  `,
  [Theme.Light]: css`
    ${checkmarkSelector.checked} {
      color: ${palette.blue.base};
    }

    ${checkmarkSelector.unchecked} {
      color: ${palette.white};
    }

    ${checkmarkSelector.disabledChecked} {
      color: ${palette.gray.light1};
    }

    ${checkmarkSelector.disabledUnchecked} {
      color: ${palette.gray.light3};
    }
  `,
};

export const checkmarkSize: Omit<Record<Size, number>, 'xsmall'> = {
  [Size.Default]: 16,
  [Size.Small]: 14,
};
