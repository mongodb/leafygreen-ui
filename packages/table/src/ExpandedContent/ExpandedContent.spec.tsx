import React, { Fragment } from 'react';
import { flexRender } from '@tanstack/react-table';
import { fireEvent, render } from '@testing-library/react';

import { Cell } from '../Cell';
import { Row } from '../Row';
import TableBody from '../TableBody';
import { LeafyGreenTableRow } from '../useLeafyGreenTable';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import { useTestHookCall } from '../utils/testHookCalls.testutils';
import { Table } from '..';

import ExpandedContent from './ExpandedContent';

const RowWithExpandableContent = args => {
  const { table } = useTestHookCall({
    rowProps: {
      // eslint-disable-next-line react/display-name
      renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
        return <>Expandable content test</>;
      },
    },
  });

  return (
    <div>
      <Table table={table} {...args}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, i) => {
                return <th key={header.id}>TH {i}</th>;
              })}
            </tr>
          ))}
        </thead>
        <TableBody>
          {table.getRowModel().rows.map((row: LeafyGreenTableRow<Person>) => {
            return (
              <Fragment key={row.id}>
                <Row row={row}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <Cell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                </Row>
                {row.original.renderExpandedContent && row.getIsExpanded() && (
                  <ExpandedContent row={row} />
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

describe('packages/table/Row/ExpandableContent', () => {
  test('renders the correct number of cell children', () => {
    render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getAllCells()).toHaveLength(6);
  });
  test('rows with expandable content render expand icon button', async () => {
    render(<RowWithExpandableContent />);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getExpandButton()).toHaveAttribute(
      'aria-label',
      'Expand row',
    );
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('rows with expandable content render rows as tbody elements', async () => {
    const { getAllByRole } = render(<RowWithExpandableContent />);
    expect(getAllByRole('rowgroup').length).toBe(4); // 1 for thead, 3 for tbody
  });
  // eslint-disable-next-line jest/no-disabled-tests
  test.skip('clicking expand icon button renders collapse button and expanded content', async () => {
    const { getByLabelText, queryByText } = render(
      <RowWithExpandableContent />,
    );
    const expandIconButton = getByLabelText('Expand row');
    expect(queryByText('Expandable content test')).not.toBeInTheDocument();
    fireEvent.click(expandIconButton);
    const collapseIconButton = getByLabelText('collapse row');
    expect(collapseIconButton).toBeInTheDocument();
    expect(queryByText('Expandable content test')).toBeInTheDocument();
  });

  test('Accepts a ref', () => {
    const ref = React.createRef<HTMLTableRowElement>();

    const rowObj = {
      id: '1',
      getVisibleCells: () => ({
        length: 1,
      }),
      original: {
        renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
          return <>Hello</>;
        },
      },
    };
    render(
      // @ts-expect-error - dummy row data is missing properties
      <ExpandedContent row={rowObj} ref={ref}>
        Hello
      </ExpandedContent>,
    );

    expect(ref.current).toBeInTheDocument();
    expect(ref.current!.textContent).toBe('Hello');
  });
});
