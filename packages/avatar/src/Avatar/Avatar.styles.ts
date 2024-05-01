import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { avatarColors, avatarSizeMap } from './Avatar.constants';
import { AvatarStyleArgs, Format } from './Avatar.types';

export const getAvatarStyles = ({
  size,
  theme,
  format,
}: AvatarStyleArgs) => css`
  height: ${avatarSizeMap[size]}px;
  width: ${avatarSizeMap[size]}px;
  border-radius: 100%;
  border: ${spacing[50]}px solid;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${avatarColors[theme].background};
  color: ${avatarColors[theme].text};
  border-color: ${avatarColors[theme].border};

  ${format === Format.MongoDB &&
  css`
    background-color: ${theme === Theme.Dark
      ? palette.green.dark3
      : palette.black};
    color: ${palette.green.base};
    border: unset;
  `}
`;
