import React from 'react';
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

export default function Root<T>(props: RootProps<T>) {
  const { children, ...rest } = props;
  let Root: React.ElementType<any> = 'button';

  if (usesCustomElement<T>(props)) {
    Root = props.as;
  } else if (usesLinkElement<T>(props)) {
    Root = 'a';
  }

  return <Root {...rest}>{children}</Root>;
}
