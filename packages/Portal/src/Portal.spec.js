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

  test(`appends new div, which contains the Portal component's children, to document body`, () => {
    expect(document.body.firstChild.outerHTML).toBe(
      '<div><div>Existing content on the DOM</div></div>',
    );

    expect(document.body.lastChild.outerHTML).toBe(
      '<div><div>Content portaled to the end of the DOM</div></div>',
    );
  });

  test(`appends new div, which contains the Poral component's children, to the end of a supplied container`, () => {
    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    render(
      <div>
        <Portal container={document.getElementById('custom-container')}>
          Portaled to a custom node
        </Portal>
      </div>,
      { container },
    );

    expect(document.getElementById('custom-container').outerHTML).toBe(
      `<div id="custom-container">Portaled to a custom node</div>`,
    );
  });

  test(`removes portal content from custom node`, () => {
    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    const { container, unmount } = render(
      <Portal container={document.getElementById('custom-container')}>
        Portaled
      </Portal>,
    );
    unmount();

    expect(container.innerHTML).toBe('');
  });
});
