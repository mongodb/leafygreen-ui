import React, { useState } from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Portal from '.';
import { act } from 'react-dom/test-utils';

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

  test('portal forwards className to default container', () => {
    const { rerender } = render(
      <Portal className="test-classname">
        <div>Content portaled to the end of the DOM</div>
      </Portal>,
    );

    const { lastChild } = document.body;

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

  test('does not move Portaled content and logs an error to the console when the container props is changed', () => {
    const { rerender, unmount } = render(
      <Portal>Moving Portaled Content</Portal>,
    );

    const initialContainer = document.body.lastChild;

    if (!typeIs.element(initialContainer)) {
      throw new Error('Could not find initialContainer element');
    }

    expect(initialContainer.innerHTML).toBe('Moving Portaled Content');

    const logError = jest.spyOn(console, 'error').mockImplementation();

    const div = document.createElement('div');
    div.id = 'custom-container';
    document.body.appendChild(div);

    rerender(
      <Portal container={getByIdOrThrow('custom-container')}>
        Moving Portaled Content
      </Portal>,
    );

    const customContainer = document.body.lastChild;
    expect(customContainer).toBe(getByIdOrThrow('custom-container'));

    if (!typeIs.element(customContainer)) {
      throw new Error('Could not find customContainer element');
    }

    expect(customContainer.innerHTML).toBe('');
    expect(initialContainer.innerHTML).toBe('Moving Portaled Content');

    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(
      'Changing the Portal container is not supported behavior and may cause unintended side effects. Instead, create a new Portal instance.',
    );
    logError.mockRestore();

    unmount();
    expect(initialContainer).not.toBeInTheDocument();
    expect(customContainer).toBeInTheDocument();
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
