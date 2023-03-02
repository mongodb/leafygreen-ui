import { css } from '@leafygreen-ui/emotion';

export const baseStyles = css`
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`;
