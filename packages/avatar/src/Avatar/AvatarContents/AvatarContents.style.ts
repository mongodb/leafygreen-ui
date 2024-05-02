import { css } from '@leafygreen-ui/emotion';

import { avatarFontSizeMap } from '../Avatar.constants';
import { AvatarStyleArgs } from '../Avatar.types';

export const getTextAvatarContentStyles = ({ size }: AvatarStyleArgs) => css`
  font-size: ${avatarFontSizeMap[size]}px;
  user-select: none;
`;

export const singleInitialStyles = css`
  font-weight: bold;
`;

export const baseIconAvatarContentStyles = css`
  height: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
  width: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
`;
