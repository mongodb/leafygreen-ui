import React, { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { AdditionalActions } from './AdditionalActions';

describe('packages/input-bar/AdditionalActions', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = render(
        <AdditionalActions>Content</AdditionalActions>,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  test('forwards ref correctly', () => {
    const ref = createRef<HTMLDivElement>();

    render(<AdditionalActions ref={ref}>Content</AdditionalActions>);

    expect(ref.current).toBeInstanceOf(HTMLDivElement);
    expect(ref.current).toBe(screen.getByText('Content'));
  });

  test('accepts and applies className', () => {
    render(
      <AdditionalActions className="custom-class">Content</AdditionalActions>,
    );
    const element = screen.getByText('Content');

    expect(element).toHaveClass('custom-class');
  });
});
