import React, { createContext, useContext } from 'react';
import { TransitionStatus } from 'react-transition-group/Transition';

import { BaseFontSize } from '@leafygreen-ui/tokens';

import { sideNavWidth } from './styles';

interface SideNavigationContext {
  collapsed: boolean;
  portalContainer?: React.RefObject<HTMLUListElement | null>['current'];
  transitionState?: TransitionStatus;
  navId?: string;
  baseFontSize: BaseFontSize;
  width: number;
}

const SideNavContext = createContext<SideNavigationContext>({
  collapsed: false,
  width: sideNavWidth,
  baseFontSize: BaseFontSize.Body1,
});

export const useSideNavContext = () => {
  const context = useContext(SideNavContext);
  return context;
};

export default SideNavContext;
