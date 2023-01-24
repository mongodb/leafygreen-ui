import Checkbox from '@leafygreen-ui/checkbox';
import { CheckboxProps } from '@leafygreen-ui/checkbox/src/types';
import { cx } from '@leafygreen-ui/emotion';
import React from 'react';
import { baseStyles, headerStyles } from './Checkbox.styles';

const CheckboxCell = (props: CheckboxProps & { isHeader?: boolean }) => (
  <div className={cx(baseStyles, { [headerStyles]: props.isHeader })}>
    <Checkbox {...props} />
  </div>
);

export default CheckboxCell;
