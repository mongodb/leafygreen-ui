import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, getByText } from '@testing-library/react';
import { Table, TableHeader, HeaderRow, Row, Cell } from '.';
import { defaultData } from './fixtures';
import Checkbox from '@leafygreen-ui/checkbox';

interface Props {
  table?: any;
  row?: any;
}

const defaultColumns = [
  <TableHeader key="name" label="Name" />,
  <TableHeader key="age" label="Age" />,
  <TableHeader key="color" label="Color" />,
  'Location',
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
        <Row key={datum.name} {...props.row}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>

          {datum.age > 25 && (
            <Row data-testid="expandable-row">
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
  return { table };
}

describe('packages/table', () => {
  // TODO: Test sorting
  // TODO: Test selectable
  // TODO: Test className
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

    test('when the "sortable" prop is passed to a column, a sort icon is rendered', () => {
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

    test('it renders the correct number of "th" elements based on the "columns" prop', () => {
      renderTable();
      const tableHeaderRow = Array.from(screen.getAllByRole('row')[0].children);
      expect(tableHeaderRow.length).toBe(4);
      tableHeaderRow.map(tableHeader => {
        expect(tableHeader.tagName.toLowerCase()).toBe('th');
      });
    });
  });

  describe('packages/table/table-header', () => {
    test('it renders "label" as content inside of "th" tags', () => {
      renderTable();
      const tableHeaderRow = Array.from(screen.getAllByRole('row')[0].children);
      const firstColumn = tableHeaderRow[0];
      expect(firstColumn.tagName.toLowerCase()).toBe('th');
      expect(firstColumn.innerHTML).toContain('Name');
    });
  });

  describe('packages/table/header-row', () => {
    test('it renders a CheckboxCell in the HeaderRow when the "selectable" prop is set', () => {
      renderTable({ table: { selectable: true } });
      const tableHeaderRow = Array.from(screen.getAllByRole('row')[0].children);
      const firstColumn = tableHeaderRow[0];
      expect(firstColumn.innerHTML).toContain('type="checkbox"');
    });
  });

  describe('packages/table/row', () => {
    test('it renders a table row', () => {
      renderTable();
      const row = screen.getAllByRole('row')[1];
      expect(row.tagName.toLowerCase()).toBe('tr');
    });

    test('it renders a row as disabled when the prop is set', () => {
      renderTable({
        row: { disabled: true },
      });
      const disabledRow = screen.getAllByRole('row')[1];
      expect(disabledRow.getAttribute('aria-disabled')).toBe('true');
    });

    test('it renders an expandable icon, when the row is expandable', () => {
      renderTable();
      const expandableCell = screen.getByText('Iman').parentNode;
      const chevron = screen.getAllByRole('button')[0];
      expect(expandableCell.contains(chevron)).toBe(true);
    });

    // test('the expandable icon reveals a hidden row when clicked', () => {
    //   renderTable();

    //   const shouldBeHidden = screen.queryAllByTestId('expandable-row');
    //   expect(shouldBeHidden[0]).not.toBeVisible();

    //   const chevron = screen.getAllByRole('button')[0];
    //   fireEvent.click(chevron);

    //   const revealedRow = screen.getAllByTestId('expandable-row')[0];
    //   expect(revealedRow).toBeVisible();
    // });
  });

  describe('packages/table/cell', () => {
    test('it renders a "td" tag', () => {
      renderTable();
      const cell = screen.getAllByRole('cell');
      expect(cell[0].tagName.toLowerCase()).toBe('td');
    });

    test('it renders its children as its contents', () => {
      renderTable();
      const cell = screen.getAllByRole('cell');
      expect(cell[0].innerHTML).toContain('Alice');
    });
  });
});
