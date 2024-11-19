/**
 * Constructs a type which provides generic typing for React.memo
 */

import { PropsWithoutRef, WeakValidationMap } from 'react';

export interface GenericMemo {
  <T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
    component: T,
    propsAreEqual?: (
      prevProps: React.ComponentPropsWithRef<T>,
      nextProps: React.ComponentPropsWithRef<T>,
    ) => boolean,
  ): T & {
    displayName?: string;
    propTypes?:
      | WeakValidationMap<PropsWithoutRef<React.ComponentPropsWithRef<T>>>
      | undefined;
  };
}
