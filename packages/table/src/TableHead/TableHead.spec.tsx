import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { axe } from 'jest-axe';

import TableHead, { TableHeadProps } from '.';

const renderTableHeadScrollTest = (props: TableHeadProps = {}) => {
  return render(
    <div style={{ height: '500px', overflowY: 'scroll', position: 'relative' }}>
      <table>
        <TableHead {...props}>
          <tr>
            <td>thead test</td>
          </tr>
        </TableHead>
        <tbody>
          <tr>
            <td>
              <div style={{ height: '5000px' }}>test div</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>,
  );
};

describe('packages/table/TableHead', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <table>
          <TableHead />
        </table>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('isSticky prop', () => {
    // this is not supported by jsdom. need cypress or puppeteer
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('non-sticky header is not visible after long scroll', async () => {
      const { container, getByText } = renderTableHeadScrollTest();
      const onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 4000 } });
      expect(onScrollCallback).toHaveBeenCalledTimes(1);

      const theadText = getByText('thead test');
      expect(theadText).not.toBeVisible();
    });

    // this is not supported by jsdom. need cypress or puppeteer
    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('sticky header is visible after long scroll', async () => {
      const { container, getByText } = renderTableHeadScrollTest({
        isSticky: true,
      });
      const onScrollCallback = jest.fn();
      container.addEventListener('scroll', () => {
        onScrollCallback();
      });
      fireEvent.scroll(container, { target: { scrollY: 4000 } });
      expect(onScrollCallback).toHaveBeenCalledTimes(1);

      const theadText = getByText('thead test');
      expect(theadText).toBeVisible();
    });
  });
});
