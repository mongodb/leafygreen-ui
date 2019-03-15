import React from 'react';
import { render, cleanup } from 'react-testing-library';
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
  test(`renders "${className}" in the button's classList`, () => {
    expect(badge.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the button's textContent`, () => {
    expect(badge.textContent).toBe(child);
  });

  test('renders a span tag, when href prop is not set', () => {
    expect(badge.tagName).toBe('SPAN');
  });

  test(`renders an a tag, when href prop is set`, () => {
    const hrefContainer = render(
      <Badge
        className={className}
        onClick={onClick}
        href={'mongodb.design'}
      >
        {child}
      </Badge>,
    );

    const hrefBadge = hrefContainer.container.firstChild;
    expect(hrefBadge.tagName).toBe('A');
  });
});
