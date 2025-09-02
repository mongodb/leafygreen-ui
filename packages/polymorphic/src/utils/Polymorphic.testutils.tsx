import React from 'react';
import { render } from '@testing-library/react';

/** Test utility functions */
export type WrapperProps = React.ComponentPropsWithoutRef<'span'> & {
  darkMode?: boolean;
};
export function makeWrapperComponent(): {
  Wrapper: React.ForwardRefExoticComponent<
    WrapperProps & React.RefAttributes<HTMLSpanElement>
  >;
  wrapperDidRender: jest.Mock;
} {
  const wrapperDidRender = jest.fn();

  const Wrapper = React.forwardRef<HTMLSpanElement, WrapperProps>(
    ({ children, ...rest }: WrapperProps, ref) => {
      wrapperDidRender();
      return (
        <span data-testid="wrapper" {...rest} ref={ref}>
          {children}
        </span>
      );
    },
  );

  Wrapper.displayName = 'Wrapper';

  return {
    Wrapper,
    wrapperDidRender,
  };
}

export function toBePolymorphic(Component: React.ElementType) {
  const { Wrapper } = makeWrapperComponent();
  const { getByTestId, unmount } = render(
    <>
      <Component as="div" data-testid="test-1" />;
      <Component as="span" data-testid="test-2" />;
      <Component as="a" href="mongodb.design" data-testid="test-3" />;
      <Component as={Wrapper} data-testid="test-4" />;
    </>,
  );

  const test1 = getByTestId('test-1');
  const test2 = getByTestId('test-2');
  const test3 = getByTestId('test-3');
  const test4 = getByTestId('test-4');

  const componentName =
    typeof Component === 'string'
      ? Component
      : Component.displayName ?? 'The component';

  if (
    test1.tagName.toLowerCase() === 'div' &&
    test2.tagName.toLowerCase() === 'span' &&
    test3.tagName.toLowerCase() === 'a' &&
    test4.tagName.toLowerCase() === 'span'
  ) {
    unmount();
    return {
      pass: true,
      message: () => `Component \`${componentName}\` is polymorphic`,
    };
  }

  unmount();
  return {
    pass: false,
    message: () => `Component \`${componentName}\` is not polymorphic`,
  };
}
