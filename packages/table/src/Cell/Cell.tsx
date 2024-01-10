import React from 'react';
import PropTypes from 'prop-types';

import { CellWithRTProps } from './Cell.types';
import CellWithoutRT from './CellWithoutRT';
import CellWithRT from './CellWithRT';

/**
 * Renders the provided cells
 */
const Cell = (props: CellWithRTProps) => {
  const isUsedWithRT =
    props?.cellIndex || props?.depth || props?.isVisible || props?.isExpandable;

  return (
    <>
      {isUsedWithRT ? <CellWithRT {...props} /> : <CellWithoutRT {...props} />}
    </>
  );
};

Cell.propTypes = {
  cellIndex: PropTypes.number,
  depth: PropTypes.number,
  isVisible: PropTypes.bool,
  isExpandable: PropTypes.bool,
};

Cell.displayName = 'Cell';

export default Cell;
