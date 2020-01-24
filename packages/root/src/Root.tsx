import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';

type ButtonProps<T> = HTMLElementProps<'button'> &
  T & {
    href?: undefined;
  };

type Anchor<T> = HTMLElementProps<'a'> &
  T & {
    href: string;
  };

type CustomElementProps<T> = T & {
  as: React.ElementType<any>;
  [key: string]: any;
};

type RootProps<T> = ButtonProps<T> | Anchor<T> | CustomElementProps<T>;

function usesCustomElement<T>(
  props: RootProps<T>,
): props is CustomElementProps<T> {
  return (props as any).as != null;
}

function usesLinkElement<T>(props: RootProps<T>): props is Anchor<T> {
  return props.href != null;
}

/**
 * # Root
 *
 * Root component
 *
 * ```
<Root href="https://mongodb.design">Anchors Away!</Root>
```
 * @param props.children Takes priority in determining what tag the `<Root />` element will render.
 * @param props.href Determines the location that an anchor tag will point to. If prop is set without the `as` prop, `<Root />` will render `a` tags.
 * @param props.as Callback to change the open state of the Menu.
 */
function Root<T>(props: RootProps<T>) {
  const { children, ...rest } = props;
  let Root: React.ElementType<any> = 'button';

  if (usesCustomElement<T>(props)) {
    Root = props.as;
  } else if (usesLinkElement<T>(props)) {
    Root = 'a';
  }

  return <Root {...rest}>{children}</Root>;
}

Root.displayName = 'Root';

Root.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Root;
