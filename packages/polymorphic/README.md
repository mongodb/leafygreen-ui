# Polymorphic

> ### **pol·y·morph** _(noun)_
>
> - an organism, inorganic object or material which takes various forms.

> ### **pol·y·mor·phic** _(adjective)_
>
> - occurring in several different forms, in particular with reference to species or genetic variation.
> - (of a feature of a programming language) allowing routines to use variables of different types at different times.

`Polymorphic` is a suite of types, hooks, components and factories that allows users to create components that can render as any HTML element or React component.

# Usage

There are two main ways to use `Polymorphic`, depending on whether the `as` prop is defined _internally_ by your component, or passed in as an external prop.

## Basic usage

If the logic defining the `as` prop is defined internally within your component, use the standalone `Polymorph` component.
A simple example of this may be rendering an element as a header or paragraph text depending on certain props passed in.

```tsx
interface MyProps {
  someProp: string;
}

const MyComponent = (props: MyProps) => {
  const shouldRenderAs = props.isHeader ? 'h1' : 'p';
  return <Polymorph as={shouldRenderAs} {...props} />;
};
```

## Extending Polymorphic behavior

If you want to expose `as` as a prop of your component, use the `Polymorphic` factory function and related hooks.
This is likely the more common use case, since it allows you to create new polymorphic components (such as a `Button` component that can render as a link, etc.)

Note that any inherited props will be indeterminate in the factory function, since the value `as` is not known. (i.e. the attributes of `rest` in the following example are unknown).

```tsx
interface MyProps {
  someProp: string;
}
const MyComponent = Polymorphic<MyProps>(({ as, ...rest }) => {
  const { Component, ref } = usePolymorphic(as);
  return <Component ref={ref} {...rest} />;
});
```

### With Refs

Accepting a forwarded ref to a Polymorphic component is as simple as passing in a ref into the render function (same as `React.forwardRef`).

```tsx
interface MyProps {
  someProp: string;
}
const MyComponent = Polymorphic<MyProps>(({ as, ...rest }, forwardedRef) => {
  const { Component } = usePolymorphic(as);
  return <Component ref={forwardedRef} {...rest} />;
});
```

### React Server Components

React Server Components do not support React Client Component APIs, such as `React.useRef`. To avoid React Client APIs, use the `usePolymorphicComponent` and `useInferredPolymorphicComponent` hooks instead.

Note that `forwardedRef` is still allowed.

```tsx
interface MyProps {
  someProp: string;
}
const MyComponent = Polymorphic<MyProps>(({ as, ...rest }, forwardedRef) => {
  const Component = usePolymorphicComponent(as);
  return <Component ref={forwardedRef} {...rest} />;
});
```

## Inferred `as` prop

Components extended using the `Polymorphic` factory function can be made to infer the `as` prop value based on the `href` passed in.
Ensure the custom props are wrapped in `InferredPolymorphicProps`, and use the `useInferredPolymorphic` hook.
Make sure to pass both `as` and a `rest` object (that may contain `href`) into the hook.

```tsx
export const MyInferredComponent = InferredPolymorphic<MyProps>(
  ({ as, ...rest }) => {
    const { Component, ref } = useInferredPolymorphic(as, rest);
    return (
      <Component ref={ref} {...rest}>
        {title}
      </Component>
    );
  },
);

//

<MyInferredComponent href="mongodb.design" />; // renders as <a>
```

#### Inferred `as` with a default value

Sometimes, when developing a component that uses Polymorphic, you'll want to set a default value for the `as` prop.
For example, when creating a Button component, you may want to have the `as` prop default to the HTML `button` element.
To set a default value for the inferred as value, you'll need to provide the default value both to TypeScript and React:

```tsx
export const MyInferredComponentWithDefault = InferredPolymorphic<
  ExampleProps,
  'button'
>(({ as = 'button', title, ...rest }) => {
  const { Component, ref } = useInferredPolymorphic(as, rest);
  return (
    <Component ref={ref} {...rest}>
      {title}
    </Component>
  );
});
```

Note: When a component is `InferredPolymorphic`, the `href` will force the component to render as an anchor, and will override any default value.

```tsx
<MyInferredComponentWithDefault />; // as <button>
<MyInferredComponentWithDefault href="mongodb.design" />; // as <button>
```

## With Emotion `styled` API

`Polymorphic` also supports usage with Emotions `styled` API. To get TypeScript to accept the Polymorphic props you'll need to explicitly type your styled component as `PolymorphicComponentType`.

```tsx
const StyledPolymorph = styled(Polymorph)`
  color: hotpink;
` as PolymorphicComponentType;

// or

const MyStyledComponent = styled(MyComponent)`
  color: hotpink;
` as typeof MyComponent;
```

This also works with InferredPolymorphic components

```tsx
const StyledInferred = styled(MyInferredComponent)`
  color: hotpink;
` as typeof MyInferredComponent;
```

### With styled props (and Typescript)

Since Polymorphic components are strictly typed, to use styled props with Typescript you will need to define the additional props you expect to use within styled, and pass these into styled as generic type.

```tsx
interface StyledProps {
  color: string;
}

const MyStyledComponent = styled(MyComponent)<StyledProps>`
  color: ${props => props.color};
` as StyledComponent<
  StyledProps & PolymorphicProps<PolymorphicAs, ExampleProps>
  // or StyledProps & InferredProps<PolymorphicAs, ExampleProps>
>;
```

Note: TSDocs will not compile for styled polymorphs. This can be remedied by creating a wrapper around the styled function that explicitly returns a PolymorphicComponentType

## Supported (but not recommended) usage

While it is possible to use the `Polymorph` component to extend polymorphic behavior, it can be much more verbose and error prone than using the `Polymorphic` factory function. For completeness, an example of how to do this is provided below:

```tsx
type MyProps<T extends PolymorphicAs> = PolymorphicPropsWithRef<
  T,
  {
    someProp: string;
  }
>;

export const MyComponent = <T extends PolymorphicAs = 'div'>(
  { as, title, ...rest }: MyProps<T>,
  forwardedRef: PolymorphicRef<T>,
) => {
  return (
    <Polymorph as={as as PolymorphicAs} ref={forwardedRef} {...rest}>
      {title}
    </Polymorph>
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
