import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
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

  function getByIdOrThrow(id: string) {
    const el = document.getElementById(id);

    if (el == null) {
      throw new Error(`Could not find element: ${id}`);
    }

    return el;
  }

  test(`appends portal content to document body`, () => {
    const { firstChild, lastChild } = document.body;

    if (!typeIs.element(firstChild)) {
      throw new Error('Could not find firstChild element');
    }

    if (!typeIs.element(lastChild)) {
      throw new Error('Could not find lastChild element');
    }

    expect(firstChild.outerHTML).toBe(
      '<div><div>Existing content on the DOM</div></div>',
    );

    expect(lastChild.outerHTML).toBe(
      '<div><div>Content portaled to the end of the DOM</div></div>',
    );
  });

  test(`appends portal content to custom container`, () => {
    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    render(
      <div>
        <Portal container={getByIdOrThrow('custom-container')}>
          Portaled to a custom node
        </Portal>
      </div>,
      { container },
    );

    expect(getByIdOrThrow('custom-container').outerHTML).toBe(
      `<div id="custom-container">Portaled to a custom node</div>`,
    );
  });

  test('does not move Portaled content when the container props is changed, and logs an error to the console', () => {
    const { rerender } = render(
      <div>
        <Portal>Moving Portaled Content</Portal>
      </div>,
    );

    rerender(
      <div>
        <Portal container={getByIdOrThrow('custom-container')}>
          Moving Portaled Content
        </Portal>
      </div>,
    );

    const lastChild = document.body.lastChild;

    if (!typeIs.element(lastChild)) {
      throw new Error('Could not find lastChild element');
    }

    expect(lastChild.innerHTML).toBe('Moving Portaled Content');
  });

  test(`removes portal content from custom container`, () => {
    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    const { container, unmount } = render(
      <Portal container={getByIdOrThrow('custom-container')}>Portaled</Portal>,
    );
    unmount();
    expect(container.innerHTML).toBe('');
  });

  test('cleans up default container', () => {
    const { container, unmount } = render(
      <div>
        <Portal>Portaled</Portal>
      </div>,
    );
    unmount();
    expect(container.innerHTML).toBe('');
  });
});
