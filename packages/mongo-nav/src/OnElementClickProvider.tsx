import React, { createContext, useContext } from 'react';
import { NavItem } from './types';

type OnElementClickType = (type: NavItem, event: React.MouseEvent) => void;

interface OnElementClickProviderProps {
  children: React.ReactNode;
  onElementClick: OnElementClickType;
}

const OnElementClickContext = createContext<OnElementClickType>(() => {});

export function useOnElementClick() {
  return useContext(OnElementClickContext);
}

export default function OnElementClickProvider({
  children,
  onElementClick,
}: OnElementClickProviderProps) {
  return (
    <OnElementClickContext.Provider value={onElementClick}>
      {children}
    </OnElementClickContext.Provider>
  );
}
