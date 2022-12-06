import React, { useEffect, useRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { LGWindow } from './getRippleGlobalNamespace';
import { registerRipple } from './index';
import { Options } from './utils';

const lgNamespace = '__LEAFYGREEN_UTILS__';
const buttonText = 'click me';
const buttonOptions: Options = { backgroundColor: 'black' };
type Global = Omit<LGWindow, 'name'>;

function ButtonWrapper() {
  const ref = useRef<HTMLButtonElement>(null);
  const unregisterRipple = useRef<() => void>();

  useEffect(() => {
    if (ref.current != null) {
      unregisterRipple.current = registerRipple(ref.current, buttonOptions);
    }

    return unregisterRipple.current;
  }, [ref]);

  return <button ref={ref}>{buttonText}</button>;
}

describe('registerRipple', () => {
  test('it registers a node to the leafygreen namespace, with the associated options', () => {
    render(<ButtonWrapper />);
    const button = screen.getByText(buttonText);

    expect(
      (global as unknown as Global)[lgNamespace].modules[
        '@leafygreen-ui/ripple'
      ].registeredRippleElements.has(button),
    ).toBe(true);
    expect(
      (global as unknown as Global)[lgNamespace].modules[
        '@leafygreen-ui/ripple'
      ].registeredRippleElements.get(button),
    ).toBe(buttonOptions);
  });

  test('it updates the leafygreen namespace when a registered element is clicked', () => {
    render(<ButtonWrapper />);
    const button = screen.getByText(buttonText);
    fireEvent.click(button);

    expect(
      (global as unknown as Global)[lgNamespace].modules[
        '@leafygreen-ui/ripple'
      ].setRippleListener,
    ).toBe(true);
  });

  test('it returns a function that successfully removes a registered element', () => {
    const { unmount } = render(<ButtonWrapper />);
    const button = screen.getByText(buttonText);
    expect(
      (global as unknown as Global)[lgNamespace].modules[
        '@leafygreen-ui/ripple'
      ].registeredRippleElements.has(button),
    ).toBe(true);

    unmount();
    expect(
      (global as unknown as Global)[lgNamespace].modules[
        '@leafygreen-ui/ripple'
      ].registeredRippleElements.has(button),
    ).toBe(false);
  });
});
