import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, render } from '@testing-library/react';

import { typeIs } from '@leafygreen-ui/lib';

import Portal from '..';

afterEach(async () => {
  await cleanup();
  document.body.innerHTML = '';
});

describe('packages/Portal', () => {
  function getByIdOrThrow(id: string) {
    const el = document.getElementById(id);

    if (el == null) {
      throw new Error(`Could not find element: ${id}`);
    }

    return el;
  }

  test(`appends portal content to document body`, () => {
    render(
      <div>
        Existing content on the DOM
        <Portal>
          <div>Content portaled to the end of the DOM</div>
        </Portal>
      </div>,
    );

    const { firstChild, lastChild } = document.body;
    expect(firstChild).not.toBeNull();
    expect(lastChild).not.toBeNull();

    expect(firstChild!.textContent).toBe('Existing content on the DOM');
    expect(lastChild!.textContent).toBe(
      'Content portaled to the end of the DOM',
    );
  });

  test(`appends portal content to custom container`, () => {
    const { container } = render(
      <div>
        Existing content on the DOM
        <Portal>
          <div>Content portaled to the end of the DOM</div>
        </Portal>
      </div>,
    );

    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    render(
      <Portal container={getByIdOrThrow('custom-container')}>
        Portaled to a custom node
      </Portal>,
      { container },
    );

    expect(getByIdOrThrow('custom-container').outerHTML).toBe(
      `<div id="custom-container">Portaled to a custom node</div>`,
    );
  });

  test('portal forwards className to default container', async () => {
    const { rerender } = render(
      <Portal className="test-classname">
        <div>Content portaled to the end of the DOM</div>
      </Portal>,
    );

    let { lastChild } = document.body;

    if (!typeIs.element(lastChild)) {
      throw new Error('Could not find lastChild element');
    }

    expect(lastChild.outerHTML).toBe(
      `<div class="test-classname"><div>Content portaled to the end of the DOM</div></div>`,
    );

    rerender(
      <Portal className="test-classname-updated">
        <div>Content portaled to the end of the DOM</div>
      </Portal>,
    );

    ({ lastChild } = document.body);
    if (!typeIs.element(lastChild)) {
      throw new Error('Could not find lastChild element');
    }

    expect(lastChild.outerHTML).toBe(
      `<div class="test-classname-updated"><div>Content portaled to the end of the DOM</div></div>`,
    );
  });

  // eslint-disable-next-line jest/expect-expect
  test('container and className props cannot both be provided', () => {
    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    // @ts-expect-error
    <Portal
      container={getByIdOrThrow('custom-container')}
      className="test-classname"
    >
      <div>Content portaled to the end of the DOM</div>
    </Portal>;
  });

  test('can move from default to custom portal', async () => {
    const { rerender, unmount } = render(
      <Portal>Moving Portaled Content</Portal>,
    );

    const initialContainer = document.body.lastChild;

    if (!typeIs.element(initialContainer)) {
      throw new Error('Could not find initialContainer element');
    }

    expect(initialContainer.innerHTML).toBe('Moving Portaled Content');

    const customContainer = document.createElement('div');
    customContainer.id = 'custom-container';
    document.body.appendChild(customContainer);

    rerender(
      <Portal container={customContainer}>Moving Portaled Content</Portal>,
    );

    expect(document.body.lastChild).toBe(customContainer);
    expect(customContainer.innerHTML).toBe('Moving Portaled Content');
    expect(initialContainer).not.toBeInTheDocument();

    unmount();

    expect(document.body.lastChild).toBeInTheDocument();
    expect(customContainer.innerHTML).toBe('');
  });

  test(`removes portal content from custom container`, async () => {
    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    const { container, unmount } = render(
      <Portal container={getByIdOrThrow('custom-container')}>Portaled</Portal>,
    );

    expect(container.innerHTML).toBe('');
    expect(div.innerHTML).toBe('Portaled');

    unmount();
    expect(container.innerHTML).toBe('');
    expect(div.innerHTML).toBe('');
  });

  test('cleans up default container', () => {
    let unmountChild: () => void;

    const Wrapper = ({ children }: { children: React.ReactNode }) => {
      const [shouldRenderChildren, setShouldRenderChildren] = useState(true);
      unmountChild = () => setShouldRenderChildren(false);

      // Enable strict mode so we can detect side effects
      // https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
      return (
        <React.StrictMode>{shouldRenderChildren && children}</React.StrictMode>
      );
    };

    render(
      <Wrapper>
        <Portal>Portaled</Portal>
      </Wrapper>,
    );

    act(() => unmountChild());
    expect(document.body.innerHTML).toBe('<div></div>');
  });
});
