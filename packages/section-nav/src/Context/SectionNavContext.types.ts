import { DarkModeProps } from '@leafygreen-ui/lib';

import { GetLgIdsReturnType } from '../utils/getLgIds';

export type SectionNavProviderProps = DarkModeProps & {
  /**
   * LGIDs for SectionNav components.
   */
  lgIds: GetLgIdsReturnType;

  /**
   * Whether or not the component is within a SectionNav component.
   */
  inContext: boolean;
};
