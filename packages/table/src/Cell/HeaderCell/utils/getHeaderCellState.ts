import { Header } from '../../..';
import { LGRowData } from '../../../useLeafyGreenTable';
import { SortState, SortStates } from '../HeaderCell.types';

const HeaderSortState: SortStates = {
  false: SortState.Off,
  asc: SortState.Asc,
  desc: SortState.Desc,
};

export const getHeaderCellState = <T extends LGRowData>(
  header?: Header<T, unknown>,
) => {
  let columnName, sortState, onSortIconClick;

  if (header && header?.column.columnDef.enableSorting) {
    columnName = header.column.columnDef.header as string;
    const headerSortDirection = header.column.getIsSorted().toString();
    sortState = HeaderSortState[headerSortDirection];
    onSortIconClick = header.column.getToggleSortingHandler();
  }

  return { columnName, sortState, onSortIconClick };
};
