import React from 'react';

import {
  LGColumnDef,
  LGTableDataType,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';
import { Description, Link } from '@leafygreen-ui/typography';

import { BasicTable } from '../../HELPERS/BasicTable';
import { useFetchRequiredActionTableData } from '../hooks/useFetchRequiredActionTableData';

import {
  InheritedRequiredActionCardProps,
  RequiredActionCard,
  TitleEm,
} from './RequiredActionCard';

interface ApplicationsTableData {
  name: string;
}

const applicationsColumns: Array<LGColumnDef<ApplicationsTableData>> = [
  { accessorKey: 'name', header: 'Applications' },
];

const demoApplicationsData: Array<LGTableDataType<ApplicationsTableData>> = [
  { name: 'Application-1' },
  { name: 'Application-2' },
  { name: 'Application-3' },
];

export const ApplicationsCard = ({
  ...props
}: InheritedRequiredActionCardProps) => {
  const { isLoading, tableData } = useFetchRequiredActionTableData({
    demoData: demoApplicationsData,
  });

  const table = useLeafyGreenTable({
    data: tableData,
    columns: applicationsColumns,
  });

  return (
    <RequiredActionCard
      isLoading={isLoading}
      loadingTitle="Checking for applications"
      title={
        <>
          Delete <TitleEm>{tableData?.length}</TitleEm> applications
        </>
      }
      description={
        <Description>
          All applications will be deleted upon project deletion. Review the
          applications below or go to the{' '}
          <Link
            href="TODO:"
            target="_blank"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            Apps
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
