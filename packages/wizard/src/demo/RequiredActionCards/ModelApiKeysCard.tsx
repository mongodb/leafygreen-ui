import React from 'react';
import { format } from 'date-fns';

import {
  CellContext,
  LGColumnDef,
  LGTableDataType,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';
import { Description } from '@leafygreen-ui/typography';

import { BasicTable } from '../../HELPERS/BasicTable';
import { useFetchRequiredActionTableData } from '../hooks/useFetchRequiredActionTableData';

import {
  InheritedRequiredActionCardProps,
  RequiredActionCard,
  TitleEm,
} from './RequiredActionCard';

const DateCell = (
  cellData: CellContext<LGTableDataType<ModelAPIKeyTableData>, unknown>,
) => {
  const val = cellData.getValue() as Date | undefined;

  if (!val) return <>Never</>;

  return <>{format(val, 'yyyy-MM-dd')}</>;
};

interface ModelAPIKeyTableData {
  keyName: string;
  createdDate: Date;
  lastUsedDate?: Date;
  createdBy: string;
}

const modelApiKeysColumns: Array<LGColumnDef<ModelAPIKeyTableData>> = [
  { accessorKey: 'keyName', header: 'Key Name' },
  { accessorKey: 'key', header: 'Secret key', cell: () => <>********</> },
  {
    accessorKey: 'createdDate',
    header: 'Created on (UTC)',
    cell: DateCell,
  },
  {
    accessorKey: 'lastUsedDate',
    header: 'Last used (UTC)',
    cell: DateCell,
  },
  { accessorKey: 'createdBy', header: 'Created by' },
];

const demoModelApiKeysData: Array<LGTableDataType<ModelAPIKeyTableData>> = [
  {
    keyName: 'voyage-api-key-1',
    createdDate: new Date('2019-04-22'),
    lastUsedDate: new Date(),
    createdBy: 'Mike Waltzer',
  },
  {
    keyName: 'voyage-api-key-2',
    createdDate: new Date('2022-08-29'),
    lastUsedDate: new Date(),
    createdBy: 'Lauren Fox',
  },
  {
    keyName: 'voyage-api-key-3',
    createdDate: new Date('2021-06-07'),
    createdBy: 'Adam Thompson',
  },
];

export const ModelApiKeysCard = ({
  ...props
}: InheritedRequiredActionCardProps) => {
  const { isLoading, tableData } = useFetchRequiredActionTableData({
    demoData: demoModelApiKeysData,
  });

  const table = useLeafyGreenTable({
    data: tableData,
    columns: modelApiKeysColumns,
  });

  return (
    <RequiredActionCard
      isLoading={isLoading}
      loadingTitle="Checking for Model API keys"
      title={
        <>
          Delete <TitleEm>{tableData?.length}</TitleEm> Model API keys
        </>
      }
      description={
        <Description>
          All Model API keys will be deleted upon project deletion.
        </Description>
      }
      {...props}
    >
      <BasicTable table={table} />
    </RequiredActionCard>
  );
};
