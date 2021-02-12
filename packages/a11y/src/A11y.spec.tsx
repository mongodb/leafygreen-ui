
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe'
import { VisuallyHidden } from '.';

describe('packages/a11y', () => {
  describe('VisuallyHidden', () => {
    test('does not have basic accessibility violations', async () => {
      const { container } = render(<VisuallyHidden>test content</VisuallyHidden>)
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  })
})
