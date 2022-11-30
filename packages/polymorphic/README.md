# Polymorphic

> **pol·y·morph** _(noun)_
>
> - an organism, inorganic object or material which takes various forms.

> **pol·y·mor·phic** _(adjective)_
>
> - occurring in several different forms, in particular with reference to species or genetic variation.
> - (of a feature of a programming language) allowing routines to use variables of different types at different times.

`Polymorphic` is a suite of types, hooks, components and factories that allows users to create components that can render as any HTML element or React component.

# Usage

There are two main ways to use `Polymorphic`, depending on whether the `as` prop is defined internally by your component, or passed in as an external prop.

## Basic Polymorphic

If the logic defining the `as` prop is defined internally within your component, use the standalone Polymorphic component.

```tsx
interface MyProps {
  someProp: string;
}

const MyComponent = (props: MyProps) => {
  const shouldRenderAs = 'button';
  return <Polymorphic as={shouldRenderAs} {...props} />;
};
```

## Extending Polymorphic

If you want to expose the `as` prop in your component, it's recommended to use the Polymorphic factory function and hooks. Note the types of `props` are inferred by using the factory function.

```tsx
interface MyProps {
  someProp: string;
}
const MyComponent = PolymorphicComponent<MyProps>(({ as, ...rest }) => {
  const { Component, ref } = usePolymorphic(as);
  return <Component ref={ref} {...rest} />;
});
```

Accepting a forwarded ref to a Polymorphic component is as simple as passing in a ref into the render function (same as `React.forwardRef`).

```tsx
interface MyProps {
  someProp: string;
}
const MyComponent = PolymorphicComponent<MyProps>(
  ({ as, ...rest }, forwardedRef) => {
    const { Component } = usePolymorphic(as);
    return <Component ref={forwardedRef} {...rest} />;
  },
);
```

While it is possible to use the `Polymorphic` component to extend polymorphic behavior, it can be much more verbose than using the factory function.

```tsx
type MyProps<T extends React.ElementType> = PolymorphicPropsWithRef<
  T,
  {
    someProp: string;
  }
>;

export const MyComponent = <T extends React.ElementType = 'div'>(
  { as, title, ...rest }: MyProps<T>,
  forwardedRef: PolymorphicRef<T>,
) => {
  return (
    <Polymorphic as={as as React.ElementType} ref={forwardedRef} {...rest}>
      {title}
    </Polymorphic>
  );
};
```

# Prior art

- [Radix](https://github.com/radix-ui/primitives/blob/2f139a832ba0cdfd445c937ebf63c2e79e0ef7ed/packages/react/polymorphic/src/polymorphic.ts)

- [Reach](https://github.com/reach/reach-ui/blob/dev/packages/polymorphic/src/reach-polymorphic.ts)

- [Chakra](https://github.com/chakra-ui/chakra-ui/blob/main/packages/components/layout/src/box.tsx)

- [MUI](https://mui.com/material-ui/guides/composition/#component-prop)

- [LogRocket](https://blog.logrocket.com/build-strongly-typed-polymorphic-components-react-typescript/)

- [Ohans Emmanuel](https://github.com/ohansemmanuel/polymorphic-react-component)
