# useResizable

```
@leafygreen-ui/resizable:tsc: /Users/adam.thompson/Documents/GitHub/leafygreen-ui-branch/packages/resizable/src/useResizable/useResizable.ts (280,5): Type 'RefObject<T | null>' is not assignable to type 'RefObject<T>'.
```

`useResizable` return object expects an explicitly defined ref, but we return one that could be null (packages/resizable/src/useResizable/useResizable.types.ts)

# Logo

```
@leafygreen-ui/logo:tsc:
  /Users/adam.thompson/Documents/GitHub/leafygreen-ui-branch/packages/logo/src/Logos/AtlasForGovernmentLogoLockup.tsx (38,8): Type '{ children: Element[]; string?: string | number | undefined; suppressHydrationWarning?: boolean | undefined; id?: string | undefined; lang?: string | undefined; max?: string | number | undefined; ... 472 more ...; alt?: undefined; } | { ...; }' is not assignable to type 'SVGProps<SVGSVGElement>'.
@leafygreen-ui/logo:tsc:
  Type '{ children: Element[]; string?: string | number | undefined; suppressHydrationWarning?: boolean | undefined; id?: string | undefined; lang?: string | undefined; max?: string | number | undefined; ... 472 more ...; alt?: undefined; }' is not assignable to type 'SVGProps<SVGSVGElement>'.
@leafygreen-ui/logo:tsc:
  Types of property 'dominantBaseline' are incompatible.
@leafygreen-ui/logo:tsc:
  Type 'string | number | undefined' is not assignable to type '"alphabetic" | "hanging" | "ideographic" | "mathematical" | "auto" | "text-before-edge" | "middle" | "central" | "text-after-edge" | "inherit" | "use-script" | "no-change" | "reset-size" | undefined'.
@leafygreen-ui/logo:tsc:
  Type 'string' is not assignable to type '"alphabetic" | "hanging" | "ideographic" | "mathematical" | "auto" | "text-before-edge" | "middle" | "central" | "text-after-edge" | "inherit" | "use-script" | "no-change" | "reset-size" | undefined'.
```

Seems like the type of `SVGProps` or `SVGSVGElement` has changed ([though it doesn't look like it](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fdeef84c6e0461149e1e084b8e47fbcb1bddf621/types/react/index.d.ts#L3574))

This error logs for all `svg`s in Logo

Seems to be fixed by switching to `ComponentProps<'svg'>` in packages/logo/src/Logo.types.ts

# Hooks

```@leafygreen-ui/hooks:tsc: /Users/adam.thompson/Documents/GitHub/leafygreen-ui-branch/packages/hooks/src/useAutoScroll/useAutoScroll.stories.tsx (37,42): Argument of type 'RefObject<HTMLUListElement | null>' is not assignable to parameter of type 'RefObject<HTMLElement>'.
@leafygreen-ui/hooks:tsc:   Type 'HTMLUListElement | null' is not assignable to type 'HTMLElement'.
```

Similar issue to `useResizable`.

The type of `RefObject.current` changed from `T | null` [in React 18](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fdeef84c6e0461149e1e084b8e47fbcb1bddf621/types/react/v18/index.d.ts#L155) to just `T` [in React 19](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fdeef84c6e0461149e1e084b8e47fbcb1bddf621/types/react/index.d.ts#L157)

```
@leafygreen-ui/hooks:tsc: /Users/adam.thompson/Documents/GitHub/leafygreen-ui-branch/packages/hooks/src/useObjectDependency.ts (5,15): Expected 1 arguments, but got 0.
```

`useRef` now requires an initial value (since it no longer defaults to `null`)

# Polymorphic

```
@leafygreen-ui/polymorphic:tsc: /Users/adam.thompson/Documents/GitHub/leafygreen-ui-branch/packages/polymorphic/src/Polymorphic/Polymorphic.types.ts (10,3): Module '"react"' has no exported member 'WeakValidationMap'
```

WeakValidationMap and `propTypes` [ was deprecated](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/fdeef84c6e0461149e1e084b8e47fbcb1bddf621/types/react/v18/index.d.ts#L4200)

```
@leafygreen-ui/polymorphic:tsc: /Users/adam.thompson/Documents/GitHub/leafygreen-ui-branch/packages/polymorphic/src/Polymorphic/Polymorphic.spec.tsx (237,12): Tag 'StyledPolymorph' expects at least '2' arguments, but the JSX factory 'React.createElement' provides at most '1'.
```

:shrug:

`ReturnType<FunctionComponent>` changed to `ReactNode | Promise<ReactNode>;`

My hunch is that this is caused by [adding a `ref` prop](https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop), causing the types of `forwardRef` to change
