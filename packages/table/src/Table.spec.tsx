import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table, TableHeader, HeaderRow, Row, Cell } from '.';
import { defaultData } from './fixtures';

interface Props {
  table?: any;
  row?: any;
  cell?: any;
}

const defaultColumns = [
  <TableHeader key="name" label="name" />,
  <TableHeader key="age" label="age" />,
  <TableHeader key="color" label="color" />,
  'location',
];

function renderTable(props: Props = {}) {
  render(
    <Table
      data-testid="table"
      data={defaultData}
      columns={defaultColumns}
      {...props.table}
    >
      {({ datum }: { datum; index }) => (
        <Row key={datum.name}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>
        </Row>
      )}
    </Table>,
  );
  const table = screen.getByTestId('table');
  return { table };
}

describe('packages/table', () => {
  describe('packages/table/table-head', () => {
    test('it renders "thead" tags', () => {
      renderTable();
      const tableHead = screen.getAllByRole('rowgroup')[0];
      expect(tableHead.tagName.toLowerCase()).toBe('thead');
    });

    test('it creates a header row when one is not supplied', () => {
      renderTable();
      const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
      expect(headerRow.length).toBe(1);
      expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
    });

    test('it renders one header row when it is supplied', () => {
      renderTable({
        table: {
          columns: [
            <HeaderRow key="header-row">
              <TableHeader key="name" label="name" />,
              <TableHeader key="age" label="age" />,
              <TableHeader key="color" label="color" />,
              <TableHeader key="location" label="location" />,
            </HeaderRow>,
          ],
        },
      });
      const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
      expect(headerRow.length).toBe(1);
      expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
    });

    test('it also formats columns that are passed in as a React.Fragment', () => {
      renderTable({
        table: {
          columns: (
            <>
              <TableHeader key="name" label="name" />
              <TableHeader key="age" label="age" />
              <TableHeader key="color" label="color" />
              <TableHeader key="location" label="location" />
            </>
          ),
        },
      });
      const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
      expect(headerRow.length).toBe(1);
      expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
    });

    test('by default, it does not render columns as sortable', () => {
      renderTable();
      const sortableIcons = screen.queryAllByTitle('sorted icon');
      expect(sortableIcons).toStrictEqual([]);
    });

    test('then the "sortable" prop is passed to a column, a sort icon is rendered', () => {
      renderTable({
        table: {
          columns: [
            <TableHeader key="name" label="Name" sortable />,
            'Age',
            'Color',
            'Location',
          ],
        },
      });

      const sortableIcons = screen.getAllByTitle('sorted icon');
      expect(sortableIcons.length).toBe(1);
    });
  });
  // describe('packages/table/table-header', () => {});
  // describe('pacakges/table/row', () => {});
  // describe('packages/table/cell', () => {});
  // test('condition', () => {});
});
