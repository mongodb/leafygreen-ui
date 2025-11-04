import React from 'react';
import { format } from 'date-fns';

import { LGColumnDef, useLeafyGreenTable } from '@leafygreen-ui/table';
import { Description, Link } from '@leafygreen-ui/typography';

import { BasicTable } from '../../HELPERS/BasicTable';
import { TableHeaderWithSubtitle } from '../../HELPERS/TableHeaderWithSubtitle';
import { useFetchRequiredActionTableData } from '../hooks/useFetchRequiredActionTableData';

import {
  InheritedRequiredActionCardProps,
  RequiredActionCard,
  TitleEm,
} from './RequiredActionCard';

type FederatedDBType = 'Atlas SQL' | 'Online Archive' | 'Federated Instance';

interface FederatedDBTableData {
  name: string;
  type: FederatedDBType;
  region: string;
  queriesExecuted: number;
  dataProcessed: string;
  dataReturned: string;
  dateCreated: Date;
}

const federatedDbColumns: Array<LGColumnDef<FederatedDBTableData>> = [
  { accessorKey: 'name', header: 'Federated database instances' },
  { accessorKey: 'type', header: 'Type', minSize: 96 },
  { accessorKey: 'region', header: 'Cloud provider & region', minSize: 196 },
  {
    accessorKey: 'queriesExecuted',
    header: () => (
      <TableHeaderWithSubtitle title="Queries executed" subtitle="/month" />
    ),
  },
  {
    accessorKey: 'dataProcessed',
    header: () => (
      <TableHeaderWithSubtitle title="Data processed" subtitle="/month" />
    ),
  },
  {
    accessorKey: 'dataReturned',
    header: () => (
      <TableHeaderWithSubtitle title="Data returned" subtitle="/month" />
    ),
  },
  {
    accessorKey: 'dateCreated',
    header: 'Date created',
    cell: info => {
      // TODO: Use consistent, localized Time-in-Atlas format
      return format(info.getValue() as Date, 'yyyy-MM-dd HH:MM');
    },
  },
];

const demoFederatedDbData: Array<FederatedDBTableData> = [
  {
    name: 'FederatedDatabaseInstance0',
    type: 'Atlas SQL',
    region: 'AWS / N. Virginia (us-east-1)',
    queriesExecuted: 5,
    dataProcessed: '48 KB',
    dataReturned: '64 KB',
    dateCreated: new Date(),
  },
  {
    name: 'FederatedDatabaseInstance1',
    type: 'Online Archive',
    region: 'AWS / N. Virginia (us-east-1)',
    queriesExecuted: 28,
    dataProcessed: '48 KB',
    dataReturned: '64 KB',
    dateCreated: new Date(),
  },
  {
    name: 'FederatedDatabaseInstance2',
    type: 'Federated Instance',
    region: 'AWS / N. Virginia (us-east-1)',
    queriesExecuted: 1,
    dataProcessed: '48 KB',
    dataReturned: '64 KB',
    dateCreated: new Date(),
  },
  {
    name: 'FederatedDatabaseInstance3',
    type: 'Federated Instance',
    region: 'AWS / N. Virginia (us-east-1)',
    queriesExecuted: 7,
    dataProcessed: '48 KB',
    dataReturned: '64 KB',
    dateCreated: new Date(),
  },
];

export const FederatedDbCard = ({
  ...props
}: InheritedRequiredActionCardProps) => {
  const { isLoading, tableData } = useFetchRequiredActionTableData({
    demoData: demoFederatedDbData,
  });

  const table = useLeafyGreenTable({
    data: tableData,
    columns: federatedDbColumns,
  });

  return (
    <RequiredActionCard
      isLoading={isLoading}
      loadingTitle="Checking federated database instances"
      title={
        <>
          Terminate <TitleEm>{tableData?.length}</TitleEm> federated database
          instances
        </>
      }
      description={
        <Description>
          All federated database instances will be terminated upon project
          deletion. Review the federated database instances below or go to the{' '}
          <Link
            href="TODO:"
            target="_blank"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            Data Federation
          </Link>{' '}
          page.
        </Description>
      }
      {...props}
    >
      <BasicTable table={table} />
    </RequiredActionCard>
  );
};
