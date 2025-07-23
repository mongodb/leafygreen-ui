import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

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

    test('accepts a ref', () => {
      const ref = React.createRef<HTMLTableSectionElement>();
      render(<TableBody ref={ref}>Hello</TableBody>);

      expect(ref.current).toBeInTheDocument();
      expect(ref.current!.textContent).toBe('Hello');
    });
  });

  /**
   * This is not effectively possible using just Jest and RTL since we'd have to simulate scrolling
   * on a set viewport height. Any tests that use virtual scrolling also triggers warnings from RTL
   * saying tests for server-side rendered markup won't be reliably tested.
   */
  test.todo('Virtual scrolling features');
});
