import {
  MenuProps as LGMenuProps,
  MenuVariant as LGMenuVariant,
} from '@leafygreen-ui/menu';

export type MenuProps = Omit<LGMenuProps, 'trigger'>;
export const MenuVariant = LGMenuVariant;
