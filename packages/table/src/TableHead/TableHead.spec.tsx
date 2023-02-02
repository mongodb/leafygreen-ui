import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import TableHead, { TableHeadProps } from ".";

const renderTableHeadScrollTest = (props: TableHeadProps = {}) => {
  return render(
    <div
      style={{ height: '500px', overflowY: 'scroll', position: 'relative' }}
    >
      <table>
        <TableHead
          {...props}
        >
          <tr>
            <td>thead test</td>
          </tr>
        </TableHead>
        <tbody>
          <tr>
            <td>
              <div style={{ height: '5000px' }}>
                test div
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

describe('packages/table/TableHead', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <table>
          <TableHead />
        </table>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('isSticky prop', () => {
    // this is not supported by jsdom. need cypress or puppeteer
    test.skip('non-sticky header is not visible after long scroll', async () => {
      const { container, getByText } = renderTableHeadScrollTest();
      let onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 4000 } });
      expect(onScrollCallback).toHaveBeenCalledTimes(1);

      let theadText = getByText('thead test')
      expect(theadText).not.toBeVisible();
    });

    // this is not supported by jsdom. need cypress or puppeteer
    test.skip('sticky header is visible after long scroll', async () => {
      const { container, getByText } = renderTableHeadScrollTest({ isSticky: true });
      let onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 4000 } });
      expect(onScrollCallback).toHaveBeenCalledTimes(1);

      let theadText = getByText('thead test')
      expect(theadText).toBeVisible();
    });
  });
});