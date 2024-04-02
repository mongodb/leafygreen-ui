import React, { useState } from 'react';
import { getAllByRole } from '@testing-library/dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Cell } from '../Cell';
import { HeaderRow, Row } from '../Row';
import { TableHeader } from '../TableV10';
import { Table } from '../TableV10';
import { defaultData } from '../TableV10/fixtures.testutils';

import V11Adapter, { V11AdapterProps } from '.';

const data = defaultData.slice(0, 8);

function BasicWithAdapter(props: V11AdapterProps<unknown>) {
  return (
    <V11Adapter {...props}>
      <Table
        data={data}
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
  );
}

const SortableColumns = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData}
        columns={
          <HeaderRow>
            <TableHeader
              key="name"
              label="Name"
              dataType="string"
              compareFn={(a: any, b: any, dir) => {
                const reverse = (str: string) =>
                  str.split('').reverse().join('');

                // Pin 'Yvonne' to the top
                if (b.name === 'Yvonne') return 1;
                else if (a.name === 'Yvonne') return -1;

                // Sort by reversed name
                if (dir == 'desc') {
                  return reverse(b.name) >= reverse(a.name) ? 1 : -1;
                }

                return reverse(b.name) >= reverse(a.name) ? -1 : 1;
              }}
            />
            <TableHeader
              key="age"
              label="Age"
              dataType="number"
              sortBy={(datum: any) => datum.age.toString()}
            />
            <TableHeader
              key="color"
              label="Color"
              dataType="string"
              sortBy={(datum: any) => datum.color}
            />
            <TableHeader
              key="location"
              label="Location"
              handleSort={dir => {
                // eslint-disable-next-line no-console
                console.log(`Sorting location ${dir}`);
              }}
            />
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
  );
};

