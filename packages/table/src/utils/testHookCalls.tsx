import React, { useRef, useState } from 'react'

import {
  ColumnDef,
  getCoreRowModel,
  SortingState
} from '..'
import useLeafygreenTable, { LeafygreenTable } from '../useLeafygreenTable'
import { Person } from './makeData'

export const getDefaultTestData: () => Person[] = () => [
  {
    id: 1,
    firstName: 'tanner',
    lastName: 'linsley',
    age: 29,
    visits: 100,
    status: 'relationship',
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
]

export type getTestColumnsProps = ({} | Omit<ColumnDef<Person, any>, 'accessorKey' | 'header'>) & {

}

export const getDefaultTestColumns: (props: getTestColumnsProps) => ColumnDef<Person>[] = (props) => [
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
]

interface TestTableWithHookProps {
  columnProps?: getTestColumnsProps;
}

export const useTestHookCall = ({
  columnProps
}: TestTableWithHookProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data] = useState<Person[]>(getDefaultTestData)
  const [columns] = useState(() => getDefaultTestColumns(columnProps ?? {}))
  const [sorting, setSorting] = useState<SortingState>([]);

  const table: LeafygreenTable<Person> = useLeafygreenTable({
    containerRef,
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  })

  return { containerRef, table }
}