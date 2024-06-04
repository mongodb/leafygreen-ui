import { Theme } from '@leafygreen-ui/lib';

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export type ElementOf<
  T extends React.ComponentType<React.PropsWithChildren<unknown>>,
> = React.ReactComponentElement<T, React.ComponentPropsWithRef<T>>;

/** Extension of {@link Theme} to support dark-in-light-mode menus */
export const MenuTheme = {
  ...Theme,
  Hybrid: 'hybrid',
} as const;
export type MenuTheme = (typeof MenuTheme)[keyof typeof MenuTheme];
