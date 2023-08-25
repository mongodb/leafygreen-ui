import React from 'react';
import { getAllByRole } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { palette } from '@leafygreen-ui/palette';

import { Person } from '../utils/makeData.testutils';

import { Row, RowProps } from '.';

const defaultProps: RowProps<Person> = {};
const onClick = jest.fn();

function renderRow(props: RowProps<Person>) {
  return render(
    <table>
      <tbody>
        <Row {...props} data-testid="lg-test-row-1">
          <td />
          <td />
          <td />
        </Row>
        <Row {...props} data-testid="lg-test-row-2" />
        <Row {...props} data-testid="lg-test-row-3" />
        <Row {...props} data-testid="lg-test-row-4" />
      </tbody>
    </table>,
  );
}

describe('packages/table/RowWithoutRT', () => {
  test('renders a table row', () => {
    const { getByTestId } = renderRow(defaultProps);
    const row = getByTestId('lg-test-row-1');
    expect(row.tagName.toLowerCase()).toBe('tr');
  });

  test('renders the correct number of children', () => {
    const { getByTestId } = renderRow(defaultProps);
    const row = getByTestId('lg-test-row-1');
    expect(getAllByRole(row, 'cell').length).toBe(3);
  });

  describe('disabled prop', () => {
    test('it renders a row as disabled when the prop is set', () => {
      const { getByTestId } = renderRow({ ...defaultProps, disabled: true });
      const row = getByTestId('lg-test-row-1');
      expect(row.getAttribute('aria-disabled')).toBe('true');
    });

    test.todo(`onClick is not called when the row is disabled`);
    test.todo(
      `childrens' click events are not called when the row is disabled`,
    );
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderRow(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('zebra striping works as expected', () => {
    test('odd rows have no background', async () => {
      const { getByTestId } = renderRow(defaultProps);
      const firstRow = getByTestId('lg-test-row-1');
      expect(firstRow).toHaveStyle(`background-color: none;`);
      const thirdRow = getByTestId('lg-test-row-3');
      expect(thirdRow).toHaveStyle(`background-color: none;`);
    });

    // eslint-disable-next-line jest/no-disabled-tests
    test.skip('even rows have gray backgrounds', async () => {
      const { getByTestId } = renderRow(defaultProps);
      const secondRow = getByTestId('lg-test-row-2');
      expect(secondRow).toHaveStyle(
        `background-color: ${palette.gray.light3};`,
      );
      const fourthRow = getByTestId('lg-test-row-4');
      expect(fourthRow).toHaveStyle(
        `background-color: ${palette.gray.light3};`,
      );
    });
  });

  describe('onClick prop applies correct styles and tabIndex', () => {
    test('onClick prop is called correctly on click', async () => {
      const { getByTestId } = renderRow({ ...defaultProps, onClick });
      const firstRow = getByTestId('lg-test-row-1');
      fireEvent.click(firstRow);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('clickable rows are tabbable', async () => {
      const { getByTestId } = renderRow({ ...defaultProps, onClick });
      const firstRow = getByTestId('lg-test-row-1');
      firstRow.focus();
      userEvent.tab();
      const secondRow = getByTestId('lg-test-row-2');
      expect(secondRow).toHaveFocus();
    });
  });

  test.todo(
    'the Row component passes the correct `cellIndex` value to child cells both with and without the `row` prop.',
  );
});
