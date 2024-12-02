import React from 'react';
import styled from '@emotion/styled';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { renderHook } from '@leafygreen-ui/testing-lib';

import { LGIDS } from '../constants';
import { getTestUtils } from '../utils/getTestUtils/getTestUtils';
import { Person } from '../utils/makeData.testutils';
import { useMockTestRowData } from '../utils/testHookCalls.testutils';

import { Row, RowProps } from '.';

const defaultProps: RowProps<Person> = {};

function renderRow(props: RowProps<Person>) {
  return render(
    <table data-lgid={LGIDS.root}>
      <tbody>
        <Row {...props} data-testid="lg-test-row-1">
          <td data-lgid={LGIDS.cell} />
          <td data-lgid={LGIDS.cell} />
          <td data-lgid={LGIDS.cell} />
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
    renderRow(defaultProps);
    const { getRowByIndex } = getTestUtils();
    const row = getRowByIndex(0)?.getElement();
    expect(row?.tagName.toLowerCase()).toBe('tr');
  });

  test('renders the correct number of children', () => {
    renderRow(defaultProps);
    const { getRowByIndex } = getTestUtils();
    expect(getRowByIndex(0)?.getAllCells()).toHaveLength(3);
  });

  describe('disabled prop', () => {
    test('it renders a row as disabled when the prop is set', () => {
      renderRow({ ...defaultProps, disabled: true });
      const { getRowByIndex } = getTestUtils();
      expect(getRowByIndex(0)?.isDisabled).toBeTruthy();
    });

    test(`onClick is not called when the row is disabled`, () => {
      const onClick = jest.fn();
      renderRow({
        ...defaultProps,
        disabled: true,
        onClick,
      });
      const { getRowByIndex } = getTestUtils();
      const row = getRowByIndex(0)?.getElement();
      expect(() => userEvent.click(row!)).toThrow();
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderRow(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('onClick prop applies correct styles and tabIndex', () => {
    test('onClick prop is called correctly on click', async () => {
      const onClick = jest.fn();
      renderRow({ ...defaultProps, onClick });
      const { getRowByIndex } = getTestUtils();
      const firstRow = getRowByIndex(0)?.getElement();
      fireEvent.click(firstRow!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('clickable rows are tabbable', async () => {
      const onClick = jest.fn();
      renderRow({ ...defaultProps, onClick });
      const { getRowByIndex } = getTestUtils();
      const firstRow = getRowByIndex(0)?.getElement();
      firstRow!.focus();
      userEvent.tab();
      const secondRow = getRowByIndex(1)?.getElement();
      expect(secondRow).toHaveFocus();
    });
  });

  test('accepts a ref', () => {
    const ref = React.createRef<HTMLTableRowElement>();
    render(<Row ref={ref}>Hello</Row>);

    expect(ref.current).toBeInTheDocument();
    expect(ref.current!.textContent).toBe('Hello');
  });

  describe('styled', () => {
    test('works with `styled`', () => {
      const { result } = renderHook(() => useMockTestRowData());
      const mockRow = result.current.firstRow;

      const StyledRow = styled(Row)`
        color: #69ffc6;
      ` as typeof Row;

      const { getByTestId } = render(
        <StyledRow row={mockRow} data-testid="styled" />,
      );

      expect(getByTestId('styled')).toBeInTheDocument();
      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });

    test('works with `styled` props', () => {
      // We need to define the additional props that styled should expect
      interface StyledProps {
        color?: string;
      }
      const { result } = renderHook(() => useMockTestRowData());
      const mockRow = result.current.firstRow;

      const StyledRow = styled(Row)<StyledProps>`
        color: ${props => props.color};
      ` as typeof Row;

      const { getByTestId } = render(
        <StyledRow data-testid="styled" row={mockRow} color="#69ffc6" />,
      );
      expect(getByTestId('styled')).toBeInTheDocument();
      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    const ref = React.createRef<HTMLTableRowElement>();

    <>
      <Row />
      <Row ref={ref} disabled />
    </>;
  });
});
