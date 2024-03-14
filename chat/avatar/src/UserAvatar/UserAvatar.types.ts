import { DarkModeProps } from '@leafygreen-ui/lib';

import { AvatarWrapperProps } from '../AvatarWrapper/AvatarWrapper.types';

export interface UserAvatarProps
  extends Omit<AvatarWrapperProps, 'children'>,
    DarkModeProps {
  /**
   * The name of the user who is represented by the avatar. The rendered text will be the initials of the text passed to this prop.
   */
  name?: string;
}
