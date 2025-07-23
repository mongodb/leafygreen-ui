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
    const column = header.column;
    columnName = column.columnDef.header as string;
    const headerSortDirection = column.getIsSorted().toString();
    sortState = HeaderSortState[headerSortDirection];
    onSortIconClick = column.getToggleSortingHandler();
  }

  return { columnName, sortState, onSortIconClick };
};
