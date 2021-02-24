import React, { createContext, useContext } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

interface SideNavigationContext {
  currentPath: string;
  collapsed: boolean;
  setCollapsed?: React.Dispatch<React.SetStateAction<boolean>>;
	portalContainer?: React.RefObject<HTMLUListElement | null>['current'];
	transitionState?: TransitionStatus;
	navId?: string;
}

const SideNavContext = createContext<SideNavigationContext>({ currentPath: '', collapsed: false })

export const useSideNavContext = () => {
	const context = useContext(SideNavContext)
	return context;
}

export default SideNavContext
