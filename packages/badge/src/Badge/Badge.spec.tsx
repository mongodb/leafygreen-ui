import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';

import Badge from './Badge';

const onClick = jest.fn();
const className = 'test-pill-class';
const child = 'Bubble Pill';

function renderBadge() {
  const { container, getByTestId } = render(
    <Badge className={className} onClick={onClick} data-testid="badge-test">
      {child}
    </Badge>,
  );

  const badge = getByTestId('badge-test');
  return { badge, container };
}

describe('packages/Badge', () => {
  describe('a11y', () => {
    test('does not have basic accessibility issues', async () => {
      const { container } = renderBadge();
      const results = await axe(container);

      expect(results).toHaveNoViolations();
    });
  });

  test(`renders "${className}" in the badge's classList`, () => {
    const { badge } = renderBadge();
    expect(badge.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the badge's textContent`, () => {
    const { badge } = renderBadge();
    expect(badge.textContent).toBe(child);
  });
});
