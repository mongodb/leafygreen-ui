import React from 'react';
import styled from '@emotion/styled';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import HeaderRow, { HeaderRowProps } from '.';

const defaultProps: HeaderRowProps = {};

function renderHeaderRow(props: HeaderRowProps) {
  return render(
    <table>
      <thead>
        <HeaderRow {...props} />
      </thead>
    </table>,
  );
}

describe('packages/table/HeaderRow', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderHeaderRow(defaultProps);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('accepts a ref', () => {
    const ref = React.createRef<HTMLTableRowElement>();
    render(<HeaderRow ref={ref}>Hello</HeaderRow>);

    expect(ref.current).toBeInTheDocument();
    expect(ref.current!.textContent).toBe('Hello');
  });

  describe('styled', () => {
    test('works with `styled`', () => {
      const StyledHeaderRow = styled(HeaderRow)`
        color: #69ffc6;
      `;

      const { getByTestId } = render(<StyledHeaderRow data-testid="styled" />);

      expect(getByTestId('styled')).toBeInTheDocument();
      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });

    test('works with `styled` props', () => {
      // We need to define the additional props that styled should expect
      interface StyledProps {
        color?: string;
      }

      const StyledHeaderRow = styled(HeaderRow)<StyledProps>`
        color: ${props => props.color};
      `;

      const { getByTestId } = render(
        <StyledHeaderRow data-testid="styled" color="#69ffc6" />,
      );
      expect(getByTestId('styled')).toBeInTheDocument();
      expect(getByTestId('styled')).toHaveStyle(`color: #69ffc6;`);
    });
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip('types behave as expected', () => {
    const ref = React.createRef<HTMLTableRowElement>();

    <>
      <HeaderRow />
      <HeaderRow ref={ref} />
    </>;
  });
});
