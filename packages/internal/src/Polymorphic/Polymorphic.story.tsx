import React from 'react';
import { storybookArgTypes } from '@leafygreen-ui/lib';
import {
  Polymorphic,
  usePolymorphic,
  PolymorphicComponent,
  PolymorphicPropsWithRef,
} from '.';

export default {
  title: 'Components/Internal/Polymorphic',
  component: Polymorphic,
  args: {
    children: 'Polymorphic',
    as: 'button',
    href: 'mongodb.design',
  },
  argTypes: {
    as: storybookArgTypes.as,
    children: storybookArgTypes.children,
    href: {
      control: 'text',
      if: { arg: 'as', eq: 'a' },
    },
  },
  parameters: {
    controls: {
      exclude: ['className'],
    },
  },
};

export const Basic = (props: PolymorphicPropsWithRef<any>) => (
  <Polymorphic {...props} />
);

export const HigherOrder = PolymorphicComponent<{
  /** An arbitrary title */
  title?: string;
}>(({ as, title = 'Title', ...rest }) => {
  const { Component } = usePolymorphic(as);
  return (
    <Component as={as} {...rest}>
      {title}
    </Component>
  );
});

export const HigherOrderWithRef = PolymorphicComponent<{
  /** An arbitrary title */
  title?: string;
}>(({ as, title = 'Title', ...rest }, ref) => {
  const { Component } = usePolymorphic(as);
  return (
    <Component as={as} ref={ref} {...rest}>
      {title}
    </Component>
  );
});
