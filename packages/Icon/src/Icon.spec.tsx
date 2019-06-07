import React from 'react';
import { render, cleanup } from 'react-testing-library';
import { createIconComponent } from '.';

afterAll(cleanup);

const text = 'Hello world';

// eslint-disable-next-line react/display-name
const MyGlyph: React.FC<React.SVGProps<SVGSVGElement>> = () => (
  <div>{text}</div>
);

const glyphs = {
  MyGlyph,
};

describe('packages/Icon/createIconComponent', () => {
  function isElement(el: Node | null): el is HTMLElement {
    return el != null && el.nodeType === Node.ELEMENT_NODE;
  }

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
    if (!isElement(glyph)) {
      throw new Error('Glyph was not rendered');
    }

    expect(glyph.nodeName.toLowerCase()).toBe('div');
    expect(glyph.textContent).toBe(text);
  });
});
