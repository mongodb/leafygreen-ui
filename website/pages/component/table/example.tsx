import React from 'react';
import { Table, Row, Cell, TableHeader, HeaderRow } from '@leafygreen-ui/table';
import LiveExample, { KnobsConfigInterface } from 'components/live-example';

const defaultData = [
  {
    name: 'First Project',
    clusters: '1 Cluster',
    users: '12 Users',
    teams: '0 Teams',
    alerts: '5 Alerts',
  },
  {
    name: 'Second Project',
    clusters: '2 Clusters',
    users: '6 Users',
    teams: '4 Teams',
    alerts: '2 Alerts',
  },
  {
    name: 'Third Project',
    clusters: '5 Clusters',
    users: '2 Users',
    teams: '0 Teams',
    alerts: '1 Alert',
  },
];

const knobsConfig: KnobsConfigInterface<{
  disabled: boolean;
  sortBy: boolean;
}> = {
  disabled: {
    type: 'boolean',
    default: false,
    label: 'Disabled',
  },
  sortBy: {
    type: 'boolean',
    default: true,
    label: 'Sort By',
  },
};

function DefaultExample({
  disabled,
  sortBy,
}: {
  disabled: boolean;
  sortBy: boolean;
}) {
  return (
    <Table
      data={defaultData}
      columns={
        <HeaderRow>
          <TableHeader key="name" label="Project Name" />
          <TableHeader
            label="Clusters"
            sortBy={
              sortBy
                ? (datum: typeof defaultData[0]) => datum.clusters
                : undefined
            }
            key="clusters"
          />
          <TableHeader key="users" label="Users" />
          <TableHeader key="teams" label="Teams" />
          <TableHeader key="alerts" label="Alerts" />
        </HeaderRow>
      }
    >
      {({ datum }) => (
        <Row
          key={datum.name}
          disabled={disabled && datum.name === 'Second Project'}
        >
          <Cell>{datum.name}</Cell>
          <Cell>{datum.clusters}</Cell>
          <Cell>{datum.users}</Cell>
          <Cell>{datum.teams}</Cell>
          <Cell>{datum.alerts}</Cell>
        </Row>
      )}
    </Table>
  );
}

export default function TableLiveExample() {
  return (
    <LiveExample knobsConfig={knobsConfig}>
      {props => <DefaultExample {...props} />}
    </LiveExample>
  );
}
