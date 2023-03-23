import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { prettyDOM } from '@testing-library/react'

import { useTestHookCall } from '../utils/testHookCalls';

import TableBody from '.';
import Table from '..';

describe('packages/table/TableBody', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <table>
          <TableBody />
        </table>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('renders as Fragment when rendering nested rows', () => {
    test('renders padding top and bottom rows', async () => {
      const NestedRowTest = () => {
        const { containerRef, table } = useTestHookCall({
          rowProps: {
            subRows: [
              {
                id: 4,
                firstName: 'nested row name',
                lastName: 'test',
                age: 40,
                visits: 40,
                status: 'single',
              },
            ],
          },
        });
        return (
          <div ref={containerRef} style={{ height: '10px' }}>
            <Table table={table}>
              <TableBody />
            </Table>
          </div>
        );
      };

      const { container } = render(<NestedRowTest />);
      // would be better to check explicitly if it's a fragment
      expect(container.querySelector('tbody')).not.toBeInTheDocument();

    });
  });

  describe('rendering with virtualized scrolling', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('renders padding top and bottom rows', async () => {
      const VirtualizedScrollingTest = () => {
        const { containerRef, table } = useTestHookCall({
          hookProps: {
            useVirtualScrolling: true,
          },
          rowProps: {
            subRows: [
              {
                id: 4,
                firstName: 'nested row name',
                lastName: 'test',
                age: 40,
                visits: 40,
                status: 'single',
              },
            ],
          },
        });
        return (
          <div ref={containerRef} style={{ height: '10px' }}>
            <Table table={table}>
              <TableBody />
            </Table>
          </div>
        );
      };

      const { container, getAllByRole } = render(<VirtualizedScrollingTest />);
      const onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 20 } });
      expect(onScrollCallback).toHaveBeenCalledTimes(1);
      expect(getAllByRole('row', { hidden: true }).length).toBe(2);
    });
  });

  test.todo(
    'Virtual scrolling padding top enables scroll correctly. Needs to be tested using something like Cypress or Chromatic',
  );
  test.todo(
    'Virtual scrolling padding bottom enables scroll correctly. Needs to be tested using something like Cypress or Chromatic',
  );
});