import React from 'react';

import { LGTableDataType, useLeafyGreenTable } from '@leafygreen-ui/table';
import { Description, Link } from '@leafygreen-ui/typography';

import { BasicTable } from '../../HELPERS/BasicTable';
import { TableHeaderWithSubtitle } from '../../HELPERS/TableHeaderWithSubtitle';
import { useFetchRequiredActionTableData } from '../hooks/useFetchRequiredActionTableData';

import {
  InheritedRequiredActionCardProps,
  RequiredActionCard,
  TitleEm,
} from './RequiredActionCard';

interface StreamProcessingTableData {
  name: string;
  region: string;
  started: number;
  stopped: number;
  failed: number;
}

const streamProcessingColumns = [
  { accessorKey: 'name', header: 'Workspace name' },
  { accessorKey: 'region', header: 'Region', maxSize: 180 },
  {
    accessorKey: 'started',
    maxSize: 96,
    header: () => (
      <TableHeaderWithSubtitle title="Started" subtitle="Stream processors" />
    ),
  },
  {
    accessorKey: 'stopped',
    maxSize: 96,
    header: () => (
      <TableHeaderWithSubtitle title="Stopped" subtitle="Stream processors" />
    ),
  },
  {
    accessorKey: 'failed',
    maxSize: 96,
    header: () => (
      <TableHeaderWithSubtitle title="Failed" subtitle="Stream processors" />
    ),
  },
];

const demoStreamProcessingData: Array<
  LGTableDataType<StreamProcessingTableData>
> = [
  {
    name: 'Workspace-1',
    region: 'us-east-1',
    started: 1,
    stopped: 2,
    failed: 0,
  },
  {
    name: 'Workspace-2',
    region: 'us-west-2',
    started: 1,
    stopped: 2,
    failed: 0,
  },
];

export const StreamProcessingCard = ({
  ...props
}: InheritedRequiredActionCardProps) => {
  const { isLoading, tableData } = useFetchRequiredActionTableData({
    demoData: demoStreamProcessingData,
  });

  const table = useLeafyGreenTable({
    data: tableData,
    columns: streamProcessingColumns,
  });

  return (
    <RequiredActionCard
      isLoading={isLoading}
      loadingTitle="Checking for stream processing workspaces"
      title={
        <>
          Terminate <TitleEm>{tableData?.length}</TitleEm> stream processing
          workspaces
        </>
      }
      description={
        <Description>
          All Stream Processing workspaces will be terminated upon project
          deletion. Review the workspaces below or go to the{' '}
          <Link
            href="TODO:"
            target="_blank"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            Stream Processing
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
