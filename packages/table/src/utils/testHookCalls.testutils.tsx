import React, { useState } from 'react';

import useLeafyGreenTable, {
  LeafyGreenTable,
  LeafyGreenTableOptions,
} from '../useLeafyGreenTable';
import { ColumnDef, ExpandedState, SortingState } from '..';

import { Person } from './makeData.testutils';

export const getDefaultTestData: (
  rowProps: object,
  additionalData?: Array<Person>,
) => Array<Person> = (rowProps, additionalData = []) => {
  return [
    {
      id: 1 as unknown as string, // Tests expect this to behave like a number, but TS wants a string
      firstName: 'tanner',
      lastName: 'linsley',
      age: 29,
      visits: 100,
      status: 'relationship',
      ...rowProps,
    },
    {
      id: 2 as unknown as string,
      firstName: 'derek',
      lastName: 'perkins',
      age: 40,
      visits: 40,
      status: 'single',
    },
    {
      id: 3 as unknown as string,
      firstName: 'joe',
      lastName: 'bergevin',
      age: 45,
      visits: 20,
      status: 'complicated',
    },
    ...additionalData,
  ];
};

export type TestColumnsProps = Omit<
  ColumnDef<Person, any>,
  'accessorKey' | 'header'
>;

export const getDefaultTestColumns: (
  props: TestColumnsProps,
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
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    size: 50,
  },
  {
    accessorKey: 'visits',
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
  columnProps?: TestColumnsProps;
  hookProps?: Partial<LeafyGreenTableOptions<Person>>;
  stateProps?: any;
  additionalData?: Array<Person>;
  hasData?: boolean;
}

/**
 * A useLeafyGreenTable hook call utilized across different test suites to simplify test `render`s' markup
 */
export const useTestHookCall = ({
  rowProps,
  columnProps,
  hookProps,
  additionalData,
  hasData = true,
}: TestTableWithHookProps) => {
  const [data] = useState<Array<Person>>(
    hasData
      ? () => getDefaultTestData((rowProps = rowProps ?? {}), additionalData)
      : [],
  );
  const [columns] = useState(() => getDefaultTestColumns(columnProps ?? {}));
  const [sorting, setSorting] = useState<SortingState>([]);
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table: LeafyGreenTable<Person> = useLeafyGreenTable({
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

  return { table, rowSelection };
};

// TODO: useLeafyGreenVirtualTable
