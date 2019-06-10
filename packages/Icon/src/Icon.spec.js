import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createIconComponent } from '.';

afterAll(cleanup);

const text = 'Hello world';

const glyphs = {
  // eslint-disable-next-line react/display-name
  MyGlyph: () => <div>{text}</div>,
};

describe('packages/Icon/createIconComponent', () => {
  const IconComponent = createIconComponent(glyphs);

  test('createIconComponent returns a function', () => {
    expect(typeof IconComponent).toBe('function');
  });

  test('The function returned by createIconComponent has the displayName: "Icon"', () => {
    expect(IconComponent.displayName).toBe('Icon');
  });

  const renderedIcon = render(<IconComponent glyph="MyGlyph" />);
  const glyph = renderedIcon.container.firstChild;

  test('The function returned by createIconComponent renders the glyph specified', () => {
    expect(glyph.nodeName.toLowerCase()).toBe('div');
    expect(glyph.textContent).toBe(text);
  });
});
