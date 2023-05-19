import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { defaultData, testTableDataShape } from './fixtures.testutils';
import { Cell, Row, Table, TableHeader } from '.';

interface Props {
  table?: any;
  row?: any;
}

export const defaultColumns = [
  <TableHeader key="name" label="Name" />,
  <TableHeader key="age" label="Age" />,
  <TableHeader key="color" label="Color" />,
  <TableHeader key="location" label="Location" />,
];

export function renderTable(props: Props = {}) {
  const { rerender } = render(
    <Table
      data-testid="table"
      data={defaultData}
      columns={defaultColumns}
      {...props.table}
    >
      {({ datum }: { datum: testTableDataShape }) => (
        <Row key={datum.name} {...props.row}>
          <Cell isHeader>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>

          {datum.expandable && (
            <Row>
              <Cell>hidden: {datum.name}</Cell>
              <Cell>expanded age: {datum.age}</Cell>
              <Cell>expanded color: {datum.color}</Cell>
              <Cell>{datum.location}</Cell>
            </Row>
          )}
        </Row>
      )}
    </Table>,
  );
  const table = screen.getByTestId('table');
  return { table, rerender };
}
