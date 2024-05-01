import { css } from '@leafygreen-ui/emotion';
import { Size, spacing } from '@leafygreen-ui/tokens';

import { AvatarStyleArgs } from '../Avatar.types';

const avatarTextSizeMap = {
  [Size.XSmall]: spacing[150], // Not Recommended
  [Size.Small]: spacing[300],
  [Size.Default]: spacing[400],
  [Size.Large]: spacing[600],
} as const satisfies Record<Size, number>;

export const getTextAvatarContentStyles = ({ size }: AvatarStyleArgs) => css`
  font-size: ${avatarTextSizeMap[size]}px;
  user-select: none;
`;

export const singleInitialStyles = css`
  font-weight: bold;
`;

export const baseIconAvatarContentStyles = css`
  height: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
  width: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
`;
