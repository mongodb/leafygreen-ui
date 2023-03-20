import React from 'react';
import { Meta } from "@storybook/react";
import { Cell, HeaderRow, Row, Table, TableHeader } from "../TableV10";
import V11Adapter from "./V11Adapter";
import { defaultData } from '../TableV10/fixtures';

export default {
  title: 'Components/Table/V11 Adapter',
  component: V11Adapter,
} as Meta<typeof V11Adapter>;

export const Basic = () => {

  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  )
}

export const DefaultZebraStripes = () => {

  return (
    <V11Adapter>
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader key="name" label="Name" dataType="string" />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
      >
        {({ datum }: any) => (
          <Row>
            <Cell>{datum.name}</Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
          </Row>
        )}
      </Table>
    </V11Adapter>
  )
}