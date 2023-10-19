import { css } from '@leafygreen-ui/emotion';

export const baseStyles = css`
  list-style: none;
  padding-inline-start: 0;
  width: 100%;
  display: flex;
  & > * {
    flex: 1;
  }
`;
