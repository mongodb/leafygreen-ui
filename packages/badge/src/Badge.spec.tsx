import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Badge from './Badge';

afterAll(cleanup);

describe('packages/Badge', () => {
  const onClick = jest.fn();
  const className = 'test-pill-class';
  const child = 'Bubble Pill';

  const { container } = render(
    <Badge className={className} onClick={onClick}>
      {child}
    </Badge>,
  );

  const badge = container.firstChild;

  if (!typeIs.element(badge)) {
    throw new Error('Badge element not found');
  }

  test(`renders "${className}" in the badge's classList`, () => {
    expect(badge.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the badge's textContent`, () => {
    expect(badge.textContent).toBe(child);
  });
});
