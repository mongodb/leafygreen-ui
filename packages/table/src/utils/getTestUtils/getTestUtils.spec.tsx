/* eslint-disable no-console */
import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { render } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';
import { Cell, HeaderCell } from '../../Cell';
import ExpandedContent from '../../ExpandedContent';
import { HeaderRow, Row } from '../../Row';
import Table from '../../Table';
import TableBody from '../../TableBody';
import TableHead from '../../TableHead';
import {
  LeafyGreenTableCell,
  LeafyGreenTableRow,
} from '../../useLeafyGreenTable';
import { Person } from '../makeData.testutils';
import {
  TestTableWithHookProps,
  useTestHookCall,
} from '../testHookCalls.testutils';

import { getTestUtils } from './getTestUtils';

function TableWithHook(props: TestTableWithHookProps) {
  // @ts-ignore
  const { ['data-lgid']: dataLgId, ...rest } = props;
  const { containerRef, table, rowSelection } = useTestHookCall({
    rowProps: {
      // eslint-disable-next-line react/display-name
      renderExpandedContent: (_: LeafyGreenTableRow<Person>) => {
        return <>Expandable content test</>;
      },
    },
    ...rest,
  });
  const { rows } = table.getRowModel();
  return (
    <>
      <div data-testid="row-selection-value">
        {JSON.stringify(rowSelection)}
      </div>
      <Table table={table} ref={containerRef} data-lgid={dataLgId}>
        <TableHead>
          {table.getHeaderGroups().map(headerGroup => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <HeaderCell key={header.id} header={header}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </HeaderCell>
                );
              })}
            </HeaderRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row: LeafyGreenTableRow<Person>) => {
            return (
              <Row key={row.id} row={row}>
                {row
                  .getVisibleCells()
                  .map((cell: LeafyGreenTableCell<Person>) => {
                    return (
                      <Cell data-cellid={cell.id} key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </Cell>
                    );
                  })}
                {row.original.renderExpandedContent && (
                  <ExpandedContent row={row} />
                )}
              </Row>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

describe('packages/table', () => {
  describe('getTestUtils', () => {
    test('throws error if LG Table is not found', () => {
      render(<TableWithHook data-lgid="hello" />);

      try {
        const _utils = getTestUtils();
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty(
          'message',
          expect.stringMatching(
            /Unable to find an element by: \[data-lgid="lg-table"\]/,
          ),
        );
      }
    });

    describe('single table', () => {
      describe('getTable', () => {
        test('is in the document', () => {
          render(<TableWithHook />);
          const { getTable } = getTestUtils();
          expect(getTable()).toBeInTheDocument();
        });
      });

      describe('getAllHeaders', () => {
        test('returns all the headers', () => {
          render(<TableWithHook />);
          const { getAllHeaders } = getTestUtils();
          expect(getAllHeaders().length).toEqual(6);
        });
      });

      describe('getHeaderByIndex', () => {
        test('returns the correct header', () => {
          render(<TableWithHook />);
          const { getHeaderByIndex } = getTestUtils();
          expect(getHeaderByIndex(0)?.getElement()).toHaveTextContent('ID');
        });

        describe('sort icon', () => {
          test('returns the sort icon', () => {
            render(<TableWithHook columnProps={{ enableSorting: true }} />);
            const { getHeaderByIndex } = getTestUtils();
            expect(getHeaderByIndex(0)?.getSortIcon()).toBeInTheDocument();
          });
          test('returns null', () => {
            render(<TableWithHook />);
            const { getHeaderByIndex } = getTestUtils();
            expect(getHeaderByIndex(0)?.getSortIcon()).not.toBeInTheDocument();
          });
        });
      });

      describe('getSelectAllCheckbox', () => {
        test('returns the select all checkbox', () => {
          render(<TableWithHook hookProps={{ hasSelectableRows: true }} />);
          const { getSelectAllCheckbox } = getTestUtils();
          expect(getSelectAllCheckbox()).toBeInTheDocument();
        });

        test('returns null', () => {
          render(<TableWithHook />);
          const { getSelectAllCheckbox } = getTestUtils();
          expect(getSelectAllCheckbox()).not.toBeInTheDocument();
        });
      });

      describe('getAllVisibleRows', () => {
        test('returns all the visible cells', () => {
          render(<TableWithHook />);
          const { getAllVisibleRows } = getTestUtils();
          expect(getAllVisibleRows().length).toEqual(3);
        });
      });

      describe('getRowByIndex', () => {
        describe('getElement', () => {
          test('returns the element', () => {
            render(<TableWithHook />);
            const { getRowByIndex } = getTestUtils();
            expect(getRowByIndex(0)?.getElement()).toBeInTheDocument();
          });
        });

        describe('getAllCells', () => {
          test('returns all the cells in the row', () => {
            render(<TableWithHook />);
            const { getRowByIndex } = getTestUtils();
            expect(getRowByIndex(0)?.getAllCells().length).toEqual(6);
          });
        });

        describe('getCheckbox', () => {
          test('returns the checkbox toggle', () => {
            render(<TableWithHook hookProps={{ hasSelectableRows: true }} />);
            const { getRowByIndex } = getTestUtils();
            expect(getRowByIndex(0)?.getCheckbox()).toBeInTheDocument();
          });

          test('returns null', () => {
            render(<TableWithHook />);
            const { getRowByIndex } = getTestUtils();
            expect(getRowByIndex(0)?.getCheckbox()).not.toBeInTheDocument();
          });
        });

        describe('getExpandButton', () => {
          test('returns the expand toggle', () => {
            render(<TableWithHook />);
            const { getRowByIndex } = getTestUtils();
            expect(getRowByIndex(0)?.getExpandButton()).toBeInTheDocument();
          });

          test('returns null', () => {
            render(<TableWithHook />);
            const { getRowByIndex } = getTestUtils();
            expect(getRowByIndex(1)?.getExpandButton()).not.toBeInTheDocument();
          });
        });
      });
    });
  });
});
