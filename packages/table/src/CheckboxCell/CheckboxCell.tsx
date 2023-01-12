import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { css } from '@leafygreen-ui/emotion';
import { CheckboxProps } from '@leafygreen-ui/checkbox/src/types';

const CheckboxCell = (props: CheckboxProps) => (
  <div
    className={css`
      // break the first-cell padding. would be better to use a className here, but createUniqueClassname would have performance concerns.
      margin-left: -16px;
      width: 36px;
    `}
  >
    <Checkbox {...props} />
  </div>
);

export default CheckboxCell;
