export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

export type ElementOf<
  T extends React.ComponentType<React.PropsWithChildren<unknown>>,
> = React.ReactComponentElement<T, React.ComponentPropsWithRef<T>>;
