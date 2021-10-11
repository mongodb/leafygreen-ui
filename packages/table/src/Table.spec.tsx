import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, within, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Table, TableHeader, Row, Cell } from '.';
import { defaultColumns, renderTable } from './testUtils';
import { testTableDataShape } from './fixtures';

const className = 'test-className';

describe('packages/table', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      renderTable();
      const results = await axe(screen.getByRole('table'));
      expect(results).toHaveNoViolations();
    });
  });

  test('by default, it renders unsorted table data, based on "data" prop', () => {
    renderTable();
    const firstRow = screen.getAllByRole('row')[1];
    const alice = within(firstRow).getByText('Alice');
    expect(alice).toBeVisible();
  });

  describe('When the sort button is clicked', () => {
    test('it does not sort if no sortBy or compareFn is provided', () => {
      renderTable({
        table: {
          columns: [
            <TableHeader key="name" label="Name" />,
            <TableHeader key="age" label="Age" />,
            <TableHeader key="color" label="Color" />,
            <TableHeader key="location" label="Location" />,
          ],
        },
      });

      const sortButton = screen.getAllByRole('button')[0];

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');
    });

    test('it renders the data in descending order when the "sortBy" prop is set', () => {
      renderTable({
        table: {
          columns: [
            <TableHeader key="name" label="Name" sortBy="name" />,
            <TableHeader key="age" label="Age" />,
            <TableHeader key="color" label="Color" />,
            <TableHeader key="location" label="Location" />,
          ],
        },
      });

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');

      const sortButton = screen.getAllByRole('button')[0];

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Zara');

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');
    });

    test('it renders the data in descending order when the "compareFn" prop is set', () => {
      renderTable({
        table: {
          columns: [
            <TableHeader
              key="name"
              label="Name"
              compareFn={(
                a: testTableDataShape,
                b: testTableDataShape,
                dir,
              ) => {
                if (dir == 'desc') {
                  return b.name >= a.name ? 1 : -1;
                }

                return b.name >= a.name ? -1 : 1;
              }}
            />,
            <TableHeader key="age" label="Age" />,
            <TableHeader key="color" label="Color" />,
            <TableHeader key="location" label="Location" />,
          ],
        },
      });

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');

      const sortButton = screen.getAllByRole('button')[0];

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Zara');

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');
    });

    test('it pins a row to the top with a `compareFn`', () => {
      renderTable({
        table: {
          columns: [
            <TableHeader
              key="name"
              label="Name"
              compareFn={(
                a: testTableDataShape,
                b: testTableDataShape,
                dir,
              ) => {
                if (b.name === 'Monica') return 1;
                if (a.name === 'Monica') return -1;

                if (dir == 'desc') {
                  return b.name >= a.name ? 1 : -1;
                }

                return b.name >= a.name ? -1 : 1;
              }}
            />,
            <TableHeader key="age" label="Age" />,
            <TableHeader key="color" label="Color" />,
            <TableHeader key="location" label="Location" />,
          ],
        },
      });

      const sortButton = screen.getAllByRole('button')[0];
      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Monica');

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Monica');
    });

    test('it does not sort when `handleSort` is passed in', () => {
      const handleSort = jest.fn();

      renderTable({
        table: {
          columns: [
            <TableHeader key="name" label="Name" handleSort={handleSort} />,
            <TableHeader key="age" label="Age" />,
            <TableHeader key="color" label="Color" />,
            <TableHeader key="location" label="Location" />,
          ],
        },
      });

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');

      const sortButton = screen.getAllByRole('button')[0];

      fireEvent.click(sortButton);

      expect(screen.getAllByRole('row')[1].innerHTML).toContain('Alice');

      expect(handleSort).toHaveBeenCalledTimes(1);
    });
  });

  test('it adds a className to the Tables classlist when one is supplied', () => {
    const { table } = renderTable({ table: { className } });
    expect(table.classList.contains(className)).toBe(true);
  });

  test('when the data changes, the table rerenders', () => {
    const { rerender } = renderTable();
    const firstRow = screen.getAllByRole('row')[1];
    const alice = within(firstRow).getByText('Alice');
    expect(alice).toBeVisible();

    rerender(
      <Table
        data-testid="table"
        data={[
          {
            name: 'Garry',
            age: 100,
            color: 'pink',
            location: 'williamsburg',
          },
        ]}
        columns={defaultColumns}
      >
        {({ datum }) => (
          <Row key={datum.name}>
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

    const newFirstRow = screen.getAllByRole('row')[1];
    const garry = within(newFirstRow).getByText('Garry');
    expect(garry).toBeVisible();
  });

  test('when a data value is 0 it still renders in the table', () => {
    render(
      <Table
        data-testid="table"
        data={[
          {
            name: 'Garry',
            age: 0,
            color: 'pink',
            location: 'williamsburg',
          },
        ]}
        columns={defaultColumns}
      >
        {({ datum }) => (
          <Row key={datum.name}>
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

    const cell0 = screen.getByRole('cell', { name: '0' });
    expect(cell0).toBeInTheDocument();
  });
});
