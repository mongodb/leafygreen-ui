import React, { createContext, useContext } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

interface SideNavigationContext {
  collapsed: boolean;
  portalContainer?: React.RefObject<HTMLUListElement | null>['current'];
  transitionState?: TransitionStatus;
  navId?: string;
  baseFontSize?: 14 | 16;
}

const SideNavContext = createContext<SideNavigationContext>({
  collapsed: false,
});

export const useSideNavContext = () => {
  const context = useContext(SideNavContext);
  return context;
};

export default SideNavContext;
