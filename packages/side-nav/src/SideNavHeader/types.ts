import { Theme } from '@leafygreen-ui/lib';
import { SideNavGroupProps } from '../SideNavGroup/types';

export interface SideNavHeaderProps {
  glyph: SideNavGroupProps['glyph'];
  isActiveGroup: boolean;
  theme: Theme;
  header: SideNavGroupProps['header'];
}
