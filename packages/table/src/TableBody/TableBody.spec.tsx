import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { useTestHookCall } from '../utils/testHookCalls.testutils';
import { Table } from '..';

import TableBody from '.';

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

  describe('TableBody has Polymorphic behavior', () => {
    test('renders as Fragment when rendering nested rows', async () => {
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
    test('renders as tbody by default', async () => {
      const DefaultTest = () => {
        const { containerRef, table } = useTestHookCall({});
        return (
          <div ref={containerRef} style={{ height: '10px' }}>
            <Table table={table}>
              <TableBody />
            </Table>
          </div>
        );
      };

      const { container } = render(<DefaultTest />);
      // would be better to check explicitly if it's a fragment
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });
  });

  /**
   * This is not effectively possible using just Jest and RTL since we'd have to simulate scrolling
   * on a set viewport height. Any tests that use virtual scrolling also triggers warnings from RTL
   * saying tests for server-side rendered markup won't be reliably tested.
   */
  test.todo('Virtual scrolling features');
});
