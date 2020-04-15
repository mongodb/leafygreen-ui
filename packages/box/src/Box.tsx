import React from 'react';

export interface BoxComponentProps<
  C extends React.ElementType = React.ElementType
> {
  component?: C;
}

export type BoxProps<C extends React.ElementType> = BoxComponentProps<C> &
  Omit<React.ComponentPropsWithRef<C>, keyof BoxComponentProps>;

// eslint-disable-next-line
export const Box = React.forwardRef(
  (
    { component: Component = 'div', ...rest }: BoxComponentProps,
    ref: React.Ref<Element>,
  ) => {
    return <Component ref={ref} {...rest} />;
  },
) as <C extends React.ElementType = 'div'>(props: BoxProps<C>) => JSX.Element;

export default Box;

export type OverrideComponentProps<E extends React.ElementType, P> = P &
  BoxProps<E>;

// interface BoxComponentProps<C extends React.ElementType = React.ElementType> {
//   component?: C;
// }

// type BoxProps<C extends React.ElementType> = Omit<
//   React.ComponentPropsWithRef<C>,
//   keyof BoxComponentProps
// >;

// // type BoxComponentProps<
// //   C extends React.ElementType
// // > = React.ComponentPropsWithRef<C> & {
// //   component?: C;
// // };

// // eslint-disable-next-line
// const Box = React.forwardRef(
//   ({ component, ...rest }: BoxComponentProps, ref: React.Ref<any>) => {
//     const Component = component ?? 'div';
//     return <Component ref={ref} {...rest} />;
//   },
// ) as <C extends React.ElementType = 'div'>(props: BoxProps<C>) => JSX.Element;

// const App2 = () => {
//   return <Box component="a" target="_blank" />;
// };

// const App = () => {
//   return <Box target="_blank" />;
// };

// Box.displayName = 'Box';

// import React from 'react';
// import PropTypes from 'prop-types';
// import { HTMLElementProps } from '@leafygreen-ui/lib';
// import omit from 'lodash/omit';

// type DivProps<T> = HTMLElementProps<'div'> & T;

// type AnchorProps<T> = HTMLElementProps<'a'> &
//   T & {
//     href: string;
//   };

// type CustomElementProps<T> = T & {
//   component: React.ElementType<any>;
//   [key: string]: any;
// };

// export type BoxProps<T> = DivProps<T> | AnchorProps<T> | CustomElementProps<T>;

// function isCustomElement<T>(
//   props: BoxProps<T>,
// ): props is CustomElementProps<T> {
//   return (props as any).component != null;
// }

// function isAnchorElement<T>(props: BoxProps<T>): props is AnchorProps<T> {
//   return (props as any).href != null;
// }

// /**
//  * # Box
//  *
//  * Box component
//  *
//  * ```
// <Box href="https://mongodb.design">Anchors Away!</Box>
// ```
//  * @param props.children Content to be rendered in an HTML element, or provided as a prop to the rendered component.
//  * @param props.href When provided, `<Box />` will render an anchor tag with this `href` value.
//  * @param props.component The component or HTML tag to be rendered by the `<Box />` component. **Note**: This will supersede the behavior of any other props.
//  */

// const Box = React.forwardRef(
//   <T extends React.ReactNode>(props: BoxProps<T>, ref: React.Ref<any>) => {
//     const rest = omit(props as any, ['component']);
//     let Box: React.ElementType<any> = 'div';

//     if (isCustomElement<T>(props)) {
//       Box = props.component;
//     } else if (isAnchorElement<T>(props)) {
//       Box = 'a';
//     }

//     return <Box {...rest} ref={ref} />;
//   },
// );

// Box.displayName = 'Box';

// // @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
// Box.propTypes = {
//   children: PropTypes.node,
//   href: PropTypes.string,
//   // @ts-ignore
//   component: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
// };

// export default Box;
