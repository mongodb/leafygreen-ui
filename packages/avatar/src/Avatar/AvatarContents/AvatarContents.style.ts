import { css } from '@leafygreen-ui/emotion';

import { avatarFontSizeMap } from '../Avatar.constants';
import { AvatarSize, AvatarStyleArgs } from '../Avatar.types';

const FONT_SCALE = 0.5; // Scalar for `sizeOverride` to font-size
const LOGO_SCALE = 0.625; // Scalar for `sizeOverride` to Logo size
const ICON_SCALE = 0.5; // Scalar for `sizeOverride` to icon size

export const getAvatarTextStyles = ({
  size = AvatarSize.Default,
  sizeOverride,
}: AvatarStyleArgs) => {
  const fontSize = sizeOverride
    ? sizeOverride * FONT_SCALE
    : avatarFontSizeMap[size];

  return css`
    font-size: ${fontSize}px;
    user-select: none;
  `;
};

export const singleInitialStyles = css`
  font-weight: bold;
`;

export const getAvatarLogoStyles = (_: AvatarStyleArgs) => css`
  // set to percentage to keep it responsive to all sizeOverride values
  height: ${LOGO_SCALE * 100}%;
  width: ${LOGO_SCALE * 100}%;
`;

export const getAvatarIconStyles = ({ sizeOverride }: AvatarStyleArgs) => {
  if (sizeOverride) {
    return css`
      height: ${ICON_SCALE * sizeOverride}px;
      width: ${ICON_SCALE * sizeOverride}px;
    `;
  }
};
