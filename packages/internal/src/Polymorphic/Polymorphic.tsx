import React from 'react';
import {
  PolymorphicComponentType,
  PolymorphicPropsWithRef,
  PolymorphicRef,
} from './Polymorphic.types';

const _Polymorphic = <T extends React.ElementType = 'div'>(
  { as, children, ...rest }: PolymorphicPropsWithRef<T>,
  ref: PolymorphicRef<T>,
) => {
  const Component = as || 'div';

  return (
    <Component {...rest} ref={ref}>
      {children}
    </Component>
  );
};

export const Polymorphic: PolymorphicComponentType =
  React.forwardRef(_Polymorphic);
Polymorphic.displayName = 'Polymorphic';
