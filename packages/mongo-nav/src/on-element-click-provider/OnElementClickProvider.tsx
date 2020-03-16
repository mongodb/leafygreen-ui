import React, { createContext, useContext, useCallback } from 'react';
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

  const callbackWrapper = useCallback(wrappedOnElementClick, [onElementClick]);

  return (
    <OnElementClickContext.Provider value={callbackWrapper}>
      {children}
    </OnElementClickContext.Provider>
  );
}
