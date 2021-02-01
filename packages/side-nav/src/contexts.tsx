import { createContext } from 'react';

interface SideNavData {
  collapsed: boolean;
  currentPath?: string;
}

export const SideNavContext = createContext<SideNavData>({
  collapsed: false,
  currentPath: undefined,
});

interface SideNavGroupData {
  addPath: (path: string) => void;
  removePath: (path: string) => void;
  collapsed: boolean;
  collapsible: boolean;
}

export const SideNavGroupContext = createContext<SideNavGroupData | null>(null);
