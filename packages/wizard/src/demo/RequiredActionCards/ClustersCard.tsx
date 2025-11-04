import React, { ComponentType } from 'react';

import { Badge, Variant as BadgeVariant } from '@leafygreen-ui/badge';
import { Button } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import ReplicaSet from '@leafygreen-ui/icon/ReplicaSet';
import ShardedCluster from '@leafygreen-ui/icon/ShardedCluster';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { TableSkeleton } from '@leafygreen-ui/skeleton-loader';
import {
  LGColumnDef,
  LGTableDataType,
  useLeafyGreenTable,
} from '@leafygreen-ui/table';
import { color, spacing } from '@leafygreen-ui/tokens';
import { Body, Description, Link } from '@leafygreen-ui/typography';

import { BasicTable } from '../../HELPERS/BasicTable';
import { useFetchRequiredActionTableData } from '../hooks/useFetchRequiredActionTableData';

import {
  InheritedRequiredActionCardProps,
  RequiredActionCard,
  TitleEm,
} from './RequiredActionCard';

// TODO: This is likely defined somewhere in MMS
type ClusterTier = 'Free' | 'Flex' | 'Dedicated';
type ClusterType = 'Shard' | 'ReplicaSet';

const TierToVariantMap: Record<ClusterTier, BadgeVariant> = {
  Free: BadgeVariant.LightGray,
  Flex: BadgeVariant.Yellow,
  Dedicated: BadgeVariant.Blue,
};

const TypeToIconMap: Record<ClusterType, ComponentType> = {
  Shard: ShardedCluster,
  ReplicaSet: ReplicaSet,
};

interface ClusterTableData {
  id: string;
  name: string;
  tier: ClusterTier;
  clusterType: ClusterType;
  version: string;
  region: string;
  backup: boolean;
}

const clustersColumns: Array<LGColumnDef<ClusterTableData>> = [
  {
    accessorKey: 'name',
    header: 'Cluster Name',
    minSize: 384,
    cell: info => {
      const clusterType = info.row.original.clusterType;
      const TypeIcon = TypeToIconMap[clusterType];
      const name = info.getValue() as string;
      return (
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: ${spacing[100]}px;
          `}
        >
          <TypeIcon />
          <>{name}</>
        </div>
      );
    },
  },
  {
    accessorKey: 'tier',
    header: 'Tier',
    maxSize: 96,
    cell: info => {
      const val: ClusterTier = info.getValue() as ClusterTier;
      return <Badge variant={TierToVariantMap[val]}>{val}</Badge>;
    },
  },
  { accessorKey: 'version', header: 'Version', maxSize: 64 },
  { accessorKey: 'region', header: 'Region', minSize: 128 },
  {
    accessorKey: 'backup',
    header: 'Backup',
    maxSize: 64,
    cell: info => {
      const backupEnabled: boolean = info.getValue() as boolean;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { theme } = useDarkMode();
      return backupEnabled ? (
        <Body
          className={css`
            color: ${color[theme].text.error.default};
          `}
        >
          ON
        </Body>
      ) : (
        <Body>OFF</Body>
      );
    },
  },
  {
    id: 'downloadBackup',
    accessorKey: 'backup',
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { theme } = useDarkMode();
      return (
        <Link
          href="TODO:"
          target="_blank"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
          className={css`
            color: ${color[theme].text.primary.default};
            font-weight: 600;

            &,
            &:hover {
              // Emulating a LG Inline definition
              text-decoration: underline dotted 2px;
              text-underline-offset: 0.125em;
            }

            & > svg {
              color: ${color[theme].text.link.default};
            }
          `}
        >
          Download Backup
        </Link>
      );
    },
    maxSize: 96,
    cell: info => {
      const backupEnabled: boolean = info.getValue() as boolean;
      // TODO: What does this download button do?
      return (
        <Button disabled={!backupEnabled} size="xsmall">
          Download
        </Button>
      );
    },
  },
];

const demoClustersData: Array<LGTableDataType<ClusterTableData>> = [
  {
    id: 'abc123',
    name: 'Cluster1',
    clusterType: 'Shard',
    tier: 'Dedicated',
    version: '8.0.12',
    region: 'AWS / N. Virginia (us-east-1)',
    backup: true,
  },
  {
    id: 'xyz789',
    name: 'PUXFest2025',
    clusterType: 'ReplicaSet',
    tier: 'Free',
    version: '8.0.12',
    region: 'GCP / Iowa (us-central1)',
    backup: false,
  },
  {
    id: '456lmnop',
    name: 'PUX Design Strategy',
    clusterType: 'ReplicaSet',
    tier: 'Flex',
    version: '7.0.22',
    region: 'AWS / Oregon (us-west-2)',
    backup: false,
  },
];

export const ClustersCard = ({
  ...props
}: InheritedRequiredActionCardProps) => {
  const { isLoading, tableData } = useFetchRequiredActionTableData({
    demoData: demoClustersData,
  });

  const table = useLeafyGreenTable({
    data: tableData,
    columns: clustersColumns,
  });

  return (
    <RequiredActionCard
      isLoading={isLoading}
      loadingTitle="Checking clusters"
      title={
        <>
          Terminate <TitleEm>{tableData?.length}</TitleEm> clusters
        </>
      }
      description={
        <Description>
          All clusters will be terminated upon project deletion. Review the
          clusters below or go to the{' '}
          <Link
            href="TODO:"
            target="_blank"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            Clusters
          </Link>{' '}
          page.
        </Description>
      }
      {...props}
    >
      {isLoading ? (
        <TableSkeleton
          numCols={clustersColumns.length}
          columnLabels={clustersColumns.map(col => (
            <>
              {typeof col.header === 'function'
                ? col.header({} as any)
                : col.header ?? ''}
            </>
          ))}
        />
      ) : (
        <BasicTable table={table} />
      )}
    </RequiredActionCard>
  );
};
