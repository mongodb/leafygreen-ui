import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const wrapperClassName = createUniqueClassName('number-input-wrapper');

export const inputBaseStyles = css`
  all: unset;
  height: inherit;
  box-sizing: border-box;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: background-color;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }

  &[aria-disabled='true'] {
    cursor: not-allowed;

    &:hover,
    &:active {
      box-shadow: none;
    }
  }

  .${wrapperClassName}:hover &,
  .${wrapperClassName}:focus-within & {
    transition-property: padding;
  }
`;

export const inputErrorPaddingTransitionStyles = css`
  transition-property: padding;
`;

export const wrapperBaseStyles = css`
  position: relative;
  border-radius: 6px;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
  overflow: hidden;
  display: flex;
  align-items: center;
  flex-grow: 1;
  flex-shrink: 0;
  z-index: 1;
  width: unset;
`;

export const selectBaseStyles = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;
