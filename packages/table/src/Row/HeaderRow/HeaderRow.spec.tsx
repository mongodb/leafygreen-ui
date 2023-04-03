import React from 'react';
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
});
