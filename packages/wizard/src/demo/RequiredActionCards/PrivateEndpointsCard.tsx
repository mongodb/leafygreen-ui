import React, { useState } from 'react';
import upperFirst from 'lodash/upperFirst';

import { css } from '@leafygreen-ui/emotion';
import Circle from '@leafygreen-ui/icon/Circle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import {
  SegmentedControl,
  SegmentedControlOption,
} from '@leafygreen-ui/segmented-control';
import {
  CellContext,
  LGColumnDef,
  LGTableDataType,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';
import { color, spacing } from '@leafygreen-ui/tokens';
import { Description, Link } from '@leafygreen-ui/typography';

import { BasicTable } from '../../HELPERS/BasicTable';
import { useFetchRequiredActionTableData } from '../hooks/useFetchRequiredActionTableData';

import {
  InheritedRequiredActionCardProps,
  RequiredActionCard,
  TitleEm,
} from './RequiredActionCard';

const ServiceStatus = {
  Available: 'available',
} as const;
type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus];

const ConfigurationStatus = {
  Configured: 'configured',
} as const;
type ConfigurationStatus =
  (typeof ConfigurationStatus)[keyof typeof ConfigurationStatus];

const statusToColorMap: Record<
  ServiceStatus | ConfigurationStatus,
  Record<Theme, string>
> = {
  [ServiceStatus.Available]: {
    [Theme.Light]: color.light.icon.success.default,
    [Theme.Dark]: color.dark.icon.success.default,
  },
  [ConfigurationStatus.Configured]: {
    [Theme.Light]: color.light.icon.success.default,
    [Theme.Dark]: color.dark.icon.success.default,
  },
};

const StatusCell = <
  D extends
    | DedicatedClusterPrivateEndpointTableData
    | FederatedDBInstancePrivateEndpointTableData
    | StreamProcessingPrivateEndpointTableData,
>(
  cellData: CellContext<LGTableDataType<D>, unknown>,
) => {
  const { theme } = useDarkMode();
  const value = cellData.getValue() as ServiceStatus | ConfigurationStatus;
  const dotColor = statusToColorMap[value][theme];
  return (
    <>
      <Circle
        className={css`
          height: ${spacing[200]}px;
          color: ${dotColor};
        `}
      />
      {upperFirst(value)}
    </>
  );
};

const PrivateEndpointType = {
  Dedicated: 'dedicated',
  Federated: 'federated',
  StreamProcessing: 'stream-processing',
} as const;
type PrivateEndpointType =
  (typeof PrivateEndpointType)[keyof typeof PrivateEndpointType];

interface DedicatedClusterPrivateEndpointTableData {
  id: string;
  provider: string;
  region: string;
  endpointService: string;
  endpointStatus: ServiceStatus;
  configurationStatus: ConfigurationStatus;
}

const dedicatedClusterPrivateEndpointsColumns: Array<
  LGColumnDef<DedicatedClusterPrivateEndpointTableData>
> = [
  { accessorKey: 'provider', header: 'Cloud Provider', maxSize: 96 },
  { accessorKey: 'region', header: 'Region', maxSize: 96 },
  { accessorKey: 'endpointService', header: 'Atlas Endpoint Service' },
  {
    accessorKey: 'endpointStatus',
    header: 'Atlas Endpoint Service Status',
    cell: StatusCell,
  },
  { accessorKey: 'id', header: 'Endpoint' },
  {
    accessorKey: 'configurationStatus',
    header: 'Endpoint Status',
    maxSize: 112,
    cell: StatusCell,
  },
];

const demoDedicatedClusterPrivateEndpointsData: Array<
  LGTableDataType<DedicatedClusterPrivateEndpointTableData>
> = [
  {
    id: 'endpoint-1',
    provider: 'AWS',
    region: 'us-east-1',
    endpointService: 'com.amazonaws.vpce.us-east-1.vpce-svc-054161d3958725abb',
    endpointStatus: 'available',
    configurationStatus: 'configured',
  },
  {
    id: 'endpoint-2',
    provider: 'GCP',
    region: 'us-east-1',
    endpointService: 'com.amazonaws.vpce.us-east-1.vpce-svc-054161d3958725abb',
    endpointStatus: 'available',
    configurationStatus: 'configured',
  },
  {
    id: 'endpoint-3',
    provider: 'AWS',
    region: 'us-central1',
    endpointService: 'com.amazonaws.vpce.us-east-1.vpce-svc-054161d3958725abb',
    endpointStatus: 'available',
    configurationStatus: 'configured',
  },
];

interface FederatedDBInstancePrivateEndpointTableData {
  id: string;
  provider: string;
  endpointStatus: ServiceStatus;
  region: string;
  comment?: string;
}

const federatedDBInstancePrivateEndpointsColumns: Array<
  LGColumnDef<FederatedDBInstancePrivateEndpointTableData>
> = [
  { accessorKey: 'provider', header: 'Cloud Provider', maxSize: 96 },
  { accessorKey: 'region', header: 'Region', maxSize: 96 },
  {
    accessorKey: 'endpointStatus',
    header: 'Endpoint Status',
    maxSize: 96,
    cell: StatusCell,
  },
  { accessorKey: 'id', header: 'Endpoint' },
  {
    accessorKey: 'comment',
    header: 'Comment',
    cell: info => {
      const val = info.getValue() as string | undefined;

      if (!val || val.length === 0) {
        return '—';
      }

      return val;
    },
  },
];

