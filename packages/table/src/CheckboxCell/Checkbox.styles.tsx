import { css } from '@leafygreen-ui/emotion';

export const baseStyles = css`
  // break the first-cell padding. would be better to use a className here, but createUniqueClassname could have performance concerns.
  margin-left: -16px;
  width: 36px;
`;

export const headerStyles = css`
  // break the first-cell padding. would be better to use a className here, but createUniqueClassname could have performance concerns.
  margin-left: -24px;
`;
