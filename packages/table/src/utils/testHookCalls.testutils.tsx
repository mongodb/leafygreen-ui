import React, { useRef, useState } from 'react';

import useLeafyGreenTable, {
  LeafyGreenTable,
  LeafyGreenTableOptions,
} from '../useLeafyGreenTable';
import { ColumnDef, ExpandedState, SortingState } from '..';

import { Person } from './makeData.testutils';

export const getDefaultTestData: (
  rowProps: object,
) => Array<Person> = rowProps => {
  return [
    {
      id: 1,
      firstName: 'tanner',
      lastName: 'linsley',
      age: 29,
      visits: 100,
      status: 'relationship',
      ...rowProps,
    },
    {
      id: 2,
      firstName: 'derek',
      lastName: 'perkins',
      age: 40,
      visits: 40,
      status: 'single',
    },
    {
      id: 3,
      firstName: 'joe',
      lastName: 'bergevin',
      age: 45,
      visits: 20,
      status: 'complicated',
    },
  ];
};

export type getTestColumnsProps = (
  | {}
  | Omit<ColumnDef<Person, any>, 'accessorKey' | 'header'>
) & {};

export const getDefaultTestColumns: (
  props: getTestColumnsProps,
) => Array<ColumnDef<Person>> = props => [
  {
    accessorKey: 'id',
    header: 'ID',
    ...props,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    cell: info => info.getValue(),
  },
  {
    accessorFn: row => row.lastName,
    id: 'lastName',
    cell: info => info.getValue(),
    // eslint-disable-next-line react/display-name
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: 'age',
    // eslint-disable-next-line react/display-name
    header: () => 'Age',
    size: 50,
  },
  {
    accessorKey: 'visits',
    // eslint-disable-next-line react/display-name
    header: () => <span>Visits</span>,
    size: 50,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    size: 90,
  },
];

export interface TestTableWithHookProps {
  rowProps?: object;
  columnProps?: getTestColumnsProps;
  hookProps?: Partial<LeafyGreenTableOptions<Person>>;
  stateProps?: any;
}

/**
 * A hook call utilized across different test suites to simplify test `render`s' markup
 */
export const useTestHookCall = ({
  rowProps,
  columnProps,
  hookProps,
}: TestTableWithHookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data] = useState<Array<Person>>(() =>
    getDefaultTestData(rowProps ?? {}),
  );
  const [columns] = useState(() => getDefaultTestColumns(columnProps ?? {}));
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table: LeafyGreenTable<Person> = useLeafyGreenTable({
    containerRef,
    data,
    columns,
    state: {
      sorting,
      expanded,
      rowSelection,
    },
    onSortingChange: setSorting,
    onExpandedChange: setExpanded,
    onRowSelectionChange: setRowSelection,
    ...hookProps,
  });

  return { containerRef, table, rowSelection };
};
