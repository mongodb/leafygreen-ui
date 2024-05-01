import { css } from '@leafygreen-ui/emotion';
import { Size, spacing } from '@leafygreen-ui/tokens';

import { AvatarStyleArgs, Format } from '../Avatar.types';

const avatarTextSizeMap = {
  [Size.XSmall]: spacing[200],
  [Size.Small]: spacing[300],
  [Size.Default]: spacing[400],
  [Size.Large]: spacing[600],
} as const satisfies Record<Size, number>;

export const getTextAvatarContentStyles = ({
  size,
  format,
}: AvatarStyleArgs) => css`
  font-size: ${avatarTextSizeMap[size]}px;
  user-select: none;

  ${format === Format.GivenInitial &&
  css`
    font-weight: bold;
  `}
`;

export const baseIconAvatarContentStyles = css`
  height: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
  width: 61.5%; // set to percentage to keep it responsive to all sizeOverride values
`;
