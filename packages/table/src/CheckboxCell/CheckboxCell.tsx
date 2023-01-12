import React from 'react';
import Checkbox from '@leafygreen-ui/checkbox';
import { CheckboxProps } from '@leafygreen-ui/checkbox/src/types';
import { baseStyles } from './Checkbox.styles';

const CheckboxCell = (props: CheckboxProps) => (
  <div className={baseStyles}>
    <Checkbox {...props} />
  </div>
);

export default CheckboxCell;
