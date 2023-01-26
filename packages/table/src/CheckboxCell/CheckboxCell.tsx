import React from 'react';
import PropTypes from 'prop-types';

import Checkbox from '@leafygreen-ui/checkbox';
import { CheckboxProps } from '@leafygreen-ui/checkbox/src/types';
import { cx } from '@leafygreen-ui/emotion';

import { baseStyles, headerStyles } from './Checkbox.styles';

const CheckboxCell = (props: CheckboxProps & { isHeader?: boolean }) => (
  <div className={cx(baseStyles, { [headerStyles]: props.isHeader })}>
    <Checkbox {...props} />
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
