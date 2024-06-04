import { MenuTheme } from '../types';

export interface MenuContextData {
  theme: MenuTheme;
  darkMode: boolean;
  highlightIndex?: number;
}
