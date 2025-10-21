import React from 'react';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { ExpandableGridProps } from './ExpandableGrid.types';
import { ExpandableGrid } from '.';

const generateMockChildren = (numberOfChildren: number) =>
  [...new Array(numberOfChildren)].map((_, i) => (
    <div key={i}>Child {i + 1}</div>
  ));

const renderExpandableGrid = (props?: Partial<ExpandableGridProps>) => {
  return render(
    <ExpandableGrid {...props}>
      {props?.children || generateMockChildren(6)}
    </ExpandableGrid>,
  );
};

describe('packages/feature-walls/ExpandableGrid', () => {
  test('does not have basic accessibility issues', async () => {
    const { container } = renderExpandableGrid();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('renders the correct number of visible children', () => {
    const { getByText } = renderExpandableGrid();
    const childNodes = [...new Array(6)].map(
      (_, i) => getByText(`Child ${i + 1}`).parentElement,
    );

    expect(childNodes[0]).toBeVisible();
    expect(childNodes[1]).toBeVisible();
    expect(childNodes[2]).toBeVisible();

    expect(childNodes[3]).toHaveAttribute('inert');
    expect(childNodes[3]).toHaveAttribute('aria-hidden', 'true');
    expect(childNodes[4]).toHaveAttribute('inert');
    expect(childNodes[4]).toHaveAttribute('aria-hidden', 'true');
    expect(childNodes[5]).toHaveAttribute('inert');
    expect(childNodes[5]).toHaveAttribute('aria-hidden', 'true');
  });

  test('respects `maxColumn` prop', () => {
    const { getByText } = renderExpandableGrid({
      maxColumns: 4,
    });
    const childNodes = [...new Array(6)].map(
      (_, i) => getByText(`Child ${i + 1}`).parentElement,
    );

    expect(childNodes[0]).toBeVisible();
    expect(childNodes[1]).toBeVisible();
    expect(childNodes[2]).toBeVisible();
    expect(childNodes[3]).toBeVisible();

    expect(childNodes[4]).toHaveAttribute('inert');
    expect(childNodes[4]).toHaveAttribute('aria-hidden', 'true');
    expect(childNodes[5]).toHaveAttribute('inert');
    expect(childNodes[5]).toHaveAttribute('aria-hidden', 'true');
    expect(getByText('View 2 more')).toBeInTheDocument();
  });

  describe('expand button', () => {
    test('expands and collapses when the button is clicked', async () => {
      const { getByText, getByRole } = renderExpandableGrid({
        maxColumns: 3,
      });
      const childNodes = [...new Array(6)].map(
        (_, i) => getByText(`Child ${i + 1}`).parentElement,
      );
      const button = getByRole('button');

      expect(childNodes[3]).toHaveAttribute('inert');
      expect(childNodes[3]).toHaveAttribute('aria-hidden', 'true');
      expect(childNodes[4]).toHaveAttribute('inert');
      expect(childNodes[4]).toHaveAttribute('aria-hidden', 'true');
      expect(childNodes[5]).toHaveAttribute('inert');
      expect(childNodes[5]).toHaveAttribute('aria-hidden', 'true');

      expect(button.textContent).toBe('View 3 more');
      userEvent.click(button);

      await waitFor(() => {
        expect(childNodes[3]).not.toHaveAttribute('inert');
        expect(childNodes[3]).toHaveAttribute('aria-hidden', 'false');
        expect(childNodes[4]).not.toHaveAttribute('inert');
        expect(childNodes[4]).toHaveAttribute('aria-hidden', 'false');
        expect(childNodes[5]).not.toHaveAttribute('inert');
        expect(childNodes[5]).toHaveAttribute('aria-hidden', 'false');
        expect(button.textContent).toBe('View less');
      });

      userEvent.click(button);

      await waitFor(() => {
        expect(childNodes[3]).toHaveAttribute('inert');
        expect(childNodes[3]).toHaveAttribute('aria-hidden', 'true');
        expect(childNodes[4]).toHaveAttribute('inert');
        expect(childNodes[4]).toHaveAttribute('aria-hidden', 'true');
        expect(childNodes[5]).toHaveAttribute('inert');
        expect(childNodes[5]).toHaveAttribute('aria-hidden', 'true');
        expect(button.textContent).toBe('View 3 more');
      });
    });

    test('does not render button when there are no expandable children', () => {
      const { queryByRole } = renderExpandableGrid({
        maxColumns: 3,
        children: generateMockChildren(3),
      });

      expect(queryByRole('button')).not.toBeInTheDocument();
    });

    test('displays correct button text for different numbers of expandable children', () => {
      const grid1 = renderExpandableGrid({
        maxColumns: 3,
        children: generateMockChildren(4),
      });
      expect(grid1.getByText('View 1 more')).toBeInTheDocument();

      const grid2 = renderExpandableGrid({
        maxColumns: 3,
        children: generateMockChildren(5),
      });
      expect(grid2.getByText('View 2 more')).toBeInTheDocument();

      const grid3 = renderExpandableGrid({
        maxColumns: 4,
        children: generateMockChildren(7),
      });
      expect(grid3.getByText('View 3 more')).toBeInTheDocument();
    });
  });

  /* eslint-disable jest/no-disabled-tests*/
  test.skip('types behave as expected', () => {
    <>
      {/* @ts-expect-error - cannot set `maxColumns` < 2 */}
      <ExpandableGrid maxColumns={1}>{generateMockChildren(6)}</ExpandableGrid>

      {/* @ts-expect-error - cannot set `maxColumns` > 4 */}
      <ExpandableGrid maxColumns={5}>{generateMockChildren(6)}</ExpandableGrid>

      <ExpandableGrid>{generateMockChildren(6)}</ExpandableGrid>
    </>;
  });
});
