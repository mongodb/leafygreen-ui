import React, { createContext, useContext } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';
import { sideNavWidth } from './styles';

interface SideNavigationContext {
  collapsed: boolean;
  portalContainer?: React.RefObject<HTMLUListElement | null>['current'];
  transitionState?: TransitionStatus;
  navId?: string;
  baseFontSize?: 14 | 16;
  width: number;
}

const SideNavContext = createContext<SideNavigationContext>({
  collapsed: false,
  width: sideNavWidth,
});

export const useSideNavContext = () => {
  const context = useContext(SideNavContext);
  return context;
};

export default SideNavContext;
