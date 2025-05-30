import { css } from '@leafygreen-ui/emotion';

export const baseStyles = css`
  border-radius: 8px;
  transition: border-radius 0.2s ease-in-out;

  &:hover {
    border-radius: 50%;
  }
`;
