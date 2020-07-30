import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Table, TableHeader, HeaderRow, Row, Cell } from '.';
import { normalizeAccessor } from './TableHead';
import { defaultData } from './fixtures';

interface Props {
  table?: any;
  row?: any;
}

const className = 'test-className';

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
      {({ datum }) => (
        <Row key={datum.name} {...props.row}>
          <Cell>{datum.name}</Cell>
          <Cell>{datum.age}</Cell>
          <Cell>{datum.color}</Cell>
          <Cell>{datum.location}</Cell>

          {datum.age > 25 && (
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
  return { table };
}

describe('packages/table', () => {
  test('by default, it renders unsorted table data, based on "data" prop', () => {
    renderTable();
    const firstRow = screen.getAllByRole('row')[1];
    const alice = within(firstRow).getByText('Alice');
    expect(alice).toBeVisible();
  });

  test('it renders the data in descending order when the "sortable" prop is set, and the icon is clicked', () => {
    renderTable({
      table: {
        columns: [
          <TableHeader key="name" label="Name" sortBy="name" />,
          'Age',
          'Color',
          'Location',
        ],
      },
    });

    expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');

    const sortButton = screen.getAllByRole('button')[0];

    fireEvent.click(sortButton);

    expect(screen.getAllByRole('row')[1].innerHTML).toContain('Jill');

    fireEvent.click(sortButton);

    expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');
  });

  describe('when the table is selectable', () => {
    test('it adds a checkbox to every row', () => {
      renderTable({ table: { selectable: true } });
      const rows = screen.getAllByRole('row');
      const checkboxes = screen.getAllByRole('checkbox');
      expect(rows.length).toEqual(checkboxes.length);
    });

    test('it checks each checkmark when the master checkmark is checked', () => {
      renderTable({ table: { selectable: true } });
      const checkboxes = screen.getAllByRole('checkbox');
      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute('aria-checked')).toBe('false');
      });
      const masterCheckbox = checkboxes[0];

      fireEvent.click(masterCheckbox);

      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute('aria-checked')).toBe('true');
      });
    });

    test('it unchecks each checkmark when the master checkmark is unchecked', () => {
      renderTable({ table: { selectable: true } });
      const checkboxes = screen.getAllByRole('checkbox');
      const masterCheckbox = checkboxes[0];

      fireEvent.click(masterCheckbox);
      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute('aria-checked')).toBe('true');
      });
      fireEvent.click(masterCheckbox);
      checkboxes.forEach(checkbox => {
        expect(checkbox.getAttribute('aria-checked')).toBe('false');
      });
    });

    test('the master checkmark appears as indeterminate when one checkmark is checked', () => {
      renderTable({ table: { selectable: true } });

      const checkboxes = screen.getAllByRole('checkbox');
      const masterCheckbox = checkboxes[0];
      const innerCheckbox = checkboxes[1];

      fireEvent.click(innerCheckbox);
      expect(innerCheckbox.getAttribute('aria-checked')).toBe('true');
      expect(masterCheckbox.getAttribute('aria-checked')).toBe('mixed');
    });
  });

  test('it adds a className to the Tables classlist when one is supplied', () => {
    const { table } = renderTable({ table: { className } });
    expect(table.classList.contains(className)).toBe(true);
  });

  describe('packages/table/table-head', () => {
    describe('the normalizeAccessor function works as expected', () => {
      test('it accesses the data correctly when passed a string', () => {
        const normalizedAccessor = normalizeAccessor('test');
        expect(normalizedAccessor({ test: 'hi' })).toBe('hi');
      });
      test('it accesses the data correctly when passed a function', () => {
        const normalizedAccessor = normalizeAccessor(data => data.test);
        expect(normalizedAccessor({ test: 'hi' })).toBe('hi');
      });
    });

    test('it renders "thead" tags', () => {
      renderTable();
      const tableHead = screen.getAllByRole('rowgroup')[0];
      expect(tableHead.tagName.toLowerCase()).toBe('thead');
    });

    test('it creates a HeaderRow when one is not supplied', () => {
      renderTable();
      const headerRow = screen.getAllByTestId('leafygreen-ui-header-row');
      expect(headerRow.length).toBe(1);
      expect(headerRow[0].tagName.toLowerCase()).toBe('tr');
    });

    test('it renders one HeaderRow when it is supplied', () => {
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

    test('it formats columns that are passed in as a React.Fragment', () => {
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

    test('when the "sortable" prop is passed to a column, an icon is rendered', () => {
      renderTable({
        table: {
          columns: [
            <TableHeader key="name" label="Name" sortBy={() => 'name'} />,
            'Age',
            'Color',
            'Location',
          ],
        },
      });

      const sortButton = screen.getAllByRole('button', { name: 'sort' });
      expect(sortButton.length).toBe(1);
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
    describe('when the "selectable" prop is set', () => {
      test('it renders a Checkbox in the HeaderRow', () => {
        renderTable({ table: { selectable: true } });
        const tableHeaderRow = Array.from(
          screen.getAllByRole('row')[0].children,
        );
        const firstColumn = tableHeaderRow[0];
        expect(firstColumn.innerHTML).toContain('type="checkbox"');
      });

      describe('and the HeaderRow contains a TableHeader with a colSpan', () => {
        test('it does not render a Checkbox in the HeaderRow', () => {
          renderTable({
            table: {
              selectable: true,
              columns: [
                <HeaderRow key="header-row">
                  <TableHeader key="name" label="name" />,
                  <TableHeader key="age" label="age" />,
                  <TableHeader key="color" label="color" colSpan={2} />,
                </HeaderRow>,
              ],
            },
          });

          const headerRow = screen.getByTestId('leafygreen-ui-header-row');
          expect(headerRow.innerHTML).not.toContain('checkbox');
        });
      });
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
      const chevrons = screen.getAllByRole('button', { name: 'chevron' });
      expect(chevrons.length).toBe(4);
    });

    test('the expandable icon reveals a hidden row when clicked', () => {
      renderTable();

      const chevron = screen.getAllByRole('button', { name: 'chevron' })[0];
      fireEvent.click(chevron);

      const revealedRow = screen
        .getAllByRole('row')
        .filter(row => row.getAttribute('aria-expanded') === 'true');

      expect(revealedRow.length).toBe(1);
    });
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