const NestedRows = () => {
  return (
    <V11Adapter>
      <Table
        data={defaultData.slice(0, 8)}
        columns={
          <HeaderRow data-testid="test-header-row">
            <TableHeader
              key="name"
              label="Name"
              dataType="string"
              data-testid="test-header-cell"
            />
            <TableHeader key="age" label="Age" dataType="number" />
            <TableHeader key="color" label="Color" dataType="string" />
            <TableHeader key="location" label="Location" />
          </HeaderRow>
        }
        data-testid="test-table"
      >
        {({ datum }: any) => (
          <Row data-testid={datum.name === 'Alice' ? 'test-row' : undefined}>
            <Cell
              data-testid={datum.name === 'Alice' ? 'test-cell' : undefined}
            >
              {datum.name}
            </Cell>
            <Cell>{datum.age}</Cell>
            <Cell>{datum.color}</Cell>
            <Cell>{datum.location}</Cell>
            {datum.name !== 'Donna' && (
              <Row
                data-testid={
                  datum.name === 'Alice' ? 'test-nested-row' : undefined
                }
              >
                <Cell
                  data-testid={
                    datum.name === 'Alice' ? 'test-nested-cell' : undefined
                  }
                >
                  expanded name: {datum.name}
                </Cell>
                <Cell>expanded age: {datum.age}</Cell>
                <Cell>expanded color: {datum.color}</Cell>
                <Cell>expanded location: {datum.location}</Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

const ExpandableContent = () => {
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
            {datum.name === 'Donna' && (
              <Row>
                <Cell colSpan={4}>
                  Nulla vitae elit libero, a pharetra augue. Sed posuere
                  consectetur est at lobortis. Integer posuere erat a ante
                  venenatis dapibus posuere velit aliquet. Maecenas faucibus
                  mollis interdum. Nullam id dolor id nibh ultricies vehicula ut
                  id elit. Duis mollis, est non commodo luctus, nisi erat
                  porttitor ligula, eget lacinia odio sem nec elit. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Donec id
                  elit non mi porta gravida at eget metus. Donec id elit non mi
                  porta gravida at eget metus. Aenean lacinia bibendum nulla sed
                  consectetur. Vestibulum id ligula porta felis euismod semper.
                  Maecenas sed diam eget risus varius blandit sit amet non
                  magna. Etiam porta sem malesuada magna mollis euismod. Donec
                  ullamcorper nulla non metus auctor fringilla. Donec id elit
                  non mi porta gravida at eget metus.
                </Cell>
              </Row>
            )}
          </Row>
        )}
      </Table>
    </V11Adapter>
  );
};

function StatefulDataTest(props: V11AdapterProps<unknown>) {
  const [data, setData] = useState(defaultData.slice(0, 3));
  return (
    <>
      <button
        data-testid="refresh-data"
        onClick={() =>
          setData([
            ...defaultData.slice(0, 3),
            {
              name: 'test name',
              age: 0,
              color: 'test color',
              location: 'test location',
              rand: 0,
            },
          ])
        }
      >
        refresh data
      </button>
      <V11Adapter {...props}>
        <Table
          data={data}
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
    </>
  );
}

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe('packages/table/Table', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(<BasicWithAdapter />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('stateful data change', () => {
    test('v11 adapter responds to stateful data change on v10 table', async () => {
      const { getByTestId, queryByText } = render(<StatefulDataTest />);
      expect(queryByText('test')).not.toBeInTheDocument();
      const refreshButton = getByTestId('refresh-data');
      fireEvent.click(refreshButton);
      expect(queryByText('test name')).toBeInTheDocument();
      expect(queryByText('test color')).toBeInTheDocument();
      expect(queryByText('test location')).toBeInTheDocument();
    });
  });

  describe('selectable rows', () => {
    test('renders checkboxes', async () => {
      const { getAllByRole } = render(<BasicWithAdapter hasSelectableRows />);
      // +1 for the header row checkbox
      expect(getAllByRole('checkbox').length).toBe(data.length + 1);
    });

    test('clicking checkbox marks it as checked', async () => {
      const { getAllByRole } = render(<BasicWithAdapter hasSelectableRows />);
      const firstCheckbox = getAllByRole('checkbox')[1];
      fireEvent.click(firstCheckbox);
      expect(firstCheckbox.getAttribute('aria-checked')).toBe('true');
    });

    test('clicking the header checkbox updates all checkboxes', async () => {
      const { getAllByRole } = render(<BasicWithAdapter hasSelectableRows />);
      const allCheckboxes = getAllByRole('checkbox');
      const headerCheckbox = allCheckboxes[0];
      fireEvent.click(headerCheckbox);
      allCheckboxes.forEach(checkbox => {
        expect(checkbox.getAttribute('aria-checked')).toBe('true');
      });
    });
  });

  describe('sortable rows', () => {
    test('renders sort icon', async () => {
      const { getAllByTestId, queryByLabelText, getAllByLabelText } = render(
        <SortableColumns />,
      );
      expect(getAllByTestId('lg-table-sort-icon-button').length).toBe(4);
      expect(getAllByLabelText('Unsorted Icon').length).toBe(4);
      expect(queryByLabelText('Sort Descending Icon')).not.toBeInTheDocument();
      expect(queryByLabelText('Sort Ascending Icon')).not.toBeInTheDocument();
    });

    test('clicking sort icon toggles icon', async () => {
      const { getAllByTestId, queryByLabelText, getAllByLabelText } = render(
        <SortableColumns />,
      );
      expect(getAllByTestId('lg-table-sort-icon-button').length).toBe(4);
      expect(getAllByLabelText('Unsorted Icon').length).toBe(4);
      expect(queryByLabelText('Sort Descending Icon')).not.toBeInTheDocument();
      expect(queryByLabelText('Sort Ascending Icon')).not.toBeInTheDocument();
      const sortIconButton = getAllByLabelText('Unsorted Icon')[0];
      fireEvent.click(sortIconButton);
      expect(queryByLabelText('Sort Descending Icon')).toBeInTheDocument();
      expect(queryByLabelText('Sort Ascending Icon')).not.toBeInTheDocument();
    });

    test('clicking sort icon renders correct value at the top', async () => {
      const { getByLabelText, getAllByLabelText } = render(<SortableColumns />);
      const sortIconButton = getAllByLabelText('Unsorted Icon')[0];
      fireEvent.click(sortIconButton);
      expect(getByLabelText('Sort Descending Icon')).toBeInTheDocument();
      const tableCells = screen.getAllByRole('cell');
      const firstCell = tableCells[0];
      expect(firstCell).toHaveTextContent('Lilly');
    });

    test('clicking sort icon twice render correct value at the top', async () => {
      const { getByLabelText, getAllByLabelText } = render(<SortableColumns />);
      const sortIconButton = getAllByLabelText('Unsorted Icon')[0];
      fireEvent.click(sortIconButton);
      const descSortIconButton = getByLabelText('Sort Descending Icon');
      fireEvent.click(descSortIconButton);
      expect(getByLabelText('Sort Ascending Icon')).toBeInTheDocument();
      const tableCells = screen.getAllByRole('cell');
      const firstCell = tableCells[0];
      expect(firstCell).toHaveTextContent('Yvonne');
    });

    test('clicking sort icon thrice renders the initial value at the top', async () => {
      const { getAllByLabelText, getByLabelText } = render(<SortableColumns />);
      const sortIconButton = getAllByLabelText('Unsorted Icon')[0];
      fireEvent.click(sortIconButton);
      const descSortIconButton = getByLabelText('Sort Descending Icon');
      fireEvent.click(descSortIconButton);
      const ascSortIconButton = getByLabelText('Sort Ascending Icon');
      fireEvent.click(ascSortIconButton);
      const tableCells = screen.getAllByRole('cell');
      const firstCell = tableCells[0];
      expect(firstCell).toHaveTextContent('Alice');
    });
  });

  describe('nested rows', () => {
    test('renders the correct number of children', () => {
      const { getAllByRole: getAllByRoleLocal } = render(<NestedRows />);
      const firstRow = getAllByRoleLocal('row')[1];
      expect(getAllByRole(firstRow, 'cell').length).toBe(4);
    });
    test('rows with nested rows render expand icon button', async () => {
      const { getAllByLabelText } = render(<NestedRows />);
      const expandIconButtons = getAllByLabelText('Expand row');
      expect(expandIconButtons.length).toBe(7); // Row with 'Donna' is not expandable
    });
    test('having a row with nested rows render all rows as tbody elements', async () => {
      const { getAllByRole } = render(<NestedRows />);
      expect(getAllByRole('rowgroup').length).toBe(9); // 1 for thead, 9 for tbody
    });
    test('all data- attributes are passed to all elements', async () => {
      const { getByTestId } = render(<NestedRows />);
      expect(getByTestId('test-table')).toBeInTheDocument();
      expect(getByTestId('test-header-row')).toBeInTheDocument();
      expect(getByTestId('test-header-cell')).toBeInTheDocument();
      expect(getByTestId('test-row')).toBeInTheDocument();
      expect(getByTestId('test-cell')).toBeInTheDocument();
      expect(getByTestId('test-nested-row')).toBeInTheDocument();
      expect(getByTestId('test-nested-cell')).toBeInTheDocument();
    });
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('clicking expand icon button renders collapse button and nested row content', async () => {
      const { getByLabelText, getAllByLabelText, queryByText } = render(
        <NestedRows />,
      );
      const expandIconButton = getAllByLabelText('Expand row')[0];
      // the line below is not reliable as the row is expanded - the height is just 0
      expect(queryByText('expanded')).not.toBeVisible();
      fireEvent.click(expandIconButton);
      const collapseIconButton = getByLabelText('Collapse row');
      expect(collapseIconButton).toBeInTheDocument();
      // the line below is not reliable as the row is expanded - the height is just 0
      expect(queryByText('expanded')).toBeVisible();
    });
  });

  describe('expandable content', () => {
    test('renders the correct number of cell children', () => {
      const { getAllByRole: getAllByRoleLocal } = render(<ExpandableContent />);
      const firstRow = getAllByRoleLocal('row')[1];
      expect(getAllByRole(firstRow, 'cell').length).toBe(4);
    });
    test('rows with expandable content render expand icon button', async () => {
      const { getAllByLabelText } = render(<ExpandableContent />);
      const expandIconButtons = getAllByLabelText('Expand row');
      expect(expandIconButtons.length).toBe(1); // Row with 'Donna' is the only expandable
    });
    test('rows with expandable content render rows as tbody elements', async () => {
      const { getAllByRole } = render(<ExpandableContent />);
      expect(getAllByRole('rowgroup').length).toBe(9); // 1 for thead, 9 for tbody
    });
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('clicking expand icon button renders collapse button and expanded content', async () => {
      const { getByLabelText, queryByText } = render(<ExpandableContent />);
      const expandIconButton = getByLabelText('Expand row');
      // the line below is not reliable as the row is expanded - the height is just 0
      expect(queryByText('Expandable content test')).not.toBeInTheDocument();
      fireEvent.click(expandIconButton);
      const collapseIconButton = getByLabelText('collapse row');
      expect(collapseIconButton).toBeInTheDocument();
      // the line below is not reliable as the row is expanded - the height is just 0
      expect(queryByText('Expandable content test')).toBeInTheDocument();
    });
  });
});
