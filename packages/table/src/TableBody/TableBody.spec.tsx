import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import { useTestHookCall } from '../utils/testHookCalls';

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

  describe('rendering with renderingExpandableRows prop', () => {
    test('renders as tbody when undefined', async () => {
      const { container } = render(
        <table>
          <TableBody />
        </table>,
      );
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });
    test('renders as tbody when false', async () => {
      const { container } = render(
        <table>
          <TableBody renderingExpandableRows={false} />
        </table>,
      );
      expect(container.querySelector('tbody')).toBeInTheDocument();
    });
    test('renders as tbody when true', async () => {
      const { container } = render(
        <table>
          <TableBody renderingExpandableRows={true} />
        </table>,
      );
      // would be better to check explicitly if it's a fragment
      expect(container.querySelector('tbody')).not.toBeInTheDocument();
    });
  });

  describe('rendering with virtualized scrolling', () => {
    test('renders padding top and bottom rows', async () => {
      const VirtualizedScrollingTest = () => {
        const { containerRef, table } = useTestHookCall({
          hookProps: {
            useVirtualScrolling: true,
          },
        });
        return (
          <div ref={containerRef}>
            <table>
              <TableBody table={table}>
                <tr>
                  <td>
                    <div style={{ height: '400px' }} />
                  </td>
                </tr>
              </TableBody>
            </table>
          </div>
        );
      };

      const { container, getAllByRole } = render(<VirtualizedScrollingTest />);
      const onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 100 } });
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
