import { css } from '@leafygreen-ui/emotion';

const baseStyles = css`
  list-style: none;
  padding-inline-start: 0;
  width: 100%;
  display: flex;
  & > * {
    flex: 1;
  }
`;

export default baseStyles;
