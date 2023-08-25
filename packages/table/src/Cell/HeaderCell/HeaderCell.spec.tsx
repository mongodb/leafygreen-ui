import React from 'react';
import {
  queryByRole as globalQueryByRole,
  render,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import {
  getTestColumnsProps,
  useTestHookCall,
} from '../../utils/testHookCalls.testutils';

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

const HeaderCellWithHook = (props: getTestColumnsProps) => {
  const { containerRef, table } = useTestHookCall({
    columnProps: props,
  });

  return (
    <div ref={containerRef}>
      <table>
        <thead>
          <tr>
            <HeaderCell
              data-testid="lg-header-cell-test"
              header={table.getHeaderGroups()[0].headers[0]}
            >
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
      </table>
    </div>
  );
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
      const { getByTestId } = render(<HeaderCellWithHook enableSorting />);
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      expect(sortIconButton).toBeInTheDocument();
    });

    test('initial state of sort icon is unsorted', async () => {
      const { queryByLabelText } = render(<HeaderCellWithHook enableSorting />);
      const sortIcon = queryByLabelText('Unsorted Icon');
      expect(sortIcon).toBeInTheDocument();
    });

    test('clicking sort icon switches to sort descending', async () => {
      const { getByTestId } = render(<HeaderCellWithHook enableSorting />);
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      userEvent.click(sortIconButton);
      const sortIcon = globalQueryByRole(sortIconButton, 'img');
      expect(sortIcon).toHaveAttribute('aria-label', 'Sort Descending Icon');
    });

    test('clicking sort icon twice switches to sort ascending', async () => {
      const { getByTestId } = render(<HeaderCellWithHook enableSorting />);
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      userEvent.click(sortIconButton);
      userEvent.click(sortIconButton);
      const sortIcon = globalQueryByRole(sortIconButton, 'img');
      expect(sortIcon).toHaveAttribute('aria-label', 'Sort Ascending Icon');
    });

    test('clicking sort icon three times reverts to unsorted icon', async () => {
      const { getByTestId } = render(<HeaderCellWithHook enableSorting />);
      const sortIconButton = getByTestId('lg-table-sort-icon-button');
      userEvent.click(sortIconButton);
      userEvent.click(sortIconButton);
      userEvent.click(sortIconButton);
      const sortIcon = globalQueryByRole(sortIconButton, 'img');
      expect(sortIcon).toHaveAttribute('aria-label', 'Unsorted Icon');
    });
  });
  describe('width prop', () => {
    test('setting custom size changes HeaderCell width', async () => {
      const { getByTestId } = render(
        <HeaderCellWithHook enableSorting size={700} />,
      );
      const headerCell = getByTestId('lg-header-cell-test');
      expect(getComputedStyle(headerCell).width).toBe('700px');
    });
  });
});
