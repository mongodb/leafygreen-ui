import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { CheckboxProps } from '@leafygreen-ui/checkbox/src/types';
import { baseStyles, headerStyles } from './Checkbox.styles';
import { cx } from '@leafygreen-ui/emotion';

const CheckboxCell = (props: CheckboxProps & { isHeader?: boolean; }) => (
  <div className={cx(baseStyles, { [headerStyles]: props.isHeader })}>
    <Checkbox {...props} />
  </div>
);

export default CheckboxCell;
