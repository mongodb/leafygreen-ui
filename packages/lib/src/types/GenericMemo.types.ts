/**
 * Constructs a type which provides generic typing for React.memo
 */

import { PropsWithoutRef, WeakValidationMap } from 'react';

// The function signature
export interface GenericMemo {
  // <T> is a generic parameter that represents the type of the component being wrapped by GenericMemo
  // keyof JSX.IntrinsicElements Covers intrinsic JSX elements
  // React.JSXElementConstructor<any> Covers React components (e.g., functional components, class components). These are custom components.
  <T extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>>(
    component: T,
    propsAreEqual?: (
      prevProps: React.ComponentPropsWithRef<T>,
      nextProps: React.ComponentPropsWithRef<T>,
    ) => boolean,
    // Return type
    // The returned component is of the same type as the input component T
  ): T & {
    displayName?: string;
    propTypes?:
      | WeakValidationMap<PropsWithoutRef<React.ComponentPropsWithRef<T>>>
      | undefined;
  };
}

// export interface GenericMemo {
// // This constraint only allows T to be custom React components
//   <T extends React.ComponentType<any>>(
//     component: T,
//     propsAreEqual?: (
//       prevProps: React.ComponentPropsWithRef<T>,
//       nextProps: React.ComponentPropsWithRef<T>,
//     ) => boolean,
//   ): React.MemoExoticComponent<T>;
// }
