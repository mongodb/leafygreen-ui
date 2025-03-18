import { DarkModeProps } from '@leafygreen-ui/lib';

import { MigrationContextType } from '../MigrationContext';
import { PortalContextValues } from '../PortalContext';
import { TypographyProviderProps } from '../TypographyContext';

export type LeafyGreenProviderProps = {
  /**
   * Define a container HTMLElement for components that utilize the `Portal` component
   */
  popoverPortalContainer?: PortalContextValues['popover'];
} & TypographyProviderProps &
  DarkModeProps &
  MigrationContextType;
