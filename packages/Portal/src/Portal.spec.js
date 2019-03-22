import React from 'react';
import { render, cleanup } from 'react-testing-library';
import Portal from '.';

afterAll(cleanup);

describe('packages/Portal', () => {
  const { container } = render(
    <div>
      Existing content on the DOM
      <Portal>
        <div>Content portaled to the end of the DOM</div>
      </Portal>
    </div>,
  );

  test(`appends portal to document body`, () => {
    expect(document.body.firstChild.outerHTML).toBe(
      '<div><div>Existing content on the DOM</div></div>',
    );

    expect(document.body.lastChild.outerHTML).toBe(
      '<div><div>Content portaled to the end of the DOM</div></div>',
    );
  });

  test(`appends portal to a custom node`, () => {
    render(<div id="custom-container" />, { container });

    render(
      <Portal container={document.getElementById('custom-container')}>
        Portaled to a custom node
      </Portal>,
      { container },
    );

    expect(document.getElementById('custom-container').outerHTML).toBe(
      `<div id="custom-container">Portaled to a custom node</div>`,
    );
  });
});
