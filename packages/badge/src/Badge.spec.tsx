import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Badge from './Badge';

afterAll(cleanup);

describe('packages/Badge', () => {
  const onClick = jest.fn();
  const className = 'test-pill-class';
  const child = 'Bubble Pill';

  function isElement(node: Node): node is Element {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  const { container } = render(
    <Badge className={className} onClick={onClick}>
      {child}
    </Badge>,
  );

  const badge = container.firstChild;

  if (badge == null || !isElement(badge)) {
    throw new Error('Badge element not found');
  }

  test(`renders "${className}" in the button's classList`, () => {
    expect(badge.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the button's textContent`, () => {
    expect(badge.textContent).toBe(child);
  });
});
