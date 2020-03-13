import React, { createContext, useContext } from 'react';
import { NavElement } from '../types';

type OnElementClickType = (
  type: NavElement,
  additionalWork?: (e: React.MouseEvent) => void,
) => (e: React.MouseEvent) => void;

interface OnElementClickProviderProps {
  children: React.ReactNode;
  onElementClick: (type: NavElement, e: React.MouseEvent) => void;
}

const OnElementClickContext = createContext<OnElementClickType>(
  (_navElement: NavElement, additionalWork?: (e: React.MouseEvent) => void) => (
    e: React.MouseEvent,
  ) => {
    return additionalWork?.(e);
  },
);

export function useOnElementClick() {
  return useContext(OnElementClickContext);
}

export default function OnElementClickProvider({
  children,
  onElementClick,
}: OnElementClickProviderProps) {
  const wrappedOnElementClick = (
    navElement: NavElement,
    additionalWork?: (e: React.MouseEvent) => void,
  ) => {
    return (e: React.MouseEvent) => {
      onElementClick(navElement, e);
      return additionalWork?.(e);
    };
  };

  // const memoizedValue = useMemo(
  //   (navElement: NavElement, additionalWork?: (e: React.MouseEvent) => void) =>
  //     wrappedOnElementClick(navElement, additionalWork),
  //   [onElementClick],
  // );

  // const wrappedOnElementClick = useMemo(
  //   (
  //     navElement: NavElement,
  //     additionalWork?: (e: React.MouseEvent) => void,
  //   ) => {
  //     return (e: React.MouseEvent) => {
  //       onElementClick(navElement, e);
  //       if (additionalWork) {
  //         return additionalWork(e);
  //       }
  //     };
  //   },
  //   [onElementClick],
  // );

  return (
    <OnElementClickContext.Provider value={wrappedOnElementClick}>
      {children}
    </OnElementClickContext.Provider>
  );
}
