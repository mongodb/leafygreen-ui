import React from 'react';
import styled from '@emotion/styled';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import TableHead from '.';

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

    test('accepts a ref', () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(<TableHead ref={ref}>Hello</TableHead>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello');
    });

    describe('styled', () => {
      test('works with `styled`', () => {
        const StyledTableHead = styled(TableHead)`
          color: #69ffc6;
        `;

        const { getByTestId } = render(
          <StyledTableHead data-testid="styled" />,
        );

        expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
      });

      test('works with `styled` props', () => {
        // We need to define the additional props that styled should expect
        interface StyledProps {
          color?: string;
        }

        const StyledTableHead = styled(TableHead)<StyledProps>`
          color: ${props => props.color};
        `;

        const { getByTestId } = render(
          <StyledTableHead data-testid="styled" color="#69ffc6" />,
        );

        expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
      });
    });

    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('types behave as expected', () => {
      const ref = React.createRef<HTMLTableSectionElement>();

      <>
        <TableHead />
        <TableHead ref={ref} />
        <TableHead ref={ref} isSticky={true} />
        <TableHead ref={ref} isSticky={false} />
      </>;
    });
  });
});