const demoFederatedDBInstancePrivateEndpointsData: Array<
  LGTableDataType<FederatedDBInstancePrivateEndpointTableData>
> = [
  {
    id: 'vpce-0b9c5701325cb07e6',
    provider: 'AWS',
    endpointStatus: 'available',
    region: 'us-east-1',
    comment: 'Production endpoint',
  },
  {
    id: 'vpce-1a2b3c4d5e6f7g8h9',
    provider: 'AWS',
    endpointStatus: 'available',
    region: 'us-west-2',
  },
];

interface StreamProcessingPrivateEndpointTableData {
  provider: string;
  vendor: string;
  endpoint: string;
  endpointStatus: ServiceStatus;
  accountId: string;
}

const streamProcessingPrivateEndpointsColumns: Array<
  LGColumnDef<StreamProcessingPrivateEndpointTableData>
> = [
  { accessorKey: 'provider', header: 'Cloud Provider', maxSize: 96 },
  { accessorKey: 'vendor', header: 'Vendor', maxSize: 96 },
  { accessorKey: 'endpoint', header: 'Endpoint' },
  {
    accessorKey: 'endpointStatus',
    header: 'Endpoint Status',
    maxSize: 112,
    cell: StatusCell,
  },
  { accessorKey: 'accountId', header: 'Account ID' },
];

const demoStreamProcessingPrivateEndpointsData: Array<
  LGTableDataType<StreamProcessingPrivateEndpointTableData>
> = [
  {
    provider: 'AWS',
    vendor: 'S3',
    endpoint: 'vpce-0a1b2c3d4e5f6g7h8',
    endpointStatus: 'available',
    accountId: '123456789012',
  },
  {
    provider: 'AWS',
    vendor: 'Confluent',
    endpoint: 'vpce-9h8g7f6e5d4c3b2a1',
    endpointStatus: 'available',
    accountId: '123456789012',
  },
];

export const PrivateEndpointsCard = ({
  ...props
}: InheritedRequiredActionCardProps) => {
  const [segCtrlValue, setSegCtrlValue] = useState<PrivateEndpointType>(
    PrivateEndpointType.Dedicated,
  );

  const {
    isLoading: isDedicatedClustersLoading,
    tableData: dedicatedClusterTableData,
  } = useFetchRequiredActionTableData({
    demoData: demoDedicatedClusterPrivateEndpointsData,
  });

  const { isLoading: isFederatedDBLoading, tableData: federatedDBTableData } =
    useFetchRequiredActionTableData({
      demoData: demoFederatedDBInstancePrivateEndpointsData,
    });

  const {
    isLoading: isStreamProcessingLoading,
    tableData: streamProcessingTableData,
  } = useFetchRequiredActionTableData({
    demoData: demoStreamProcessingPrivateEndpointsData,
  });

  const dedicatedClusterTable = useLeafyGreenTable({
    data: dedicatedClusterTableData,
    columns: dedicatedClusterPrivateEndpointsColumns,
  });

  const federatedDBTable = useLeafyGreenTable({
    data: federatedDBTableData,
    columns: federatedDBInstancePrivateEndpointsColumns,
  });

  const streamProcessingTable = useLeafyGreenTable({
    data: streamProcessingTableData,
    columns: streamProcessingPrivateEndpointsColumns,
  });

  const isLoading =
    isDedicatedClustersLoading ||
    isFederatedDBLoading ||
    isStreamProcessingLoading;

  const totalEndpoints =
    dedicatedClusterTableData?.length +
    federatedDBTableData?.length +
    streamProcessingTableData?.length;

  return (
    <RequiredActionCard
      isLoading={isLoading}
      loadingTitle="Checking for private endpoint connections"
      title={
        <>
          Remove <TitleEm>{totalEndpoints}</TitleEm> private endpoint
          connections
        </>
      }
      description={
        <Description>
          All private endpoint connections will be removed upon project
          deletion. Review the private endpoint connections below or go to the{' '}
          <Link href="TODO:" target="_blank">
            Network Access
          </Link>
        </Description>
      }
      {...props}
    >
      {isLoading ? null : (
        <>
          <SegmentedControl
            size="xsmall"
            value={segCtrlValue}
            onChange={val => setSegCtrlValue(val as PrivateEndpointType)}
            className={css`
              margin: ${spacing[200]}px ${spacing[600]}px;
            `}
          >
            <SegmentedControlOption value={PrivateEndpointType.Dedicated}>
              Dedicated Cluster
            </SegmentedControlOption>
            <SegmentedControlOption value={PrivateEndpointType.Federated}>
              Federated database Instance / Online Archive
            </SegmentedControlOption>
            <SegmentedControlOption
              value={PrivateEndpointType.StreamProcessing}
            >
              Atlas stream processing
            </SegmentedControlOption>
          </SegmentedControl>

          {segCtrlValue === PrivateEndpointType.Dedicated && (
            <BasicTable table={dedicatedClusterTable} />
          )}
          {segCtrlValue === PrivateEndpointType.Federated && (
            <BasicTable table={federatedDBTable} />
          )}
          {segCtrlValue === PrivateEndpointType.StreamProcessing && (
            <BasicTable table={streamProcessingTable} />
          )}
        </>
      )}
    </RequiredActionCard>
  );
};
