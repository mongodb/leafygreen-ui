import React from 'react';
import { Row, Table } from '@tanstack/react-table';

import Checkbox from '@leafygreen-ui/checkbox';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useRowContext } from '../Row/RowContext';

import { disabledTableRowCheckStyles } from './useLeafyGreenTable.styles';
import { LGRowData, LGTableDataType } from '.';

export const TableRowCheckbox = <T extends LGRowData>({
  row,
  table,
}: {
  table: Table<LGTableDataType<T>>;
  row: Row<LGTableDataType<T>>;
}) => {
  const { theme } = useDarkMode();
  const { disabled: rowIsDisabled } = useRowContext();
  return (
    <Checkbox
      className={cx({
        [disabledTableRowCheckStyles[theme]]: rowIsDisabled,
      })}
      disabled={rowIsDisabled}
      checked={row.getIsSelected()}
      indeterminate={row.getIsSomeSelected()}
      onChange={row.getToggleSelectedHandler()}
      aria-label={`Select row ${row.id}`}
      aria-controls={`lg-table-row-${row.id}`}
      // Don't animate if _all_ rows have been checked (usually, if header row is clicked). Not the _best_ check, but it mostly works
      animate={!table.getIsAllRowsSelected()}
    />
  );
};
