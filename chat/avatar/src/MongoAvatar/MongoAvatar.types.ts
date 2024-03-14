import { DarkModeProps } from '@leafygreen-ui/lib';

import { AvatarWrapperProps } from '../AvatarWrapper';

export interface MongoAvatarProps
  extends Omit<AvatarWrapperProps, 'children'>,
    DarkModeProps {}
