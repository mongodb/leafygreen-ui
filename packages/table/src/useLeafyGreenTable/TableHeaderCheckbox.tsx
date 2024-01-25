import React from 'react';
import { Table } from '@tanstack/react-table';

import Checkbox from '@leafygreen-ui/checkbox';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useRowContext } from '../Row/RowContext';

import { disabledTableRowCheckStyles } from './useLeafyGreenTable.styles';
import { LGRowData, LGTableDataType } from '.';

export const TableHeaderCheckbox = <T extends LGRowData>({
  table,
}: {
  table: Table<LGTableDataType<T>>;
}) => {
  const { theme } = useDarkMode();
  const { disabled: rowIsDisabled } = useRowContext();
  return (
    <Checkbox
      className={cx({
        [disabledTableRowCheckStyles[theme]]: rowIsDisabled,
      })}
      disabled={rowIsDisabled}
      checked={table.getIsAllRowsSelected()}
      indeterminate={table.getIsSomeRowsSelected()}
      onChange={table.getToggleAllRowsSelectedHandler()}
      aria-label="Select all rows"
    />
  );
};
