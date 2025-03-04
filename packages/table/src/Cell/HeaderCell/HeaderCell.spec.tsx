import React from 'react';
import styled from '@emotion/styled';
import { ColumnDef, Header } from '@tanstack/react-table';
import {
  queryByRole as globalQueryByRole,
  render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { renderHook } from '@leafygreen-ui/testing-lib';

import useLeafyGreenTable, { LGTableDataType } from '../../useLeafyGreenTable';
import { Person } from '../../utils/makeData.testutils';

import HeaderCell, { HeaderCellProps } from '.';

function renderSimpleHeaderCell(props: HeaderCellProps<unknown>) {
  return render(
    <table>
      <thead>
        <tr>
          <HeaderCell {...props} data-testid="lg-header-cell-test">
            test header cell
          </HeaderCell>
          <th>th 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>td 1</td>
          <td>td 2</td>
        </tr>
      </tbody>
    </table>,
  );
}

const headerCellTestColumns: Array<ColumnDef<Partial<Person>>> = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    enableSorting: true,
  },
  {
    accessorKey: 'age',
    header: 'Age',
    enableSorting: true,
  },
];

const headerCellTestData: Array<Partial<Person>> = [
  {
    firstName: 'Aaron',
    age: 99,
  },
  {
    firstName: 'Zara',
    age: 21,
  },
];

const TestSortableHeaderCell = () => {
  const table = useLeafyGreenTable({
    columns: headerCellTestColumns,
    data: headerCellTestData,
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            {table.getHeaderGroups()[0].headers.map(header => (
              <HeaderCell key={header.id} header={header} />
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>td 1</td>
            <td>td 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/** Returns the `header` data for a given column def */
const useMockTestHeaderData = (
  columnDef: ColumnDef<any>,
): Header<LGTableDataType<any>, unknown> => {
  const table = useLeafyGreenTable({
    data: [],
    columns: [columnDef],
  });

  return table.getFlatHeaders()[0];
};

describe('packages/table/HeaderCell', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderSimpleHeaderCell({});
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('sort prop', () => {
    test('sort prop renders sort icon button', async () => {
      const { getAllByTestId } = render(<TestSortableHeaderCell />);
      const sortIconButtons = getAllByTestId('lg-table-sort-icon-button');
      expect(sortIconButtons[0]).toBeInTheDocument();
      expect(sortIconButtons[1]).toBeInTheDocument();
    });

    // Sorting behaves differently for string and numeric data
    describe.each([
      {
        columnIndex: 0,
        dataType: 'string',
        initialSort: 'Ascending',
        secondSort: 'Descending',
      },
      {
        columnIndex: 1,
        dataType: 'number',
        initialSort: 'Descending',
        secondSort: 'Ascending',
      },
    ])('for $dataType data', ({ columnIndex, initialSort, secondSort }) => {
      const iconButtonTestId = 'lg-table-sort-icon-button';

      test('initial state of sort icon is unsorted', async () => {
        const { queryAllByLabelText } = render(<TestSortableHeaderCell />);
        const unsortedIcon = queryAllByLabelText('Unsorted Icon')[columnIndex];
        expect(unsortedIcon).toBeInTheDocument();
      });

      test(`clicking sort icon switches to sort ${initialSort}`, async () => {
        const { getAllByTestId } = render(<TestSortableHeaderCell />);
        const sortIconButton = getAllByTestId(iconButtonTestId)[columnIndex];
        userEvent.click(sortIconButton);
        const sortIcon = globalQueryByRole(sortIconButton, 'img');
        expect(sortIcon).toHaveAttribute(
          'aria-label',
          `Sort ${initialSort} Icon`,
        );
      });

      test(`clicking sort icon twice switches to sort ${secondSort}`, async () => {
        const { getAllByTestId } = render(<TestSortableHeaderCell />);
        const sortIconButton = getAllByTestId(iconButtonTestId)[columnIndex];
        userEvent.click(sortIconButton);
        userEvent.click(sortIconButton);
        const sortIcon = globalQueryByRole(sortIconButton, 'img');
        expect(sortIcon).toHaveAttribute(
          'aria-label',
          `Sort ${secondSort} Icon`,
        );
      });

      test(`clicking sort icon three times reverts to unsorted icon`, async () => {
        const { getAllByTestId } = render(<TestSortableHeaderCell />);
        const sortIconButton = getAllByTestId(iconButtonTestId)[columnIndex];
        userEvent.click(sortIconButton);
        userEvent.click(sortIconButton);
        userEvent.click(sortIconButton);
        const sortIcon = globalQueryByRole(sortIconButton, 'img');
        expect(sortIcon).toHaveAttribute('aria-label', 'Unsorted Icon');
      });
    });
  });

  test('setting size in columnDef sets HeaderCell width', async () => {
    const { result } = renderHook(() =>
      useMockTestHeaderData({
        accessorKey: 'id',
        size: 700,
      }),
    );

    const mockHeader = result.current;

    const { getByTestId } = render(
      <HeaderCell data-testid="lg-header-cell-test" header={mockHeader} />,
    );
    const headerCell = getByTestId('lg-header-cell-test');
    expect(getComputedStyle(headerCell).width).toBe('700px');
  });

  test('Accepts a ref', () => {
    const ref = React.createRef<HTMLTableCellElement>();
    render(<HeaderCell ref={ref}>Hello</HeaderCell>);

    expect(ref.current).toBeInTheDocument();
    expect(ref.current!.textContent).toBe('Hello');
  });

  describe('styled', () => {
    test('works with `styled`', () => {
      const StyledHeaderCell = styled(HeaderCell)`
        color: #69ffc6;
      `;

      const { getByTestId } = render(
        <StyledHeaderCell data-testid="styled">Some text</StyledHeaderCell>,
      );

      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });

    test('works with `styled` props', () => {
      // We need to define the additional props that styled should expect
      interface StyledProps {
        color?: string;
      }
      const StyledHeaderCell = styled(HeaderCell)<StyledProps>`
        color: ${props => props.color};
      `;

      const { getByTestId } = render(
        <StyledHeaderCell data-testid="styled" color="#69ffc6">
          Some text
        </StyledHeaderCell>,
      );
      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    const { result } = renderHook(() =>
      useMockTestHeaderData({
        accessorKey: 'id',
        size: 700,
      }),
    );

    const mockHeader = result.current;
    const ref = React.createRef<HTMLTableCellElement>();

    <>
      <HeaderCell />
      <HeaderCell align="center" header={mockHeader} />
      <HeaderCell ref={ref} />
    </>;
  });
});
