import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import omit from 'lodash/omit';

type ButtonProps<T> = HTMLElementProps<'button'> &
  T & {
    href?: undefined;
  };

type AnchorProps<T> = HTMLElementProps<'a'> &
  T & {
    href: string;
  };

type CustomElementProps<T> = T & {
  as: React.ElementType<any>;
  [key: string]: any;
};

export type RootProps<T> =
  | ButtonProps<T>
  | AnchorProps<T>
  | CustomElementProps<T>;

function usesCustomElement<T>(
  props: RootProps<T>,
): props is CustomElementProps<T> {
  return (props as any).as != null;
}

function usesAnchorElement<T>(props: RootProps<T>): props is AnchorProps<T> {
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
 * @param props.children Content to be rendered in an HTML element, or provided as a prop to the rendered component.
 * @param props.href When provided, `<Root />` will render an anchor tag with this `href` value.
 * @param props.as The component or HTML tag to be rendered by the `<Root />` component. **Note**: This will supersede the behavior of any other props.
 */
function Root<T>(props: RootProps<T>) {
  const { children } = props;
  const rest = omit(props as any, ['as', 'children']);
  let Root: React.ElementType<any> = 'button';

  if (usesCustomElement<T>(props)) {
    Root = props.as;
  } else if (usesAnchorElement<T>(props)) {
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
