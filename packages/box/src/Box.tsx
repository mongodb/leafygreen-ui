import React from 'react';
import PropTypes from 'prop-types';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import omit from 'lodash/omit';

type DivProps<T> = HTMLElementProps<'div'> & T;

type AnchorProps<T> = HTMLElementProps<'a'> &
  T & {
    href: string;
  };

type CustomElementProps<T> = T & {
  component: React.ElementType<any>;
  [key: string]: any;
};

export type BoxProps<T> = DivProps<T> | AnchorProps<T> | CustomElementProps<T>;

function isCustomElement<T>(
  props: BoxProps<T>,
): props is CustomElementProps<T> {
  return 'component' in props;
}

function isAnchorElement<T>(props: BoxProps<T>): props is AnchorProps<T> {
  return 'href' in props;
}

/**
 * # Box
 *
 * Box component
 *
 * ```
<Box href="https://mongodb.design">Anchors Away!</Box>
```
 * @param props.children Content to be rendered in an HTML element, or provided as a prop to the rendered component.
 * @param props.href When provided, `<Box />` will render an anchor tag with this `href` value.
 * @param props.component The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props.
 */

const Box = React.forwardRef(
  <T extends React.ReactNode>(props: BoxProps<T>, ref: React.Ref<any>) => {
    const { children } = props;
    const rest = omit(props as any, ['component', 'children']);
    let Box: React.ElementType<any> = 'div';

    if (isCustomElement<T>(props)) {
      Box = props.component;
    } else if (isAnchorElement<T>(props)) {
      Box = 'a';
    }

    return (
      <Box {...rest} ref={ref}>
        {children}
      </Box>
    );
  },
);

Box.displayName = 'Box';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
Box.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Box;
