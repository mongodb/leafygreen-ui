import React from 'react';
import { getByText, waitFor } from '@testing-library/dom';
import { fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Context, jest as Jest } from '@leafygreen-ui/testing-lib';

import Table, { TableProps } from ".";

const onScroll = jest.fn();

const defaultProps: TableProps = {
  onScroll,
};

function renderTable(props: TableProps) {
  return render(<Table {...props} data-testid="table-test" />);
}

describe('packages/table/Table', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderTable(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});