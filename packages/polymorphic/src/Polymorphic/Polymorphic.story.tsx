import React from 'react';

import { storybookArgTypes, StoryMetaType } from '@leafygreen-ui/lib';

import {
  Polymorph,
  Polymorphic,
  PolymorphicPropsWithRef,
  usePolymorphic,
} from '.';

const meta: StoryMetaType<typeof Polymorph> = {
  title: 'Components/Internal/Polymorph',
  component: Polymorph,
  args: {
    children: 'Polymorph',
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
    default: 'Basic',
  },
};
export default meta;

export const Basic = (props: PolymorphicPropsWithRef<any>) => (
  <Polymorph {...props} />
);

export const HigherOrder = Polymorphic<{
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

export const HigherOrderWithRef = Polymorphic<{
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
