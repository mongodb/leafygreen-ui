import { createContext } from 'react';

interface SideNavData {
  collapsed: boolean;
  hovered: boolean;
  currentPath?: string;
}

export const SideNavContext = createContext<SideNavData>({
  collapsed: false,
  hovered: false,
  currentPath: undefined,
});

interface SideNavGroupData {
  addPath: (path: string) => void;
  removePath: (path: string) => void;
}

export const SideNavGroupContext = createContext<SideNavGroupData | null>(null);
