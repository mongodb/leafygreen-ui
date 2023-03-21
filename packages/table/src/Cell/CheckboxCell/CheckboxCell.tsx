import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@leafygreen-ui/checkbox';
import { CheckboxProps } from '@leafygreen-ui/checkbox/src/types';

import { baseStyles } from './Checkbox.styles';

const CheckboxCell = ({ ...rest }: CheckboxProps) => (
  <div className={baseStyles} data-type="checkbox-cell">
    <Checkbox {...rest} />
  </div>
);

CheckboxCell.propTypes = {
  isHeader: PropTypes.bool,
  label: PropTypes.node,
  'aria-labelledby': PropTypes.string,
  'aria-label': PropTypes.string,
  indeterminate: PropTypes.bool,
  description: PropTypes.string,
  darkMode: PropTypes.bool,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  animate: PropTypes.bool,
  bold: PropTypes.bool,
  onChange: PropTypes.any,
};

export default CheckboxCell;
